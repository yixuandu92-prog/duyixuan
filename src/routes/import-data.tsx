import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Database, FileSpreadsheet, Keyboard, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, Panel } from "@/components/dashboard/page-elements";

export const Route = createFileRoute("/import-data")({
  head: () => ({ meta: [
    { title: "导入经营数据｜山居经营助手" }, { name: "description", content: "通过表格、手动录入或数据源连接导入民宿经营数据。" },
    { property: "og:title", content: "导入经营数据｜山居经营助手" }, { property: "og:description", content: "通过表格、手动录入或数据源连接导入民宿经营数据。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ImportDataPage,
});
const choices = [
  { title: "Excel / CSV", description: "上传订单、房价或收入表格", icon: FileSpreadsheet, action: "选择文件" },
  { title: "手动录入", description: "少量数据可逐条填写", icon: Keyboard, action: "开始录入" },
  { title: "连接数据源", description: "连接 PMS 或渠道系统", icon: Database, action: "查看支持范围" },
];
function ImportDataPage() { const fileRef = useRef<HTMLInputElement>(null); const [message, setMessage] = useState(""); const act = (title: string) => { if (title === "Excel / CSV") fileRef.current?.click(); else setMessage(`${title}功能将在正式版本开放`); }; return <><PageHeading title="导入经营数据" description="导入后可获得更准确的趋势、预警和 AI 建议。" /><div className="grid gap-5 lg:grid-cols-3">{choices.map(({ title, description, icon: Icon, action }) => <Panel key={title} className="p-6"><span className="flex size-10 items-center justify-center rounded-md bg-accent text-primary"><Icon /></span><h2 className="mt-5 font-semibold text-foreground">{title}</h2><p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{description}</p><Button className="mt-5 w-full" variant={title === "Excel / CSV" ? "default" : "outline"} onClick={() => act(title)}>{action}</Button></Panel>)}</div>
    <Panel className="mt-6 border-dashed p-8 text-center"><UploadCloud className="mx-auto size-8 text-muted-foreground"/><p className="mt-3 text-sm font-medium text-foreground">将 Excel 或 CSV 文件拖到此处</p><p className="mt-1 text-xs text-muted-foreground">Demo 仅展示上传界面，不会保存或处理文件</p><input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="sr-only" onChange={(e) => setMessage(e.target.files?.[0] ? `已选择：${e.target.files[0].name}` : "")}/></Panel>
    {message && <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground"><CheckCircle2 className="size-4 text-success"/>{message}</div>}
  </>; }
