import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  ChevronRight,
  ClipboardList,
  House,
  LayoutDashboard,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { to: "/", label: "今日概览", icon: LayoutDashboard },
  { to: "/trends", label: "数据与趋势", icon: BarChart3 },
  { to: "/alerts", label: "风险预警", icon: AlertTriangle },
  { to: "/advisor", label: "AI经营顾问", icon: Bot },
  { to: "/weekly-report", label: "经营周报", icon: ClipboardList },
  { to: "/import-data", label: "导入数据", icon: Upload },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-muted/40 lg:grid lg:grid-cols-[224px_minmax(0,1fr)]">
      <aside className="border-b border-border bg-sidebar lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <span className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <House className="size-4" aria-hidden="true" />
          </span>
          <span className="font-semibold text-sidebar-foreground">山居经营助手</span>
        </div>
        <nav aria-label="主要菜单" className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:overflow-visible">
          {navigation.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-10 shrink-0 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span>{item.label}</span>
                {active && <ChevronRight className="ml-auto hidden size-4 lg:block" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="min-w-0">
        <div className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
