import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Compass, Lightbulb, Radar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentAvatar, AgentRun, Card, Chips, PageTitle, meta } from "@/components/dashboard/agent";

export const Route = createFileRoute("/competitors")({
  head: () => meta("竞品分析", "让 AI 帮你关注周边竞品变化，理解市场竞争与机会。"),
  component: CompetitorsPage,
});

const tasks = ["竞品价格变化", "竞品房型分析", "市场趋势", "我的竞争位置", "寻找市场机会"];
const abilities = [
  { icon: TrendingUp, t: "竞品价格变化", d: "发现竞争对手价格策略变化。" },
  { icon: Compass, t: "市场机会", d: "寻找可能被忽略的市场需求。" },
  { icon: Radar, t: "竞争变化", d: "识别近期值得关注的市场变化。" },
  { icon: Lightbulb, t: "经营建议", d: "根据市场变化提出应对策略。" },
];
const steps = ["正在收集市场信息...", "正在分析竞品...", "正在寻找变化...", "正在生成市场观察..."];

function CompetitorsPage() {
  const navigate = useNavigate();
  const [task, setTask] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const start = (t: string) => { setTask(t); setRun((n) => n + 1); };
  return (
    <>
      <PageTitle title="竞品分析" subtitle="让 AI 帮你理解市场竞争。" />
      <Card>
        <p className="mb-3 font-semibold text-foreground">选择你想了解的竞争问题</p>
        <Chips items={tasks} onPick={start} active={task} />
      </Card>
      <Card className="mt-6">
        <div className="flex gap-3"><AgentAvatar /><div>
          <p className="font-semibold text-foreground">AI 市场观察</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">我可以帮你关注周边竞品的变化，并分析这些变化可能对你的经营产生什么影响。</p>
        </div></div>
        <p className="mb-3 mt-6 text-sm font-medium text-muted-foreground">AI 可以帮你发现</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {abilities.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-lg bg-muted/60 p-4">
              <Icon className="size-4 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-foreground">{t}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <Button className="mt-5" onClick={() => start(task ?? "综合竞品分析")}>开始竞品分析</Button>
      </Card>
      {task && (
        <div className="mt-6">
          <AgentRun runKey={`${task}-${run}`} steps={steps}>
            <Card>
              <p className="text-xs font-medium text-primary">分析主题：{task}</p>
              <p className="mt-2 font-semibold text-foreground">AI 市场观察</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">近期市场竞争可能出现变化，建议重点关注价格策略、产品差异和目标客群。</p>
              <Button className="mt-5" onClick={() => navigate({ to: "/advisor", search: { q: `生成竞品应对方案：${task}` } as never })}>生成应对方案</Button>
            </Card>
          </AgentRun>
        </div>
      )}
    </>
  );
}
