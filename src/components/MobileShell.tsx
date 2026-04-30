import { Link, useLocation } from "@tanstack/react-router";
import { Home, Hand, Sparkles, Stars, User } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/palm", label: "Palm", icon: Hand },
  { to: "/face", label: "Face", icon: Sparkles },
  { to: "/horoscope", label: "Stars", icon: Stars },
  { to: "/profile", label: "You", icon: User },
] as const;

export function MobileShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen justify-center overflow-hidden">
      <div className="relative flex w-full max-w-[480px] flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-40">{children}</main>

        <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[448px] -translate-x-1/2 rounded-full glass-nav shadow-elegant">
          <ul className="flex items-center justify-around px-3 py-3">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active =
                to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      "flex min-w-[56px] flex-col items-center gap-1 rounded-full px-2.5 py-2 text-[9px] font-semibold tracking-wider transition-all duration-300",
                      active
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
                        active && "gradient-premium shadow-glow",
                      )}
                    >
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={active ? 2.2 : 1.8}
                      />
                    </span>
                    <span className="uppercase tracking-[0.15em]">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
