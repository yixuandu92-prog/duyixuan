import type { ReactNode } from "react";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </header>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("rounded-lg border border-border bg-card shadow-panel", className)}>{children}</section>;
}

export function PanelTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
      <h2 className="font-semibold text-card-foreground">{children}</h2>
      {aside}
    </div>
  );
}

export function EmptyChart({ label = "导入经营数据后显示趋势" }: { label?: string }) {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden px-6 pb-8 pt-5">
      <div className="absolute inset-x-6 bottom-10 top-5 chart-grid" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center rounded-md bg-card px-6 py-4 text-center">
        <BarChart3 className="mb-2 size-6 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm font-medium text-foreground">暂无数据</p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
      <div className="absolute inset-x-6 bottom-3 flex justify-between text-xs text-muted-foreground" aria-hidden="true">
        <span>今天</span><span>+1天</span><span>+3天</span><span>+5天</span><span>+7天</span>
      </div>
    </div>
  );
}
