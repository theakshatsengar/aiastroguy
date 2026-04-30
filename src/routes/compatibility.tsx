import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/compatibility")({
  head: () => ({
    meta: [
      { title: "Compatibility — Lumen" },
      { name: "description", content: "How your sign aligns with another." },
    ],
  }),
  component: Compatibility,
});

const signs = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces",
];

const glyphs: Record<string, string> = {
  Aries:"♈",Taurus:"♉",Gemini:"♊",Cancer:"♋",Leo:"♌",Virgo:"♍",
  Libra:"♎",Scorpio:"♏",Sagittarius:"♐",Capricorn:"♑",Aquarius:"♒",Pisces:"♓",
};

function score(a: string, b: string) {
  const i = signs.indexOf(a), j = signs.indexOf(b);
  const diff = Math.abs(i - j) % 12;
  // simple heuristic
  const map: Record<number, number> = { 0: 78, 1: 52, 2: 70, 3: 48, 4: 88, 5: 60, 6: 92, 7: 55, 8: 84, 9: 50, 10: 66, 11: 58 };
  return map[diff];
}

function Compatibility() {
  const [a, setA] = useState("Aries");
  const [b, setB] = useState("Libra");
  const s = score(a, b);

  return (
    <MobileShell>
      <PageHeader eyebrow="Synastry" title="Compatibility" subtitle="Pick two signs to feel the chemistry." />

      <div className="px-6">
        <div className="grid grid-cols-2 gap-3">
          {([["You", a, setA], ["Them", b, setB]] as const).map(([label, val, setVal]) => (
            <div key={label} className="rounded-2xl card-premium p-5 border border-white/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
              <p className="mt-3 font-display text-4xl font-semibold">{glyphs[val]} <span className="text-lg text-accent">{val}</span></p>
              <select
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm font-medium focus:border-accent/50 focus:bg-white/10 transition-all"
              >
                {signs.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl gradient-premium p-8 text-white shadow-glow">
          <Heart className="h-6 w-6" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/70">Compatibility</p>
          <p className="font-display text-6xl font-semibold tabular-nums">{s}<span className="text-2xl text-white/60">%</span></p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className={cn("h-full bg-white transition-all duration-700")} style={{ width: `${s}%` }}/>
          </div>
          <p className="mt-6 text-base leading-relaxed text-white/85">
            {s > 80 ? "A natural ease — you bring out each other's calm." :
             s > 60 ? "Warm chemistry with room for honest growth." :
             s > 45 ? "Different rhythms. Curiosity bridges the gap." :
                      "Sparks and friction. Worth it if you both stay open."}
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
