import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyChart, PageHeading, Panel, PanelTitle } from "@/components/dashboard/page-elements";

export const Route = createFileRoute("/trends")({
  head: () => ({ meta: [
    { title: "数据与趋势｜山居经营助手" }, { name: "description", content: "查看民宿入住率、平均房价、RevPAR 与房费收入趋势。" },
    { property: "og:title", content: "数据与趋势｜山居经营助手" }, { property: "og:description", content: "查看民宿入住率、平均房价、RevPAR 与房费收入趋势。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: TrendsPage,
});
const charts = [{ title: "入住率趋势", note: "按入住日期统计" }, { title: "平均房价趋势", note: "已售房间平均价格" }, { title: "RevPAR趋势", note: "每间可售房收入" }, { title: "房费收入趋势", note: "不含其他消费" }];
function TrendsPage() { return <><PageHeading title="经营数据与趋势" description="数据周期：近 30 天" action={<Button variant="outline"><Download />导出数据</Button>} /><div className="grid gap-6 xl:grid-cols-2">{charts.map((chart) => <Panel key={chart.title}><PanelTitle aside={<span className="text-xs text-muted-foreground">{chart.note}</span>}>{chart.title}</PanelTitle><EmptyChart label="导入订单数据后显示趋势" /></Panel>)}</div></>; }
