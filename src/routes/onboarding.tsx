import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight, Hand, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setProfile, sunSignFor } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — Lumen" },
      { name: "description", content: "Set up your cosmic profile in under a minute." },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");

  const steps = [
    {
      icon: Sparkles,
      title: "Welcome to Lumen",
      body: "Quiet, personal AI readings drawn from palmistry, physiognomy and astrology — all in one place.",
    },
    {
      icon: Hand,
      title: "Scan, don't just guess",
      body: "Snap your palm or face and our model traces the lines, proportions and meaning behind them.",
    },
    {
      icon: Stars,
      title: "Tuned to your stars",
      body: "Tell us when and where you were born for a chart that's yours alone.",
    },
  ];

  function finish() {
    setProfile({
      name: name.trim() || "Friend",
      birthDate,
      birthTime,
      birthPlace,
      sunSign: sunSignFor(birthDate),
    });
    navigate({ to: "/" });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-cosmic/40 blur-3xl" />
        <div className="absolute -right-20 top-1/2 h-72 w-72 rounded-full bg-cosmic-glow/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-6 py-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1 w-6 rounded-full transition-colors",
                  i <= step ? "bg-foreground" : "bg-border",
                )}
              />
            ))}
          </div>
          {step < 3 && (
            <button
              onClick={() => setStep(3)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Skip
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center">
          {step < 3 ? (
            <div key={step} className="animate-in fade-in slide-in-from-bottom-4 rounded-3xl glass p-6">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-3xl gradient-cosmic shadow-glow">
                {(() => {
                  const I = steps[step].icon;
                  return <I className="h-7 w-7 text-white" strokeWidth={1.5} />;
                })()}
              </div>
              <h1 className="font-display text-4xl leading-[1.05]">
                {steps[step].title}
              </h1>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-muted-foreground">
                {steps[step].body}
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 rounded-3xl glass p-6 space-y-5">
              <h1 className="font-display text-4xl leading-[1.05]">Your details</h1>
              <p className="text-sm text-muted-foreground">
                Used only on this device. Nothing is uploaded.
              </p>

              <div className="space-y-3 pt-2">
                <Field label="Name">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-12 border-border bg-card"
                  />
                </Field>
                <Field label="Birth date">
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="h-12 border-border bg-card"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Time">
                    <Input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="h-12 border-border bg-card"
                    />
                  </Field>
                  <Field label="Place">
                    <Input
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      placeholder="City"
                      className="h-12 border-border bg-card"
                    />
                  </Field>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6">
          {step < 3 ? (
            <Button
              size="lg"
              onClick={() => setStep(step + 1)}
              className="h-12 w-full rounded-full gradient-cosmic text-white hover:opacity-90"
            >
              Continue <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={finish}
              disabled={!birthDate}
              className="h-12 w-full rounded-full gradient-cosmic text-white hover:opacity-90 disabled:opacity-40"
            >
              Begin reading <Sparkles className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
