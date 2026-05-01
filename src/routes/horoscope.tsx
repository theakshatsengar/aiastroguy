import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useStore, getProfile } from "@/lib/store";

export const Route = createFileRoute("/horoscope")({
  head: () => ({
    meta: [
      { title: "Daily Horoscope — Lumen" },
      { name: "description", content: "Personal daily horoscope and energy forecast." },
    ],
  }),
  component: Horoscope,
});

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildWeek() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
  return Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      n: String(d.getDate()).padStart(2, "0"),
      label: days[d.getDay()],
      iso: d.toISOString().slice(0, 10),
      isToday: d.toDateString() === today.toDateString(),
    };
  });
}

const signsBlock = [
  {
    name: "Aries",
    body: "Mauris interdum mollis nulla, sed dictum elit sollicitudin non. Mauris tempus nunc arcu, sit amet sollicitudin id. Nunc imperdiet fermentum ante.",
    stats: [
      { k: "Love", v: 92 },
      { k: "Health", v: 56 },
      { k: "Family", v: 87 },
      { k: "Career", v: 79 },
    ],
  },
  {
    name: "Pisces",
    body: "Mauris interdum mollis nulla, sed dictum elit sollicitudin non. Mauris tempus nunc arcu, sit amet sollicitudin id. Nunc imperdiet fermentum ante.",
    stats: [
      { k: "Love", v: 92 },
      { k: "Health", v: 90 },
      { k: "Family", v: 78 },
      { k: "Career", v: 80 },
    ],
  },
];

function Horoscope() {
  const week = buildWeek();
  const [selected, setSelected] = useState(week.find((d) => d.isToday)?.iso ?? week[0].iso);
  const profile = useStore(() => getProfile());
  const firstName = profile?.name?.split(" ")[0] ?? "Friend";

  return (
    <MobileShell>
      <header className="px-6 pt-10 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl leading-[1.1]">Your Daily<br />Horoscope Plan</h1>
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

        <button className="mt-5 inline-flex items-center gap-1 text-sm">
          <span className="font-medium">{new Date().toLocaleDateString("en-US", { month: "long" })}</span>
          <span className="text-cosmic font-medium">{new Date().getFullYear()}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </header>

      {/* Date strip */}
      <div className="px-6">
        <div className="-mx-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2">
            {week.map((d) => {
              const active = selected === d.iso;
              return (
                <button
                  key={d.iso}
                  onClick={() => setSelected(d.iso)}
                  className={cn(
                    "flex h-16 w-12 shrink-0 flex-col items-center justify-center rounded-full transition-colors",
                    active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent",
                  )}
                >
                  <span className="font-display text-base tabular-nums">{d.n}</span>
                  <span className={cn("mt-1 text-[10px] uppercase tracking-wider", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {d.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <h2 className="mt-4 px-6 font-display text-xl">Daily HoroScope</h2>

      <div className="mt-3 space-y-4 px-6 pb-6">
        {signsBlock.map((s) => (
          <div key={s.name} className="rounded-3xl bg-card p-5 shadow-soft">
            <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>

            <p className="mt-5 font-display text-lg">{s.name} Love and Health</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {s.stats.map((x, i) => (
                <span key={x.k} className="stat-pill" data-active={i === 0}>
                  {x.v}% {x.k}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}
