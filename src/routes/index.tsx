import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hand, Sparkles, Stars, Moon, ArrowUpRight, Heart, Clock } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";
import { isOnboarded, useStore, getProfile, getReadings } from "@/lib/store";

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
  { to: "/palm", icon: Hand, title: "Palm reading", desc: "Trace your life, heart and head lines." },
  { to: "/face", icon: Sparkles, title: "Face & forehead", desc: "Physiognomy insights from a selfie." },
  { to: "/horoscope", icon: Stars, title: "Daily horoscope", desc: "Personal energy for today." },
  { to: "/tarot", icon: Moon, title: "Tarot card", desc: "Pull your card of the day." },
] as const;

function Index() {
  const navigate = useNavigate();
  const profile = useStore(() => getProfile());
  const readings = useStore(() => getReadings());

  useEffect(() => {
    if (typeof window !== "undefined" && !isOnboarded()) {
      navigate({ to: "/onboarding" });
    }
  }, [navigate]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <MobileShell>
      <PageHeader
        eyebrow={today}
        title={profile ? `Hello, ${profile.name.split(" ")[0]}.` : "Quiet wisdom, in your pocket."}
        subtitle={
          profile?.sunSign
            ? `Your ${profile.sunSign} energy today, drawn quietly from the stars.`
            : "Personal AI readings drawn from ancient practice and modern intuition."
        }
      />

      <section className="px-6">
        <div className="relative overflow-hidden rounded-3xl gradient-cosmic p-8 text-white shadow-glow">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10">
            <Moon className="h-7 w-7 opacity-90" strokeWidth={1.6} />
            <p className="mt-7 text-xs font-semibold uppercase tracking-widest text-white/70">
              Today's cosmic energy
            </p>
            <p className="mt-3 font-display text-3xl leading-snug font-semibold">
              A grounded day for finishing what you've started.
            </p>
            <Link
              to="/horoscope"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/95 hover:text-white transition-all group"
            >
              Read full horoscope <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12 px-6">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Readings
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center justify-between rounded-2xl card-premium p-6 transition-all duration-300 hover:shadow-glow aspect-square border border-white/10 hover:border-accent/30"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-all">
                <Icon className="h-7 w-7 text-accent" strokeWidth={1.6} />
              </div>
              <div className="text-center mt-4">
                <p className="font-display text-lg leading-tight font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 px-6 pb-12">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Recent
        </h2>
        {readings.length === 0 ? (
          <div className="rounded-2xl border border-border p-8 text-center card-premium">
            <p className="text-sm text-muted-foreground">
              Your past readings will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {readings.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-4 rounded-2xl card-premium p-4 transition-all hover:shadow-soft border border-white/5">
                {r.thumbnail ? (
                  <img src={r.thumbnail} alt="" className="h-14 w-14 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5">
                    {r.kind === "palm" ? <Hand className="h-6 w-6 text-accent" /> : <Sparkles className="h-6 w-6 text-accent" />}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground capitalize">{r.kind} reading</p>
                  <p className="truncate text-xs text-muted-foreground">{r.title}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {timeAgo(r.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </MobileShell>
  );
}

function timeAgo(t: number) {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}
