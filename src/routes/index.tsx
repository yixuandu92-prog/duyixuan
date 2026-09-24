import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ChevronRight, Lightbulb, LineChart, Store, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentAvatar, AskBox, Card, Chips, PageTitle, meta } from "@/components/dashboard/agent";

export const Route = createFileRoute("/")({
  head: () => meta("首页", "你的民宿经营 AI Agent：分析经营、制定价格、了解竞品，并给出下一步行动。"),
  component: HomePage,
});

const tasks = ["分析经营情况", "帮我制定房价", "看看竞品变化", "生成经营建议"];
const features = [
  { icon: LineChart, title: "经营分析", desc: "发现经营问题，分析原因并给出建议。", btn: "开始分析", to: "/analysis" },
  { icon: Tags, title: "智能定价", desc: "根据市场情况和经营目标生成价格建议。", btn: "制定价格", to: "/pricing" },
  { icon: Store, title: "竞品分析", desc: "了解周边竞品变化和市场机会。", btn: "分析竞品", to: "/competitors" },
  { icon: Lightbulb, title: "经营策略", desc: "根据你的问题生成具体经营方案。", btn: "获取建议", to: "/advisor" },
] as const;
const flow = ["理解问题", "分析信息", "发现问题", "提出建议", "执行行动"];

function HomePage() {
  const navigate = useNavigate();
  const ask = (q: string) => navigate({ to: "/advisor", search: { q } as never });
  return (
    <>
      <PageTitle title="山居经营助手" subtitle="你的民宿经营 AI 助手" />
      <Card className="p-6 sm:p-8">
        <div className="flex gap-4">
          <AgentAvatar className="size-11" />
          <div>
            <p className="text-lg font-semibold text-foreground">你好，我是你的民宿经营 AI Agent。</p>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">我可以帮你分析经营情况、制定价格、了解竞品，并把分析结果转化为下一步行动。</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <AskBox placeholder="告诉我你想解决什么经营问题……" button="开始分析" onAsk={ask} />
          <Chips items={tasks} onPick={ask} />
        </div>
      </Card>

      <h2 className="mb-4 mt-10 text-base font-semibold text-foreground">你可以让我帮你做什么？</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map(({ icon: Icon, title, desc, btn, to }) => (
          <Card key={title} className="flex flex-col p-5">
            <Icon className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-4 font-semibold text-foreground">{title}</p>
            <p className="mt-1.5 flex-1 text-sm leading-6 text-muted-foreground">{desc}</p>
            <Button variant="outline" size="sm" className="mt-4 self-start" onClick={() => navigate({ to })}>
              {btn}
              <ArrowRight />
            </Button>
          </Card>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-base font-semibold text-foreground">AI 工作方式</h2>
      <Card className="p-5">
        <ol className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          {flow.map((s, i) => (
            <li key={s} className="flex items-center gap-2 sm:flex-1">
              <span className="flex size-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-primary">{i + 1}</span>
              <span className="text-sm font-medium text-foreground">{s}</span>
              {i < flow.length - 1 && (
                <>
                  <ChevronRight className="ml-auto hidden size-4 text-muted-foreground sm:block" aria-hidden="true" />
                  <ChevronDown className="size-4 text-muted-foreground sm:hidden" aria-hidden="true" />
                </>
              )}
            </li>
          ))}
        </ol>
      </Card>
    </>
  );
}
