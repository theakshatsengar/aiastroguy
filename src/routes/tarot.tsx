import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export const Route = createFileRoute("/tarot")({
  head: () => ({
    meta: [
      { title: "Tarot Card — Lumen" },
      { name: "description", content: "Pull your tarot card of the day." },
    ],
  }),
  component: Tarot,
});

const cards = [
  { name: "The Star", glyph: "✦", body: "Hope returning quietly. Trust the slow rebuild." },
  { name: "The Moon", glyph: "☾", body: "Sit with what's unclear. Truths surface in dreams." },
  { name: "The Sun", glyph: "☀", body: "Warmth, clarity, simple joy. Show up as yourself." },
  { name: "The Tower", glyph: "⌂", body: "An old structure cracks. The clearing makes room." },
  { name: "The Fool", glyph: "✺", body: "A new chapter wants you. Step lightly, step now." },
  { name: "The Empress", glyph: "♀", body: "Care, creation, abundance. Tend what you love." },
];

function Tarot() {
  const [seed, setSeed] = useState(0);
  const card = useMemo(() => cards[(Date.now() + seed) % cards.length], [seed]);

  return (
    <MobileShell>
      <PageHeader
        eyebrow="Daily pull"
        title="Your tarot card"
        subtitle="One card, drawn from the deck for today's quiet question."
      />

      <div className="px-6">
        <div className="relative mx-auto aspect-[3/5] w-full max-w-[280px] overflow-hidden rounded-3xl gradient-cosmic p-6 text-white shadow-glow">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-cosmic-glow/40 blur-2xl" />
          <div className="relative flex h-full flex-col items-center justify-between text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
              Today
            </p>
            <p className="font-display text-7xl">{card.glyph}</p>
            <div>
              <p className="font-display text-2xl">{card.name}</p>
              <p className="mt-2 text-xs text-white/80">{card.body}</p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={() => setSeed((s) => s + 1)}
          className="mx-auto mt-6 flex h-12 rounded-full"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Draw another
        </Button>
      </div>
    </MobileShell>
  );
}
