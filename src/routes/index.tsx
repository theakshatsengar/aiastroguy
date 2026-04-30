import { createFileRoute, Link } from "@tanstack/react-router";
import { Hand, Sparkles, Stars, Moon, ArrowUpRight } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — AI Astrology & Palm Reading" },
      {
        name: "description",
        content:
          "Personal AI readings: palm, face, daily horoscope and birth chart insights.",
      },
      { property: "og:title", content: "Lumen — AI Astrology & Palm Reading" },
      {
        property: "og:description",
        content: "Quiet, personal AI readings in your pocket.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    to: "/palm",
    icon: Hand,
    title: "Palm reading",
    desc: "Trace your life, heart and head lines.",
  },
  {
    to: "/face",
    icon: Sparkles,
    title: "Face & forehead",
    desc: "Physiognomy insights from a selfie.",
  },
  {
    to: "/horoscope",
    icon: Stars,
    title: "Daily horoscope",
    desc: "Personal energy for today.",
  },
] as const;

function Index() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <MobileShell>
      <PageHeader
        eyebrow={today}
        title="Quiet wisdom, in your pocket."
        subtitle="Personal AI readings drawn from ancient practice and modern intuition."
      />

      <section className="px-6">
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-6 text-background">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-background/10 blur-2xl" />
          <Moon className="h-6 w-6 opacity-80" strokeWidth={1.6} />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-background/60">
            Today's energy
          </p>
          <p className="mt-2 font-display text-2xl leading-snug">
            A grounded day for finishing what you've started.
          </p>
          <Link
            to="/horoscope"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-background/90 hover:text-background"
          >
            Read full horoscope <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 px-6">
        <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Readings
        </h2>
        <div className="space-y-3">
          {features.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-accent"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg leading-tight">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 px-6">
        <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Recent
        </h2>
        <div className="rounded-2xl border border-dashed border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Your past readings will appear here.
          </p>
        </div>
      </section>
    </MobileShell>
  );
}
