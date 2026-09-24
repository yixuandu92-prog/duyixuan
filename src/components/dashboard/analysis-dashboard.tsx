import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, ArrowRight, Database } from "lucide-react";
import { Card, PageTitle } from "./agent";
import overview from "@/data/overview.json";
import partial from "@/data/overview-partial.json";
import roomTypes from "@/data/room_type.json";
import channels from "@/data/channel.json";
import { alertTitle, chartPoints, money, percent } from "@/lib/analysis-format";

type Scenario = "normal" | "partial" | "empty";
type View = "overview" | "trends" | "alerts";
const viewTitles = { overview: "经营概览", trends: "数据与趋势", alerts: "风险预警" };

export function AnalysisDashboard({ view = "overview" }: { view?: View }) {
  const [scenario, setScenario] = useState<Scenario>("normal");
  const data = scenario === "partial" ? partial : overview;
  const metrics = data.data.metrics.data;
  const future = metrics.future;
  const series = data.data.trends.data.series;
  const alerts = data.data.alerts.data.alerts;
  return (
    <div className="space-y-6">
      <PageTitle title={viewTitles[view]} subtitle="用经营数据查看表现与风险，分析结果可追溯。" />
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
        <p className="flex items-center gap-2 font-semibold">
          <Database className="size-4" />
          演示数据 · 山居演示民宿（虚构）
        </p>
        <p className="mt-1">
          数据截至 {data.context.as_of}。由 Python 分析工具生成，尚未连接真实数据、后端或 AI。
        </p>
        <label className="mt-3 flex flex-wrap items-center gap-2">
          查看演示状态
          <select
            className="rounded-md border border-blue-200 bg-white p-2"
            value={scenario}
            onChange={(e) => setScenario(e.target.value as Scenario)}
          >
            <option value="normal">完整样例</option>
            <option value="partial">缺少一天库存</option>
            <option value="empty">尚未导入数据</option>
          </select>
        </label>
      </div>
      {scenario === "empty" ? (
        <Card>
          <h2 className="font-semibold">暂无经营数据</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            导入入口尚未连接。请先准备订单 CSV 和每日库存 CSV；此状态不展示指标或预警。
          </p>
        </Card>
      ) : (
        <>
          {scenario === "partial" && (
            <p
              role="status"
              className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
            >
              缺少 2026-09-24
              库存：预订率和剩余房晚暂不可计算，图表保留缺口。已有订单金额和取消率仍可查看。
            </p>
          )}
          {view !== "alerts" && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Metric
                  title="未来7天预订率"
                  value={percent(future.booking_rate.value)}
                  note={`${future.start} 至 ${future.end}`}
                  reason={future.booking_rate.reason}
                />
                <Metric
                  title="已预订平均房价"
                  value={money(future.booked_adr.value)}
                  note="未来7天房费 ÷ 已预订房晚"
                  reason={future.booked_adr.reason}
                />
                <Metric
                  title="剩余房晚"
                  value={
                    future.remaining_room_nights.value === null
                      ? "暂不可计算"
                      : `${future.remaining_room_nights.value} 房晚`
                  }
                  note="总可售房晚减去已预订房晚"
                  reason={future.remaining_room_nights.reason}
                />
                <Metric
                  title="近30天取消率"
                  value={percent(metrics.cancellation.rate.value)}
                  note={`按创建日期：${metrics.cancellation.start} 至 ${metrics.cancellation.end}`}
                  reason={metrics.cancellation.rate.reason}
                />
              </div>
              <Card>
                <h2 className="font-semibold">未来7天预订趋势</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  当前预订率，不是最终入住率；缺失库存不按 0 处理。
                </p>
                <div
                  className="mt-5 h-64 min-w-0"
                  role="img"
                  aria-label="未来7天预订率折线图，详细数据见下方表格"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartPoints(series)}
                      margin={{ top: 10, right: 12, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(v: string) => v.slice(5)}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tickFormatter={(v: number) => `${v}%`}
                        width={42}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "预订率"]} />
                      <Line
                        type="linear"
                        dataKey="percent"
                        stroke="#0969da"
                        strokeWidth={2}
                        connectNulls={false}
                        isAnimationActive={false}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer text-primary">查看每日数据</summary>
                  <div className="overflow-x-auto">
                    <table className="mt-3 w-full text-left text-sm">
                      <thead>
                        <tr>
                          <th className="p-2">日期</th>
                          <th className="p-2">已订房晚</th>
                          <th className="p-2">可售房晚</th>
                          <th className="p-2">预订率</th>
                        </tr>
                      </thead>
                      <tbody>
                        {series.map((row) => (
                          <tr key={row.group} className="border-t">
                            <td className="p-2">{row.group}</td>
                            <td className="p-2">{row.room_nights}</td>
                            <td className="p-2">{row.available_room_nights ?? "缺少库存"}</td>
                            <td className="p-2">{percent(row.rate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              </Card>
            </>
          )}
          {view === "trends" && (
            <>
              <Comparison title="房型对比" result={roomTypes} />
              <Comparison title="渠道对比" result={channels} />
              <p className="text-xs text-muted-foreground">
                以上对比使用完整的历史周数据（2026-09-14 至
                09-20）；渠道未分配专属库存，不计算渠道入住率。未来库存缺失演示不影响这段历史数据。
              </p>
            </>
          )}
          {view !== "trends" && (
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold">需要关注 · {alerts.length} 项</h2>
                {view === "overview" && (
                  <Link
                    to="/analysis/alerts"
                    className="flex items-center gap-1 text-sm text-primary"
                  >
                    查看全部预警
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                基于规则的筛查，不证明原因；暂未分析天气、竞品或最优价格。
              </p>
              <div className="mt-4 divide-y">
                {(view === "overview" ? alerts.slice(0, 3) : alerts).map((alert) => (
                  <details
                    key={`${alert.rule}-${alert.start}-${"room_type" in alert ? alert.room_type : "all"}`}
                    className="py-4"
                  >
                    <summary className="cursor-pointer text-sm font-medium">
                      <AlertTriangle className="mr-2 inline size-4 text-amber-600" />
                      {alertTitle(alert.rule)}
                      {"room_type" in alert ? ` · ${alert.room_type}` : ""}
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {alert.start} 至 {alert.end} · 查看依据
                      </span>
                    </summary>
                    <div className="mt-3 space-y-2 rounded-lg bg-muted/50 p-4 text-sm">
                      <p>
                        当前值：{percent(alert.current)}
                        {alert.reference !== null ? `；参考值：${percent(alert.reference)}` : ""}
                      </p>
                      <p>
                        {alert.rule === "low_booking"
                          ? `触发条件：预订率低于 ${percent(alert.threshold)}`
                          : `触发条件：${alert.rule === "weekly_occupancy_drop" ? "下降" : "上升"}至少 ${(alert.threshold * 100).toFixed(0)} 个百分点`}
                      </p>
                      <details>
                        <summary className="cursor-pointer text-primary">查看计算证据</summary>
                        <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-all text-xs">
                          {JSON.stringify(alert.evidence, null, 2)}
                        </pre>
                      </details>
                    </div>
                  </details>
                ))}
              </div>
              {data.data.alerts.warnings.map((warning) => (
                <p
                  key={`${warning.code}-${warning.message}`}
                  className="mt-3 text-xs text-muted-foreground"
                >
                  {warning.message}
                </p>
              ))}
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function Metric({
  title,
  value,
  note,
  reason,
}: {
  title: string;
  value: string;
  note: string;
  reason: string | null;
}) {
  return (
    <Card className="p-4">
      <h2 className="text-sm text-muted-foreground">{title}</h2>
      <p className="my-3 break-words text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs leading-5 text-muted-foreground">{reason ?? note}</p>
    </Card>
  );
}
type ComparisonResult = {
  data: {
    series: {
      group: string;
      room_nights: number;
      revenue: number;
      order_count: number;
      rate: number | null;
      room_night_share: number | null;
    }[];
  };
};
function Comparison({ title, result }: { title: string; result: ComparisonResult }) {
  return (
    <Card>
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">历史实际 · 2026-09-14 至 2026-09-20</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left text-sm">
          <thead>
            <tr>
              {["名称", "房晚", "房费收入", "订单数", "入住率", "房晚占比"].map((label) => (
                <th key={label} className="p-2 font-medium">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.data.series.map((row) => (
              <tr key={row.group} className="border-t">
                <td className="p-2">{row.group}</td>
                <td className="p-2">{row.room_nights}</td>
                <td className="p-2">{money(row.revenue)}</td>
                <td className="p-2">{row.order_count}</td>
                <td className="p-2">{row.rate === null ? "不适用" : percent(row.rate)}</td>
                <td className="p-2">{percent(row.room_night_share)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
