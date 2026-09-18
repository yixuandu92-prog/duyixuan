import { createFileRoute } from "@tanstack/react-router";
import { PageHeading, Panel } from "@/components/dashboard/page-elements";

export const Route = createFileRoute("/advisor")({
  head: () => ({ meta: [
    { title: "AI经营顾问｜山居经营助手" }, { name: "description", content: "咨询入住率、房价、竞品、营销和客户评价等经营问题。" },
    { property: "og:title", content: "AI经营顾问｜山居经营助手" }, { property: "og:description", content: "咨询入住率、房价、竞品、营销和客户评价等经营问题。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AdvisorPage,
});

const COZE_CHAT_URL = "https://code.coze.cn/p/7686783206829391887";

function AdvisorPage() {
  return (
    <>
      <PageHeading title="AI经营顾问" description="帮你分析经营问题，并给出可执行建议。" />
      <Panel className="overflow-hidden">
        <iframe
          src={COZE_CHAT_URL}
          title="AI经营顾问"
          className="h-[720px] w-full border-0"
          allow="microphone; clipboard-write"
        />
      </Panel>
    </>
  );
}
