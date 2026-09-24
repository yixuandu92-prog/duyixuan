import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentAvatar, AskBox, Card, Chips, PageTitle, meta } from "@/components/dashboard/agent";

export const Route = createFileRoute("/advisor")({
  head: () => meta("AI 经营顾问", "直接告诉 AI 你遇到的经营问题，它会拆解问题、分析原因并给出下一步建议。"),
  component: AdvisorPage,
});

const quick = ["为什么最近订单变少了？", "帮我制定一个定价策略。", "怎么分析我的竞争对手？", "我应该重点关注哪些经营问题？"];
type Next = { label: string; to: "/analysis" | "/pricing" | "/competitors" };
type Reply = { points: string[]; summary: string; next: Next[] };
type Msg = { role: "user"; text: string } | { role: "ai"; reply: Reply | null };

function replyFor(q: string): Reply {
  if (/价|定价/.test(q))
    return { points: ["明确你的定价目标：入住率、收益还是竞争力。", "了解不同日期的需求强弱。", "对比周边竞品的价格策略。", "制定可以灵活调整的价格规则。"], summary: "建议先确定目标，再结合需求与竞品制定动态价格策略。", next: [{ label: "制定价格策略", to: "/pricing" }, { label: "分析竞品", to: "/competitors" }, { label: "继续拆解原因", to: "/analysis" }] };
  if (/竞|对手|市场/.test(q))
    return { points: ["确定你的主要竞品范围。", "观察竞品的价格变化。", "对比房型与产品差异。", "识别竞品覆盖不足的客群。"], summary: "建议从“价格 + 产品差异 + 目标客群”三个方向理解竞争位置。", next: [{ label: "分析竞品", to: "/competitors" }, { label: "制定价格策略", to: "/pricing" }, { label: "继续拆解原因", to: "/analysis" }] };
  return { points: ["检查需求变化。", "对比竞品的价格和产品变化。", "分析你的价格策略。", "检查不同客群和渠道的表现。"], summary: "建议先从“市场需求 + 竞品变化 + 当前价格策略”三个方向开始排查。", next: [{ label: "分析竞品", to: "/competitors" }, { label: "制定价格策略", to: "/pricing" }, { label: "继续拆解原因", to: "/analysis" }] };
}
const ordinals = ["第一", "第二", "第三", "第四"];

function AdvisorPage() {
  const navigate = useNavigate();
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const ask = (q: string) => {
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "ai", reply: null }]);
    setTimeout(() => setMsgs((m) => m.map((x, i) => (i === m.length - 1 && x.role === "ai" ? { role: "ai", reply: replyFor(q) } : x))), 1400);
  };
  useEffect(() => {
    const q = new URLSearchParams(search).get("q");
    if (q) ask(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => endRef.current?.scrollIntoView({ block: "nearest" }), [msgs]);

  return (
    <>
      <PageTitle title="AI 经营顾问" subtitle="直接告诉我你遇到的问题。" />
      <Card className="flex min-h-[640px] flex-col p-0">
        <div className="flex-1 space-y-6 p-5 sm:p-6">
          <AiBubble>
            <p className="font-medium">你好，我是你的民宿经营 AI Agent。</p>
            <p className="mt-1 text-muted-foreground">你可以直接告诉我经营中遇到的问题，我会帮你拆解问题、分析原因，并给出下一步建议。</p>
            <div className="mt-4"><Chips items={quick} onPick={ask} /></div>
          </AiBubble>
          {msgs.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end"><div className="max-w-[80%] rounded-xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">{m.text}</div></div>
            ) : (
              <AiBubble key={i}>
                {m.reply ? (
                  <>
                    <p>我可以从几个方面帮你分析这个问题：</p>
                    <ul className="mt-2 space-y-1">{m.reply.points.map((p, j) => <li key={p}><span className="font-medium">{ordinals[j]}，</span>{p}</li>)}</ul>
                    <p className="mt-3 rounded-lg bg-muted/60 px-3 py-2">{m.reply.summary}</p>
                    <p className="mt-4 text-xs font-medium text-muted-foreground">下一步你可以让我：</p>
                    <div className="mt-2 flex flex-wrap gap-2">{m.reply.next.map((n) => <Button key={n.label} size="sm" variant="outline" onClick={() => navigate({ to: n.to })}>{n.label}<ArrowRight /></Button>)}</div>
                  </>
                ) : (
                  <p className="flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin text-primary" />正在理解你的问题，拆解分析方向…</p>
                )}
              </AiBubble>
            ),
          )}
          <div ref={endRef} />
        </div>
        <div className="border-t border-border p-4"><AskBox placeholder="输入你的经营问题……" button="发送" onAsk={ask} /></div>
      </Card>
    </>
  );
}

function AiBubble({ children }: { children: React.ReactNode }) {
  return <div className="flex max-w-3xl gap-3"><AgentAvatar className="size-8" /><div className="min-w-0 flex-1 rounded-xl border border-border bg-card p-4 text-sm leading-6 text-foreground">{children}</div></div>;
}
