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
        <main className="flex-1 overflow-y-auto pb-28">{children}</main>

        <nav className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[460px] -translate-x-1/2 rounded-full glass-nav shadow-soft">
          <ul className="flex items-center justify-around px-2 py-2">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active =
                to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      "flex min-w-[52px] flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[10px] font-medium tracking-wide transition-all",
                      active
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                        active && "gradient-cosmic shadow-glow",
                      )}
                    >
                      <Icon
                        className="h-4 w-4"
                        strokeWidth={active ? 2.2 : 1.8}
                      />
                    </span>
                    <span className="uppercase tracking-[0.12em]">{label}</span>
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
