import { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="px-6 pt-16 pb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent opacity-80">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-5xl leading-[1.1] font-semibold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
