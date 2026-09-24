# Nanxi Homestay AI Advisor

请制作一个简洁、专业、实用的「楠溪江民宿 AI 经营顾问」网页 Demo。

整体参考传统企业管理后台，布局清晰，不要花哨，不要大面积渐变，不要复杂动画，不要科技感过强。

页面结构

采用「左侧菜单 + 右侧内容区」布局。

左侧菜单

顶部显示：

🏡 山居经营助手

菜单：

今日概览

数据与趋势

风险预警

AI经营顾问

经营周报

导入数据

左侧菜单使用蓝色按钮，文字白色，整体简单清晰。

首页：今日概览

顶部：

「早上好，楠溪小筑」

下面显示：

「数据更新于今天 09:00」

右上角：

「更新数据」按钮。

核心指标

横向显示 4 个指标：

未来7天预订率

平均房价

剩余房晚

取消率

每个指标显示：

大号数字 + 简短说明。

例如：

未来7天预订率
46%

较历史同期低 8 个百分点

如果没有真实数据，显示「暂无数据」，不要编造数据。

中间区域

左侧：

「未来7天预订趋势」

使用简单折线图。

图表保持简洁，不需要复杂视觉效果。

右侧：

「今天最需要处理」

显示 3 条 AI 提醒：

⚠ 周日预订率偏低

☁ 明天天气可能影响亲子客群

💡 建议测试周中套餐

每条提醒下面放一个小按钮：

「查看原因与建议」

页面底部

增加：

「直接问经营问题」

放 4 个快捷按钮：

为什么周日预订低？

下周价格怎么调整？

哪个房型表现最好？

生成本周经营周报

下面放一个输入框：

「请输入你的经营问题……」

右侧按钮：

「询问 AI」

点击后进入 AI 经营顾问页面。

AI经营顾问页面

页面采用左右布局。

左侧为聊天窗口。

标题：

「AI经营顾问」

副标题：

「帮你分析经营问题，并给出可执行建议。」

AI 首次回复：

「你好，我是你的民宿经营助手。

你可以问我入住率、房价、竞品、营销和客户评价等问题。」

下面提供快捷问题：

「为什么最近入住率下降？」

「周末价格怎么调整？」

「怎么提高平日入住率？」

「帮我分析竞品」

「帮我生成经营方案」

AI回答格式

AI回答不要写很长。

统一采用：

经营判断

一句话说明当前问题。

原因

列出 2～3 个主要原因。

建议

给出 2～3 个具体措施。

下一步

提供按钮：

「查看分析依据」

「生成方案」

「加入经营计划」

数据与趋势页面

显示：

「经营数据与趋势」

包括：

入住率趋势

平均房价趋势

RevPAR趋势

房费收入趋势

使用简单图表。

页面整体保持白色背景、简洁卡片。

风险预警页面

标题：

「风险预警」

按照：

🔴 高风险
🟡 需要关注
🟢 经营机会

分类显示。

每条风险包含：

问题
原因
AI建议

不要使用夸张的颜色和动画。

经营周报页面

标题：

「AI经营周报」

显示一个简洁的周报预览：

本周经营概况

主要变化

主要问题

竞品变化

AI建议

下周经营计划

提供按钮：

「生成周报」

「导出报告」

导入数据页面

标题：

「导入经营数据」

提供三个简单入口：

Excel / CSV

手动录入

连接数据源

当前 Demo 暂时不需要真正连接数据库。

上传区域只需要做出 UI。

整体视觉要求

请严格保持：

简洁

白色 / 浅灰色背景

蓝色作为主要按钮颜色

黑色文字

少量绿色和黄色用于状态

卡片不要过度圆角

不使用紫色 AI 渐变

不使用 3D

不使用大量插画

不使用复杂动画

不要做成数据大屏

不要做成手机 App 风格

整体感觉：

「真实民宿经营管理后台」

而不是：

「炫酷 AI 产品官网」。

重点是让民宿老板打开网页后，能够在 5 秒内知道：

我的经营怎么样

哪里出了问题

AI 建议我做什么

请优先保证信息层级、可读性和操作逻辑。

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://duyixuan.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cb2beff1-a350-57af-b111-ac90c6707b2c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
