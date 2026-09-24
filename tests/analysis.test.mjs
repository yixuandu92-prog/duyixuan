import { test } from "node:test";
import assert from "node:assert/strict";
import { percent, money, chartPoints, alertTitle } from "../src/lib/analysis-format.ts";
test("zero remains visible and null stays unavailable", () => {
  assert.equal(percent(0), "0.00%");
  assert.equal(percent(null), "暂不可计算");
  assert.equal(percent(0.42857143), "42.86%");
  assert.equal(money(402), "¥402.00");
  assert.equal(money(null), "暂不可计算");
});
test("chart preserves missing dates and scales fractions", () => {
  const p = chartPoints([
    { group: "2026-09-21", rate: 0 },
    { group: "2026-09-22", rate: null },
    { group: "2026-09-23", rate: 0.3 },
  ]);
  assert.deepEqual(
    p.map((x) => x.percent),
    [0, null, 30],
  );
  assert.equal(p.length, 3);
});
test("unknown alerts retain safe generic title", () => {
  assert.equal(alertTitle("low_booking"), "近期预订率偏低");
  assert.equal(alertTitle("new_rule"), "经营提醒");
});
