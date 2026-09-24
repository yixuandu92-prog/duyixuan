import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentAvatar, AgentRun, AskBox, Card, Chips, PageTitle, ResultSection, meta } from "@/components/dashboard/agent";

export const Route = createFileRoute("/pricing")({
  head: () => meta("智能定价", "让 AI 结合市场需求、竞品与经营目标，帮你制定更合理的价格策略。"),
  component: PricingPage,
});

const goals = ["提高入住率", "提高收益", "保持竞争力", "节假日定价"];
const steps = ["分析市场需求", "分析竞品情况", "分析历史表现", "结合经营目标", "生成价格建议"];
const selectClass = "h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground";

function PricingPage() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const start = (g: string) => { setGoal(g); setRun((n) => n + 1); };
  return (
    <>
      <PageTitle title="智能定价" subtitle="让 AI 帮你制定更合理的价格策略。" />
      <Card>
        <p className="font-semibold text-foreground">你想为哪个房型制定价格？</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-muted-foreground">房型
            <select className={`${selectClass} mt-1.5`} defaultValue=""><option value="" disabled>选择房型</option><option>山景大床房</option><option>溪景双床房</option><option>亲子家庭房</option></select>
          </label>
          <label className="text-sm text-muted-foreground">日期
            <Input type="date" className="mt-1.5 h-11 bg-card" aria-label="选择日期" />
          </label>
        </div>
      </Card>
      <Card className="mt-6">
        <div className="flex items-center gap-3"><AgentAvatar /><p className="font-semibold text-foreground">AI 定价助手</p></div>
        <div className="mt-5"><AskBox placeholder="告诉我你的定价目标……" button="开始分析" onAsk={start} /></div>
        <div className="mt-4"><Chips items={goals} onPick={start} active={goal} /></div>
      </Card>
      {goal && (
        <div className="mt-6">
          <AgentRun runKey={`${goal}-${run}`} steps={steps}>
            <Card>
              <p className="text-xs font-medium text-primary">定价目标：{goal}</p>
              <p className="mt-2 font-semibold text-foreground">AI 建议</p>
              <p className="mt-2 text-sm leading-6 text-foreground">当前市场环境下，可以考虑采用更灵活的价格策略。</p>
              <p className="text-sm leading-6 text-muted-foreground">建议根据需求变化动态调整价格，而不是长期保持固定价格。</p>
              <p className="mb-3 mt-6 text-sm font-semibold text-foreground">为什么这样建议？</p>
              <div className="grid gap-3 md:grid-cols-3">
                <ResultSection title="市场需求">不同日期的需求强弱不同，价格可随之灵活变化。</ResultSection>
                <ResultSection title="竞争情况">周边竞品的价格策略会影响客人的选择。</ResultSection>
                <ResultSection title="经营目标">价格应服务于你当前更看重的入住或收益目标。</ResultSection>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={() => navigate({ to: "/advisor", search: { q: `查看完整定价建议：${goal}` } as never })}>查看完整建议</Button>
                <Button variant="outline" onClick={() => setRun((n) => n + 1)}>重新分析</Button>
              </div>
            </Card>
          </AgentRun>
        </div>
      )}
    </>
  );
}
