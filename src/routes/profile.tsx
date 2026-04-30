import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { PageHeader } from "@/components/PageHeader";
import { ChevronRight, Bell, Moon, Lock, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Lumen" },
      { name: "description", content: "Your birth details and app settings." },
    ],
  }),
  component: Profile,
});

const settings = [
  { icon: Bell, label: "Notifications", value: "Daily, 8:00 am" },
  { icon: Moon, label: "Theme", value: "System" },
  { icon: Lock, label: "Privacy", value: "On-device" },
  { icon: HelpCircle, label: "About", value: "v0.1" },
];

function Profile() {
  return (
    <MobileShell>
      <PageHeader eyebrow="You" title="Your chart" />

      <section className="px-6">
        <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground font-display text-xl text-background">
            ♈
          </div>
          <div className="flex-1">
            <p className="font-display text-lg leading-tight">Aries Sun</p>
            <p className="text-sm text-muted-foreground">
              Cancer Moon · Libra Rising
            </p>
          </div>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            Edit
          </button>
        </div>
      </section>

      <section className="mt-6 px-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { k: "Born", v: "Apr 3" },
            { k: "Place", v: "Mumbai" },
            { k: "Time", v: "06:42" },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-2xl border border-border bg-card p-4 text-center"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {x.k}
              </p>
              <p className="mt-1 font-display text-base">{x.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 px-6">
        <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Settings
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {settings.map(({ icon: Icon, label, value }, i) => (
            <button
              key={label}
              className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent ${
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
      </section>
    </MobileShell>
  );
}
