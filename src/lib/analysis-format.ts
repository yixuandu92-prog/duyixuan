export function percent(value: number | null): string {
  return value === null ? "暂不可计算" : `${(value * 100).toFixed(2)}%`;
}
export function money(value: number | null): string {
  return value === null ? "暂不可计算" : `¥${value.toFixed(2)}`;
}
export function chartPoints(series: { group: string; rate: number | null }[]) {
  return series.map((row) => ({
    date: row.group,
    percent: row.rate === null ? null : row.rate * 100,
  }));
}
export function alertTitle(rule: string): string {
  const titles: Record<string, string> = {
    low_booking: "近期预订率偏低",
    weekly_occupancy_drop: "房型入住率下降",
    cancellation_rise: "取消率升高",
  };
  return titles[rule] ?? "经营提醒";
}
