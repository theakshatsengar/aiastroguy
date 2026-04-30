import { useEffect, useRef, useState } from "react";
import { Camera, Upload, RefreshCw, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isPro, saveReading, getReadings } from "@/lib/store";
import { Paywall } from "@/components/Paywall";

type Reading = {
  title: string;
  summary: string;
  insights: { label: string; value: string; detail: string }[];
};

const FREE_LIMIT = 1;

export function ReadingUploader({
  kind,
  prompt,
  demo,
}: {
  kind: "palm" | "face";
  prompt: string;
  demo: Reading;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");
  const [paywall, setPaywall] = useState(false);
  const [saved, setSaved] = useState(false);

  function tryStart() {
    const used = getReadings().filter((r) => r.kind === kind).length;
    if (!isPro() && used >= FREE_LIMIT) {
      setPaywall(true);
      return;
    }
    inputRef.current?.click();
  }

  function pick(file: File) {
    const url = URL.createObjectURL(file);
    setImage(url);
    setStatus("scanning");
    setSaved(false);
    setTimeout(() => setStatus("done"), 2400);
  }

  useEffect(() => {
    if (status === "done" && image && !saved) {
      saveReading({
        kind,
        title: demo.title,
        summary: demo.summary,
        thumbnail: image,
      });
      setSaved(true);
    }
  }, [status, image, saved, kind, demo]);

  function reset() {
    setImage(null);
    setStatus("idle");
  }

  return (
    <div className="px-6 pb-12">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={kind === "face" ? "user" : "environment"}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])}
      />

      {!image && (
        <div className="relative overflow-hidden rounded-3xl glass p-8 text-center">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cosmic/40 blur-3xl" />
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl gradient-cosmic shadow-glow">
            <Camera className="h-7 w-7 text-white" strokeWidth={1.6} />
          </div>
          <p className="font-display text-xl text-foreground">{prompt}</p>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
            Hold steady in good light. Your image stays on your device.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button
              size="lg"
              onClick={tryStart}
              className="h-12 rounded-full gradient-cosmic text-white hover:opacity-90"
            >
              <Camera className="mr-2 h-4 w-4" /> Take photo
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 rounded-full"
              onClick={tryStart}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload from gallery
            </Button>
          </div>
          {!isPro() && (
            <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3" /> 1 free reading · ₹99 to unlock more
            </p>
          )}
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
            <img
              src={image}
              alt="Your reading"
              className={cn(
                "aspect-[3/4] w-full object-cover transition-all duration-500",
                status === "scanning" && "brightness-75 saturate-50",
              )}
            />
            {status === "scanning" && (
              <>
                <div
                  className="absolute inset-0 animate-[scan-line_2.4s_ease-in-out_infinite]"
                  style={{ background: "var(--gradient-scan)" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cosmic/20 via-transparent to-cosmic-glow/30" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-6 text-sm font-medium text-white">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Reading the {kind === "palm" ? "lines" : "features"}…
                </div>
              </>
            )}
          </div>

          {status === "done" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="relative overflow-hidden rounded-3xl gradient-cosmic p-6 text-white shadow-glow">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                  Reading complete
                </p>
                <h2 className="mt-2 font-display text-2xl">{demo.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  {demo.summary}
                </p>
              </div>

              <div className="space-y-3">
                {demo.insights.map((i) => (
                  <div
                    key={i.label}
                    className="rounded-2xl glass p-5"
                  >
                    <div className="flex items-baseline justify-between">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {i.label}
                      </p>
                      <p className="font-display text-lg">{i.value}</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {i.detail}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-full"
                onClick={reset}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> New reading
              </Button>
            </div>
          )}
        </div>
      )}

      <Paywall open={paywall} onClose={() => setPaywall(false)} onUnlock={() => inputRef.current?.click()} />
    </div>
  );
}
