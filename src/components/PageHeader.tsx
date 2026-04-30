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
    <header className="px-6 pt-10 pb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-md">
          {eyebrow && (
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl leading-[1.05] text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
