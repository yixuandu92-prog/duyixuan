import { createFileRoute } from "@tanstack/react-router";
import { AnalysisDashboard } from "@/components/dashboard/analysis-dashboard";
import { meta } from "@/components/dashboard/agent";
export const Route = createFileRoute("/analysis/alerts")({
  head: () => meta("风险预警", "查看由演示订单计算的规则预警及证据。"),
  component: () => <AnalysisDashboard view="alerts" />,
});
