import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/horoscope")({
  head: () => ({
    meta: [
      { title: "Daily Horoscope — Lumen" },
      {
        name: "description",
        content: "Personal daily horoscope and energy forecast.",
      },
    ],
  }),
  component: Horoscope,
});

const signs = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const glyphs: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
  Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const readings: Record<string, { mood: string; body: string; stats: { label: string; value: number }[] }> = {
  Aries: {
    mood: "Restless but focused",
    body: "Mars is steady today. Channel that quick energy into one task that's been waiting. A conversation in the afternoon shifts something you've been turning over.",
    stats: [
      { label: "Energy", value: 82 },
      { label: "Love", value: 64 },
      { label: "Focus", value: 71 },
    ],
  },
  Taurus: {
    mood: "Grounded",
    body: "A slower pace serves you. Money matters clarify quietly. Cook something. Touch base with someone you've been meaning to message.",
    stats: [
      { label: "Energy", value: 60 },
      { label: "Love", value: 78 },
      { label: "Focus", value: 84 },
    ],
  },
};

function defaultFor(sign: string) {
  return readings[sign] ?? {
    mood: "Open and observant",
    body: "The day asks for quiet attention. Notice what you notice. A small, almost unrelated detail becomes useful by evening.",
    stats: [
      { label: "Energy", value: 70 },
      { label: "Love", value: 66 },
      { label: "Focus", value: 75 },
    ],
  };
}

function Horoscope() {
  const [sign, setSign] = useState("Aries");
  const r = defaultFor(sign);

  return (
    <MobileShell>
      <PageHeader
        eyebrow="Today"
        title="Your horoscope"
        subtitle="Choose your sign for a personal forecast."
      />

      <div className="px-6">
        <div className="-mx-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2">
            {signs.map((s) => (
              <button
                key={s}
                onClick={() => setSign(s)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  sign === s
                    ? "border-accent gradient-premium text-white shadow-glow"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground",
                )}
              >
                <span className="text-base leading-none">{glyphs[s]}</span>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-8 px-6">
        <div className="rounded-3xl card-premium p-8 border border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {sign}
            </p>
            <span className="font-display text-4xl">{glyphs[sign]}</span>
          </div>
          <p className="mt-5 font-display text-3xl font-semibold leading-snug">{r.mood}.</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{r.body}</p>

          <div className="mt-8 space-y-4">
            {r.stats.map((s) => (
              <div key={s.label}>
                <div className="mb-2 flex items-baseline justify-between text-xs">
                  <span className="font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </span>
                  <span className="tabular-nums font-semibold text-accent">{s.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full gradient-premium transition-all duration-700"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 px-6 pb-12">
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "Lucky number", v: "7" },
            { k: "Color", v: "Slate" },
            { k: "Hour", v: "4 – 6 pm" },
            { k: "Element", v: "Fire" },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-2xl card-premium border border-white/10 p-5 hover:border-accent/30 transition-all"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {x.k}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-accent">{x.v}</p>
            </div>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
