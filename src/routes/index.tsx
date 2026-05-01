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
        <div className="relative overflow-hidden rounded-3xl gradient-cosmic p-6 text-white shadow-glow">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <Moon className="h-6 w-6 opacity-90" strokeWidth={1.6} />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
            Today's energy
          </p>
          <p className="mt-2 font-display text-2xl leading-snug">
            A grounded day for finishing what you've started.
          </p>
          <Link
            to="/horoscope"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white"
          >
            Read full horoscope <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 px-6">
        <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Readings
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center justify-between rounded-2xl glass p-5 transition-colors hover:bg-accent/40 aspect-square"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <div className="text-center mt-3">
                <p className="font-display text-base leading-tight">{title}</p>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 mt-2" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 px-6 pb-12">
        <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Recent
        </h2>
        {readings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Your past readings will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {readings.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-2xl glass p-3">
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
