import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ArrowRight, Hand, Sparkles, Stars, Moon, Heart, LayoutGrid, Clock } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { isOnboarded, useStore, getProfile, getReadings } from "@/lib/store";
import mandala from "@/assets/cosmic-mandala.png";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — AI Astrology & Palm Reading" },
      { name: "description", content: "Personal AI readings: palm, face, daily horoscope and birth chart insights." },
      { property: "og:title", content: "Lumen — AI Astrology & Palm Reading" },
      { property: "og:description", content: "Quiet, personal AI readings in your pocket." },
    ],
  }),
  component: Index,
});

const chips = [
  { to: "/horoscope", label: "Daily Horoscope" },
  { to: "/compatibility", label: "Match-Making" },
  { to: "/tarot", label: "Tarot" },
  { to: "/palm", label: "Palm" },
  { to: "/face", label: "Face" },
] as const;

const quickReadings = [
  { to: "/palm", icon: Hand, title: "Palm" },
  { to: "/face", icon: Sparkles, title: "Face" },
  { to: "/horoscope", icon: Stars, title: "Stars" },
  { to: "/tarot", icon: Moon, title: "Tarot" },
  { to: "/compatibility", icon: Heart, title: "Match" },
] as const;

function Index() {
  const navigate = useNavigate();
  const profile = useStore(() => getProfile());
  const readings = useStore(() => getReadings());
  const [active, setActive] = useState<string>("/horoscope");

  useEffect(() => {
    if (typeof window !== "undefined" && !isOnboarded()) {
      navigate({ to: "/onboarding" });
    }
  }, [navigate]);

  const firstName = profile?.name?.split(" ")[0] ?? "Friend";

  return (
    <MobileShell>
      {/* Top header */}
      <header className="px-6 pt-10 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-3xl leading-tight">Hello, {firstName}.</h1>
            <p className="mt-1 text-sm text-muted-foreground">what would you like to know?</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full gradient-cosmic font-display text-sm text-white shadow-soft">
              {firstName[0]?.toUpperCase()}
            </Link>
            <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full glass">
              <LayoutGrid className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-3 rounded-full glass px-5 py-3">
          <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
          <input
            placeholder="what are you looking for?"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      {/* Chips row */}
      <div className="px-6">
        <div className="-mx-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2">
            {chips.map((c) => (
              <button
                key={c.to}
                onClick={() => setActive(c.to)}
                className="stat-pill shrink-0"
                data-active={active === c.to}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero card with mandala */}
      <section className="mt-5 px-6">
        <Link
          to={active as "/horoscope"}
          className="block overflow-hidden rounded-3xl bg-card shadow-soft"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-[oklch(0.18_0.04_265)]">
            <img
              src={mandala}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              width={1024}
              height={1024}
            />
          </div>
          <div className="flex items-end justify-between gap-4 p-5">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {profile?.sunSign ?? "Aries"}
              </p>
              <p className="mt-1 font-display text-lg leading-snug">
                Elective & Horary Charts
              </p>
              <p className="text-sm text-muted-foreground">Horary astrology determines</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </section>

      {/* Quick readings */}
      <section className="mt-7 px-6">
        <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Readings
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {quickReadings.map(({ to, icon: Icon, title }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-2"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl glass">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="text-[11px] font-medium">{title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily horoscope time cards */}
      <section className="mt-7 px-6">
        <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Daily Horoscope
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { k: "Tomorrow", v: nextDay() },
            { k: "Weekly", v: weekRange() },
            { k: "Month", v: thisMonth() },
            { k: "Year", v: thisYear() },
          ].map((x, i) => (
            <Link
              to="/horoscope"
              key={x.k}
              className={cn(
                "flex aspect-[4/5] flex-col justify-between rounded-2xl p-3 shadow-soft",
                i === 0 ? "bg-primary text-primary-foreground" : "bg-card",
              )}
            >
              <div>
                <p className="text-xs font-semibold leading-tight">{x.k}</p>
                <p className={cn("mt-0.5 text-[10px]", i === 0 ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {x.v}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 opacity-80" />
            </Link>
          ))}
        </div>
      </section>

      {/* Recent */}
      {readings.length > 0 && (
        <section className="mt-7 px-6 pb-4">
          <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Recent
          </h2>
          <div className="space-y-2">
            {readings.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
                {r.thumbnail ? (
                  <img src={r.thumbnail} alt="" className="h-12 w-12 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    {r.kind === "palm" ? <Hand className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium capitalize">{r.kind} reading</p>
                  <p className="truncate text-xs text-muted-foreground">{r.title}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {timeAgo(r.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </MobileShell>
  );
}

function nextDay() {
  const d = new Date(Date.now() + 86400000);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function weekRange() {
  const a = new Date();
  const b = new Date(Date.now() + 6 * 86400000);
  const f = (d: Date) => d.toLocaleDateString("en-US", { day: "2-digit" });
  return `${f(a)}–${f(b)}`;
}
function thisMonth() {
  return new Date().toLocaleDateString("en-US", { month: "short" });
}
function thisYear() {
  return String(new Date().getFullYear());
}
function timeAgo(t: number) {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}
