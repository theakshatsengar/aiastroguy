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
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-md animate-in fade-in sm:items-center">
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-t-3xl glass-strong p-6 pb-8 shadow-soft animate-in slide-in-from-bottom-8 sm:rounded-3xl">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cosmic-glow/40 blur-3xl" />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-cosmic shadow-glow">
            <Sparkles className="h-6 w-6 text-white" strokeWidth={1.6} />
          </div>
          <h2 className="mt-5 text-center font-display text-3xl">
            Unlock <span className="text-cosmic">Lumen Pro</span>
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Deeper readings, unlimited scans, and your full birth chart.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Unlimited palm & face readings",
              "Detailed birth chart & transits",
              "Daily personalised horoscope",
              "Save and revisit past readings",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full gradient-cosmic">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl glass p-5 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Lifetime access
            </p>
            <p className="mt-1 font-display text-4xl">
              ₹99 <span className="text-base text-muted-foreground line-through">₹499</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">One-time payment · demo</p>
          </div>

          <Button
            size="lg"
            disabled={loading}
            onClick={purchase}
            className="mt-5 h-12 w-full rounded-full gradient-cosmic text-white hover:opacity-90"
          >
            {loading ? "Processing…" : "Unlock for ₹99"}
          </Button>
          <button
            onClick={onClose}
            className="mt-3 block w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
