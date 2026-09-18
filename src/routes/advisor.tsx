import { FormEvent, useState } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { Bot, Check, FilePlus2, ListTree, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeading, Panel } from "@/components/dashboard/page-elements";

export const Route = createFileRoute("/advisor")({
  head: () => ({ meta: [
    { title: "AI经营顾问｜山居经营助手" }, { name: "description", content: "咨询入住率、房价、竞品、营销和客户评价等经营问题。" },
    { property: "og:title", content: "AI经营顾问｜山居经营助手" }, { property: "og:description", content: "咨询入住率、房价、竞品、营销和客户评价等经营问题。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AdvisorPage,
});
const quickQuestions = ["为什么最近入住率下降？", "周末价格怎么调整？", "怎么提高平日入住率？", "帮我分析竞品", "帮我生成经营方案"];
function AdvisorPage() {
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const initial = new URLSearchParams(search).get("q") ?? "";
  const [input, setInput] = useState(initial);
  const [asked, setAsked] = useState(initial);
  const [saved, setSaved] = useState(false);
  const ask = (q: string) => { setInput(""); setAsked(q); setSaved(false); };
  const submit = (e: FormEvent) => { e.preventDefault(); if (input.trim()) ask(input.trim()); };
  return <><PageHeading title="AI经营顾问" description="帮你分析经营问题，并给出可执行建议。" />
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_320px]">
      <Panel className="flex min-h-[650px] flex-col overflow-hidden">
        <div className="flex-1 space-y-6 p-5 sm:p-6">
          <Message icon={<Bot />}><p>你好，我是你的民宿经营助手。</p><p className="mt-2">你可以问我入住率、房价、竞品、营销和客户评价等问题。</p></Message>
          {asked && <><div className="flex justify-end"><div className="max-w-[80%] rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground"><span className="sr-only">你的问题：</span>{asked}</div></div>
            <Message icon={<Bot />}><Answer question={asked} saved={saved} setSaved={setSaved}/></Message></>}
        </div>
        <form onSubmit={submit} className="flex gap-2 border-t border-border bg-muted/30 p-4"><Input value={input} onChange={(e) => setInput(e.target.value)} className="h-10 bg-card" placeholder="请输入你的经营问题……" aria-label="向 AI 提问"/><Button type="submit" className="h-10"><Send />发送</Button></form>
      </Panel>
      <aside><Panel className="p-5"><h2 className="text-sm font-semibold text-foreground">常见经营问题</h2><div className="mt-4 space-y-2">{quickQuestions.map((q) => <Button key={q} variant="outline" className="h-auto w-full justify-start whitespace-normal py-2.5 text-left" onClick={() => ask(q)}>{q}</Button>)}</div></Panel></aside>
    </div>
  </>;
}
function Message({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) { return <div className="flex max-w-3xl gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-primary [&_svg]:size-4">{icon}</span><div className="rounded-lg border border-border bg-card p-4 text-sm leading-6 text-foreground shadow-panel">{children}</div></div>; }
function Answer({ question, saved, setSaved }: { question: string; saved: boolean; setSaved: (v: boolean) => void }) { return <div className="space-y-4"><section><h3 className="font-semibold">经营判断</h3><p className="mt-1">“{question}”需要结合订单、价格和渠道数据判断，当前先按常见经营情况给出排查方向。</p></section><section><h3 className="font-semibold">原因</h3><ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground"><li>当前缺少可用于对比的真实经营数据。</li><li>房价、渠道曝光和客群需求可能同时影响结果。</li><li>天气与节假日也会造成短期波动。</li></ul></section><section><h3 className="font-semibold">建议</h3><ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground"><li>先导入近 90 天订单与房价数据。</li><li>按日期、房型和渠道拆分比较。</li><li>选择一个小范围方案测试 7 天后复盘。</li></ul></section><section><h3 className="font-semibold">下一步</h3><div className="mt-2 flex flex-wrap gap-2"><Button size="sm" variant="outline"><ListTree />查看分析依据</Button><Button size="sm"><FilePlus2 />生成方案</Button><Button size="sm" variant="outline" onClick={() => setSaved(true)}>{saved ? <Check /> : null}{saved ? "已加入计划" : "加入经营计划"}</Button></div></section></div>; }
