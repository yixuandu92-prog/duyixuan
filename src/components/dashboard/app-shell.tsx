import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bot, Home, LineChart, MessagesSquare, Settings, Store, Tags } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { to: "/", label: "首页", icon: Home },
  { to: "/analysis", label: "经营分析", icon: LineChart },
  { to: "/pricing", label: "智能定价", icon: Tags },
  { to: "/competitors", label: "竞品分析", icon: Store },
  { to: "/advisor", label: "AI Chat", icon: MessagesSquare },
] as const;

function NavItem({ to, label, icon: Icon, active }: { to: string; label: string; icon: typeof Home; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex h-10 shrink-0 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
        active ? "bg-accent text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent",
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
      <aside className="flex flex-col border-b border-border bg-sidebar lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">山居经营助手</p>
            <p className="text-xs text-muted-foreground">民宿经营 AI Agent</p>
          </div>
        </div>
        <nav aria-label="主要菜单" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible">
          {navigation.map((item) => (
            <NavItem key={item.to} {...item} active={pathname === item.to} />
          ))}
        </nav>
        <div className="hidden border-t border-border p-3 lg:block">
          <NavItem to="/settings" label="设置" icon={Settings} active={pathname === "/settings"} />
        </div>
      </aside>
      <main className="min-w-0">
        <div className="flex h-14 items-center justify-end gap-3 px-4 sm:px-8">
          <Link to="/settings" className="text-sm text-muted-foreground lg:hidden">设置</Link>
          <span className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
            <span className="size-2 rounded-full bg-success" aria-hidden="true" />
            AI 在线
          </span>
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-12 sm:px-8">{children}</div>
      </main>
    </div>
  );
}
