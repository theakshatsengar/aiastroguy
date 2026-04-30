// Lightweight localStorage-backed store for profile, readings, paywall.
import { useEffect, useState } from "react";

export type Profile = {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string;
  birthPlace?: string;
  sunSign?: string;
};

export type SavedReading = {
  id: string;
  kind: "palm" | "face";
  title: string;
  summary: string;
  createdAt: number;
  thumbnail?: string;
};

const PROFILE_KEY = "lumen.profile";
const READINGS_KEY = "lumen.readings";
const PRO_KEY = "lumen.pro";
const ONBOARDED_KEY = "lumen.onboarded";

function read<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(k: string, v: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
  window.dispatchEvent(new CustomEvent("lumen:store", { detail: k }));
}

export function getProfile(): Profile | null {
  return read<Profile | null>(PROFILE_KEY, null);
}
export function setProfile(p: Profile) {
  write(PROFILE_KEY, p);
  write(ONBOARDED_KEY, true);
}
export function isOnboarded(): boolean {
  return read<boolean>(ONBOARDED_KEY, false);
}

export function getReadings(): SavedReading[] {
  return read<SavedReading[]>(READINGS_KEY, []);
}
export function saveReading(r: Omit<SavedReading, "id" | "createdAt">) {
  const list = getReadings();
  const item: SavedReading = {
    ...r,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  write(READINGS_KEY, [item, ...list].slice(0, 30));
  return item;
}
export function clearReadings() {
  write(READINGS_KEY, []);
}

export function isPro(): boolean {
  return read<boolean>(PRO_KEY, false);
}
export function setPro(v: boolean) {
  write(PRO_KEY, v);
}

// React hook subscribing to changes
export function useStore<T>(selector: () => T): T {
  const [value, setValue] = useState<T>(() => selector());
  useEffect(() => {
    const update = () => setValue(selector());
    update();
    window.addEventListener("lumen:store", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("lumen:store", update);
      window.removeEventListener("storage", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export function sunSignFor(dateStr: string): string {
  if (!dateStr) return "Aries";
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const ranges: [string, number, number, number, number][] = [
    ["Capricorn", 12, 22, 1, 19],
    ["Aquarius", 1, 20, 2, 18],
    ["Pisces", 2, 19, 3, 20],
    ["Aries", 3, 21, 4, 19],
    ["Taurus", 4, 20, 5, 20],
    ["Gemini", 5, 21, 6, 20],
    ["Cancer", 6, 21, 7, 22],
    ["Leo", 7, 23, 8, 22],
    ["Virgo", 8, 23, 9, 22],
    ["Libra", 9, 23, 10, 22],
    ["Scorpio", 10, 23, 11, 21],
    ["Sagittarius", 11, 22, 12, 21],
  ];
  for (const [name, m1, d1, m2, d2] of ranges) {
    if ((m === m1 && day >= d1) || (m === m2 && day <= d2)) return name;
  }
  return "Aries";
}
