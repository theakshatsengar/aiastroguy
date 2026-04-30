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
    <header className="px-6 pt-12 pb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl leading-[1.05] text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
