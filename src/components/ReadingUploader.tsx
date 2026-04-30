import { useRef, useState } from "react";
import { Camera, Upload, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Reading = {
  title: string;
  summary: string;
  insights: { label: string; value: string; detail: string }[];
};

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

  function pick(file: File) {
    const url = URL.createObjectURL(file);
    setImage(url);
    setStatus("scanning");
    setTimeout(() => setStatus("done"), 2200);
  }

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
        <div className="rounded-3xl border border-dashed border-border bg-surface p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background">
            <Camera className="h-7 w-7" strokeWidth={1.6} />
          </div>
          <p className="font-display text-xl text-foreground">{prompt}</p>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
            Hold steady in good light. Your image stays on your device.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button
              size="lg"
              className="h-12 rounded-full"
              onClick={() => inputRef.current?.click()}
            >
              <Camera className="mr-2 h-4 w-4" /> Take photo
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 rounded-full"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload from gallery
            </Button>
          </div>
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
            <img
              src={image}
              alt="Your reading"
              className={cn(
                "aspect-[3/4] w-full object-cover transition-all",
                status === "scanning" && "grayscale",
              )}
            />
            {status === "scanning" && (
              <>
                <div className="absolute inset-x-0 top-0 h-1 animate-[scan_2.2s_ease-in-out_infinite] bg-foreground/80" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent p-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    Reading the lines…
                  </div>
                </div>
              </>
            )}
          </div>

          {status === "done" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="rounded-3xl bg-foreground p-6 text-background">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-background/60">
                  Reading complete
                </p>
                <h2 className="mt-2 font-display text-2xl">{demo.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-background/80">
                  {demo.summary}
                </p>
              </div>

              <div className="space-y-3">
                {demo.insights.map((i) => (
                  <div
                    key={i.label}
                    className="rounded-2xl border border-border bg-card p-5"
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

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(420px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
