import { useState } from "react";
import { Sparkles, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPro } from "@/lib/store";

export function Paywall({
  open,
  onClose,
  onUnlock,
}: {
  open: boolean;
  onClose: () => void;
  onUnlock?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  if (!open) return null;

  function purchase() {
    setLoading(true);
    setTimeout(() => {
      setPro(true);
      setLoading(false);
      onUnlock?.();
      onClose();
    }, 900);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-md animate-in fade-in sm:items-center">
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-t-3xl border border-white/10 card-premium p-8 pb-10 shadow-elegant animate-in slide-in-from-bottom-8 sm:rounded-3xl">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cosmic-glow/40 blur-3xl" />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-premium shadow-glow">
            <Sparkles className="h-6 w-6 text-white" strokeWidth={1.6} />
          </div>
          <h2 className="mt-6 text-center font-display text-4xl font-semibold">
            Unlock Lumen Pro
          </h2>
          <p className="mt-3 text-center text-base text-muted-foreground">
            Deeper readings, unlimited scans, and your full birth chart.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Unlimited palm & face readings",
              "Detailed birth chart & transits",
              "Daily personalised horoscope",
              "Save and revisit past readings",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-base">
                <span className="flex h-5 w-5 items-center justify-center rounded-full gradient-premium flex-shrink-0">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl card-premium border border-white/10 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Lifetime access
            </p>
            <p className="mt-3 font-display text-5xl font-semibold">
              ₹99 <span className="text-lg text-muted-foreground line-through">₹499</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">One-time payment · demo</p>
          </div>

          <Button
            disabled={loading}
            onClick={purchase}
            className="mt-7 h-12 w-full rounded-full gradient-premium text-white font-semibold hover:shadow-glow disabled:opacity-50 transition-all"
          >
            {loading ? "Processing…" : "Unlock for ₹99"}
          </Button>
          <button
            onClick={onClose}
            className="mt-4 block w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
