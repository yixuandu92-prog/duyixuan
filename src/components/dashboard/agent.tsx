import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Bot, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-xl border border-border bg-card p-6 shadow-panel", className)}>{children}</section>;
}

export function AgentAvatar({ className }: { className?: string }) {
  return (
    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary", className)}>
      <Bot className="size-4" aria-hidden="true" />
    </span>
  );
}

export function AskBox({
  placeholder,
  button,
  onAsk,
}: {
  placeholder: string;
  button: string;
  onAsk: (q: string) => void;
}) {
  const [value, setValue] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAsk(value.trim());
      setValue("");
    }
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} aria-label={placeholder} className="h-11 bg-card" />
      <Button type="submit" className="h-11 sm:px-6">
        <Sparkles />
        {button}
      </Button>
    </form>
  );
}

export function Chips({ items, onPick, active }: { items: string[]; onPick: (v: string) => void; active?: string | null }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Button key={item} type="button" size="sm" variant={active === item ? "default" : "outline"} className="rounded-full" onClick={() => onPick(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
}

/** Shows agent steps one by one, then renders children as the result. */
export function AgentRun({ runKey, steps, children }: { runKey: string; steps: string[]; children: ReactNode }) {
  const [done, setDone] = useState(0);
  useEffect(() => {
    setDone(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setDone(i);
      if (i >= steps.length) clearInterval(t);
    }, 650);
    return () => clearInterval(t);
  }, [runKey, steps.length]);

  const finished = done >= steps.length;
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <AgentAvatar className="size-8" />
          <p className="text-sm font-medium text-foreground">{finished ? "AI 分析完成" : "AI 正在工作…"}</p>
        </div>
        <ol className="mt-4 space-y-2 pl-11">
          {steps.map((s, i) => (
            <li key={s} className={cn("flex items-center gap-2 text-sm", i <= done ? "text-foreground" : "text-muted-foreground/60")}>
              {i < done ? (
                <Check className="size-4 text-success" aria-hidden="true" />
              ) : i === done ? (
                <Loader2 className="size-4 animate-spin text-primary" aria-hidden="true" />
              ) : (
                <span className="size-4 rounded-full border border-border" aria-hidden="true" />
              )}
              {s}
            </li>
          ))}
        </ol>
      </Card>
      {finished && children}
    </div>
  );
}

export function ResultSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg bg-muted/60 p-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{children}</p>
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
    </header>
  );
}

export function meta(title: string, description: string) {
  const t = `${title}｜山居经营助手`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
