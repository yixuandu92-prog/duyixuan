import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AlertTriangle, BarChart3, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { meta } from "@/components/dashboard/agent";

export const Route = createFileRoute("/analysis")({
  head: () => meta("经营分析", "让 AI 帮你发现经营问题，分析原因并给出经营建议。"),
  component: AnalysisLayout,
});

const sections = [
  { to: "/analysis/trends", label: "数据与趋势", icon: BarChart3 },
  { to: "/analysis/alerts", label: "风险预警", icon: AlertTriangle },
  { to: "/analysis/weekly-report", label: "经营周报", icon: ClipboardList },
] as const;

function AnalysisLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8">
      <aside className="mb-6 lg:mb-0">
        <nav aria-label="经营分析栏目" className="flex gap-1 overflow-x-auto lg:sticky lg:top-6 lg:flex-col">
          <Link
            to="/analysis"
            className={cn(
              "flex h-9 shrink-0 items-center rounded-lg px-3 text-sm font-medium transition-colors",
              pathname === "/analysis" ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted",
            )}
          >
            AI 分析
          </Link>
          {sections.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors",
                pathname === item.to ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
