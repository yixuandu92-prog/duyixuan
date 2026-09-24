import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, Panel } from "@/components/dashboard/page-elements";

export const Route = createFileRoute("/analysis/weekly-report")({
  head: () => ({ meta: [
    { title: "AI经营周报｜山居经营助手" }, { name: "description", content: "生成并查看民宿每周经营概况、问题与下周计划。" },
    { property: "og:title", content: "AI经营周报｜山居经营助手" }, { property: "og:description", content: "生成并查看民宿每周经营概况、问题与下周计划。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: WeeklyReportPage,
});
const sections = ["本周经营概况", "主要变化", "主要问题", "竞品变化", "AI建议", "下周经营计划"];
function WeeklyReportPage() { const [generated, setGenerated] = useState(false); return <><PageHeading title="AI经营周报" description="报告周期：本周一至本周日" action={<div className="flex gap-2"><Button onClick={() => setGenerated(true)}><Sparkles />生成周报</Button><Button variant="outline" disabled={!generated} onClick={() => window.print()}><Download />导出报告</Button></div>} /><Panel className="mx-auto max-w-4xl overflow-hidden"><div className="flex items-center gap-3 border-b border-border p-6"><span className="flex size-10 items-center justify-center rounded-md bg-accent text-primary"><FileText /></span><div><h2 className="font-semibold text-foreground">楠溪小筑 · 经营周报</h2><p className="mt-1 text-xs text-muted-foreground">{generated ? "报告已生成，请补充真实数据后复核" : "尚未生成"}</p></div></div><div className="divide-y divide-border">{sections.map((title) => <section key={title} className="p-6"><h3 className="text-sm font-semibold text-foreground">{title}</h3><p className="mt-3 text-sm text-muted-foreground">{generated ? "当前暂无足够经营数据，导入订单后可生成准确分析。" : "点击“生成周报”后显示内容。"}</p></section>)}</div></Panel></>; }
