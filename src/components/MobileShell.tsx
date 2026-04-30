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
    <div className="flex min-h-screen justify-center bg-surface">
      <div className="relative flex w-full max-w-[480px] flex-col bg-background shadow-soft">
        <main className="flex-1 pb-24">{children}</main>

        <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 border-t border-border bg-background/90 backdrop-blur-xl">
          <ul className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-2">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active =
                to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      "flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] font-medium tracking-wide transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-transform",
                        active && "scale-110",
                      )}
                      strokeWidth={active ? 2.4 : 1.8}
                    />
                    <span className="uppercase">{label}</span>
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
