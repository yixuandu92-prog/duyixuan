import { createFileRoute } from "@tanstack/react-router";
import { AnalysisDashboard } from "@/components/dashboard/analysis-dashboard";
import { meta } from "@/components/dashboard/agent";
export const Route = createFileRoute("/analysis/trends")({
  head: () => meta("数据与趋势", "查看演示预订趋势、房型和渠道表现。"),
  component: () => <AnalysisDashboard view="trends" />,
});
