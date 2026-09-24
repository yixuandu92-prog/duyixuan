import { createFileRoute } from "@tanstack/react-router";
import { AnalysisDashboard } from "@/components/dashboard/analysis-dashboard";
import { meta } from "@/components/dashboard/agent";
export const Route = createFileRoute("/analysis/")({
  head: () => meta("经营概览", "查看演示经营指标、未来预订趋势与可追溯预警。"),
  component: () => <AnalysisDashboard />,
});
