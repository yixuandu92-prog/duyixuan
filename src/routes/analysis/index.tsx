import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AgentAvatar, AgentRun, AskBox, Card, Chips, PageTitle, ResultSection, meta } from "@/components/dashboard/agent";

export const Route = createFileRoute("/analysis/")({
  head: () => meta("经营分析", "让 AI 帮你发现经营问题，分析原因并给出经营建议。"),
  component: AnalysisPage,
});

const tasks = ["收入变化原因", "入住表现", "房型表现", "客源变化", "渠道表现"];
const steps = ["正在理解问题...", "正在分析相关信息...", "正在寻找可能原因...", "正在生成经营建议..."];

function AnalysisPage() {
  const navigate = useNavigate();
  const [task, setTask] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const start = (q: string) => { setTask(q); setRun((n) => n + 1); };
  return (
    <>
      <PageTitle title="经营分析" subtitle="让 AI 帮你发现经营问题。" />
      <Card>
        <div className="flex items-center gap-3"><AgentAvatar /><p className="font-semibold text-foreground">你想了解哪方面的经营情况？</p></div>
        <div className="mt-5"><AskBox placeholder="例如：为什么最近订单减少？" button="开始分析" onAsk={start} /></div>
        <p className="mb-3 mt-6 text-sm font-medium text-muted-foreground">常见分析任务</p>
        <Chips items={tasks} onPick={start} active={task} />
      </Card>
      {task && (
        <div className="mt-6">
          <p className="mb-3 text-sm text-muted-foreground">分析任务：<span className="font-medium text-foreground">{task}</span></p>
          <AgentRun runKey={`${task}-${run}`} steps={steps}>
            <Card>
              <p className="font-semibold text-foreground">AI 分析完成</p>
              <p className="mt-1 text-sm text-muted-foreground">我发现当前经营中可能存在几个值得关注的问题。</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <ResultSection title="问题发现">部分时段的需求表现可能偏弱。</ResultSection>
                <ResultSection title="原因分析">可能与价格、市场需求和竞品变化有关。</ResultSection>
                <ResultSection title="经营建议">建议进一步检查相关时段的价格策略和市场竞争情况。</ResultSection>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => navigate({ to: "/advisor", search: { q: `继续分析：${task}` } as never })}>继续分析</Button>
                <Button onClick={() => navigate({ to: "/advisor", search: { q: `生成经营方案：${task}` } as never })}>生成经营方案</Button>
              </div>
            </Card>
          </AgentRun>
        </div>
      )}
    </>
  );
}
