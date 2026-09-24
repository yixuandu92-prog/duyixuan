import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Card, PageTitle, meta } from "@/components/dashboard/agent";

export const Route = createFileRoute("/settings")({
  head: () => meta("设置", "设置民宿名称与 AI 助手偏好。"),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageTitle title="设置" subtitle="让 AI 更了解你的民宿。" />
      <Card className="max-w-2xl space-y-5">
        <label className="block text-sm font-medium text-foreground">民宿名称
          <Input className="mt-1.5 h-11" placeholder="例如：楠溪小筑" />
        </label>
        <label className="block text-sm font-medium text-foreground">所在区域
          <Input className="mt-1.5 h-11" placeholder="例如：永嘉 · 楠溪江" />
        </label>
        <label className="block text-sm font-medium text-foreground">AI 回答风格
          <select className="mt-1.5 h-11 w-full rounded-md border border-input bg-card px-3 text-sm">
            <option>简洁直接</option><option>详细解释</option>
          </select>
        </label>
        <p className="text-xs text-muted-foreground">当前为演示版本，设置不会被保存。</p>
      </Card>
    </>
  );
}
