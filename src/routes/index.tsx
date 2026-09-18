import { FormEvent, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CloudSun, Lightbulb, RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyChart, PageHeading, Panel, PanelTitle } from "@/components/dashboard/page-elements";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "今日概览｜山居经营助手" },
    { name: "description", content: "查看楠溪江民宿今日经营概况、风险提醒与 AI 建议。" },
    { property: "og:title", content: "今日概览｜山居经营助手" },
    { property: "og:description", content: "查看楠溪江民宿今日经营概况、风险提醒与 AI 建议。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: OverviewPage,
});

const metrics = [
  ["未来7天预订率", "用于判断短期客流情况"],
  ["平均房价", "未来7天已售房间均价"],
  ["剩余房晚", "未来7天仍可售房晚"],
  ["取消率", "近30天订单取消比例"],
];
const questions = ["为什么周日预订低？", "下周价格怎么调整？", "哪个房型表现最好？", "生成本周经营周报"];
const reminders = [
  { icon: TriangleAlert, title: "周日预订率偏低", detail: "建议优先检查周日价格与渠道曝光。", tone: "text-destructive bg-danger-soft" },
  { icon: CloudSun, title: "明天天气可能影响亲子客群", detail: "可提前准备室内活动与改期沟通。", tone: "text-warning bg-warning-soft" },
  { icon: Lightbulb, title: "建议测试周中套餐", detail: "用小范围优惠验证平日需求。", tone: "text-success bg-success-soft" },
];

function OverviewPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [updated, setUpdated] = useState(false);
  const ask = (value: string) => navigate({ to: "/advisor", search: { q: value } as never });
  const submit = (event: FormEvent) => { event.preventDefault(); if (question.trim()) ask(question.trim()); };

  return <>
    <PageHeading title="早上好，楠溪小筑" description={updated ? "数据已检查，当前无新数据" : "数据更新于今天 09:00"} action={
      <Button variant="outline" onClick={() => setUpdated(true)}><RefreshCw />更新数据</Button>
    } />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([name, description]) => <Panel key={name} className="p-5">
        <p className="text-sm font-medium text-muted-foreground">{name}</p>
        <p className="mt-4 text-2xl font-semibold text-foreground">暂无数据</p>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </Panel>)}
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
      <Panel><PanelTitle aside={<span className="text-xs text-muted-foreground">未来 7 天</span>}>未来7天预订趋势</PanelTitle><EmptyChart /></Panel>
      <Panel><PanelTitle>今天最需要处理</PanelTitle><div className="divide-y divide-border">
        {reminders.map(({ icon: Icon, title, detail, tone }) => <div key={title} className="p-4">
          <div className="flex gap-3"><span className={`flex size-8 shrink-0 items-center justify-center rounded-md ${tone}`}><Icon className="size-4" /></span>
            <div className="min-w-0"><p className="text-sm font-medium text-foreground">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
              <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs" onClick={() => ask(title)}>查看原因与建议<ArrowRight /></Button>
            </div></div>
        </div>)}
      </div></Panel>
    </div>

    <Panel className="mt-6"><PanelTitle aside={<CalendarDays className="size-4 text-muted-foreground" />}>直接问经营问题</PanelTitle>
      <div className="p-5"><div className="flex flex-wrap gap-2">{questions.map((item) => <Button key={item} variant="outline" size="sm" onClick={() => ask(item)}>{item}</Button>)}</div>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row"><Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="请输入你的经营问题……" className="h-10" aria-label="经营问题"/><Button className="h-10 sm:w-28" type="submit">询问 AI</Button></form>
      </div>
    </Panel>
  </>;
}
