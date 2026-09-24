import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CircleAlert, CircleCheck } from "lucide-react";
import { PageHeading, Panel } from "@/components/dashboard/page-elements";

export const Route = createFileRoute("/analysis/alerts")({
  head: () => ({ meta: [
    { title: "风险预警｜山居经营助手" }, { name: "description", content: "按优先级查看民宿经营风险和可执行建议。" },
    { property: "og:title", content: "风险预警｜山居经营助手" }, { property: "og:description", content: "按优先级查看民宿经营风险和可执行建议。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AlertsPage,
});
const groups = [
  { title: "高风险", icon: AlertCircle, style: "text-destructive bg-danger-soft", items: [{ problem: "周日预订率偏低", reason: "当前缺少完整渠道和订单数据，暂不能确认具体原因。", advice: "先导入近 90 天订单，再对比周日房价、曝光和转化。" }] },
  { title: "需要关注", icon: CircleAlert, style: "text-warning bg-warning-soft", items: [{ problem: "天气可能影响亲子客群", reason: "短期天气变化可能增加取消与改期。", advice: "提前发送出行提醒，并准备室内亲子活动清单。" }] },
  { title: "经营机会", icon: CircleCheck, style: "text-success bg-success-soft", items: [{ problem: "可测试周中套餐", reason: "周中通常有更多空房，但当前暂无数据验证。", advice: "先选 2 个工作日小范围测试连住或餐饮组合。" }] },
];
function AlertsPage() { return <><PageHeading title="风险预警" description="按影响程度安排处理顺序，建议均需结合实际数据验证。" /><div className="space-y-6">{groups.map(({ title, icon: Icon, style, items }) => <section key={title}><h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground"><span className={`flex size-7 items-center justify-center rounded-md ${style}`}><Icon className="size-4" /></span>{title}<span className="font-normal text-muted-foreground">{items.length} 项</span></h2>{items.map((item) => <Panel key={item.problem} className="overflow-hidden"><div className="grid divide-y divide-border lg:grid-cols-[1fr_1.4fr_1.4fr] lg:divide-x lg:divide-y-0"><Info label="问题" value={item.problem}/><Info label="原因" value={item.reason}/><Info label="AI建议" value={item.advice}/></div></Panel>)}</section>)}</div></>; }
function Info({ label, value }: { label: string; value: string }) { return <div className="p-5"><p className="text-xs font-medium text-muted-foreground">{label}</p><p className="mt-2 text-sm leading-6 text-foreground">{value}</p></div>; }
