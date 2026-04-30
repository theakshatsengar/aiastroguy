import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";
import {
  ChevronRight, Bell, Moon, Lock, HelpCircle, Sparkles, Hand, Trash2, Crown,
} from "lucide-react";
import {
  useStore, getProfile, getReadings, isPro, clearReadings, setPro,
} from "@/lib/store";
import { Paywall } from "@/components/Paywall";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Lumen" },
      { name: "description", content: "Your birth details, past readings and app settings." },
    ],
  }),
  component: Profile,
});

const glyphs: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
  Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

function Profile() {
  const profile = useStore(() => getProfile());
  const readings = useStore(() => getReadings());
  const pro = useStore(() => isPro());
  const [paywall, setPaywall] = useState(false);

  return (
    <MobileShell>
      <PageHeader eyebrow="You" title="Your chart" />

      {!profile ? (
        <section className="px-6">
          <Link
            to="/onboarding"
            className="block rounded-3xl glass p-6 text-center"
          >
            <p className="font-display text-lg">Set up your profile</p>
            <p className="mt-1 text-sm text-muted-foreground">Tell us when you were born.</p>
          </Link>
        </section>
      ) : (
        <>
          <section className="px-6">
            <div className="flex items-center gap-4 rounded-3xl glass p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-cosmic font-display text-2xl text-white shadow-glow">
                {glyphs[profile.sunSign ?? "Aries"]}
              </div>
              <div className="flex-1">
                <p className="font-display text-lg leading-tight">{profile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {profile.sunSign} Sun {profile.birthPlace ? `· ${profile.birthPlace}` : ""}
                </p>
              </div>
              <Link to="/onboarding" className="text-sm text-muted-foreground hover:text-foreground">
                Edit
              </Link>
            </div>
          </section>

          <section className="mt-6 px-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "Born", v: profile.birthDate ? formatDate(profile.birthDate) : "—" },
                { k: "Place", v: profile.birthPlace || "—" },
                { k: "Time", v: profile.birthTime || "—" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl glass p-4 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {x.k}
                  </p>
                  <p className="mt-1 truncate font-display text-base">{x.v}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {!pro && (
        <section className="mt-6 px-6">
          <button
            onClick={() => setPaywall(true)}
            className="relative w-full overflow-hidden rounded-3xl gradient-cosmic p-5 text-left text-white shadow-glow"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5" />
              <p className="font-display text-lg">Unlock Lumen Pro</p>
            </div>
            <p className="mt-1 text-sm text-white/80">
              Unlimited readings & full chart · ₹99 lifetime
            </p>
          </button>
        </section>
      )}

      <section className="mt-8 px-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Past readings
          </h2>
          {readings.length > 0 && (
            <button
              onClick={clearReadings}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
        {readings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-6 text-center">
            <p className="text-sm text-muted-foreground">No readings yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {readings.map((r) => (
              <div key={r.id} className="flex gap-3 rounded-2xl glass p-3">
                {r.thumbnail ? (
                  <img src={r.thumbnail} alt="" className="h-16 w-16 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-ink text-paper">
                    {r.kind === "palm" ? <Hand className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {r.kind} · {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 font-display text-sm leading-snug">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 px-6">
        <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Settings
        </h2>
        <div className="overflow-hidden rounded-2xl glass">
          {[
            { icon: Bell, label: "Notifications", value: "Daily, 8:00 am" },
            { icon: Moon, label: "Theme", value: "Dark" },
            { icon: Lock, label: "Privacy", value: "On-device" },
            { icon: HelpCircle, label: "About", value: "v0.2" },
          ].map(({ icon: Icon, label, value }, i) => (
            <button
              key={label}
              className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/40 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
              <span className="flex-1 text-sm font-medium">{label}</span>
              <span className="text-sm text-muted-foreground">{value}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
        {pro && (
          <Button
            variant="ghost"
            className="mt-3 h-10 w-full text-xs text-muted-foreground"
            onClick={() => setPro(false)}
          >
            Reset Pro (demo)
          </Button>
        )}
      </section>

      <Paywall open={paywall} onClose={() => setPaywall(false)} />
    </MobileShell>
  );
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return d;
  }
}
