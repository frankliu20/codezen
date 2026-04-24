<p align="center">
  <img src="media/icon.png" width="128" alt="CodeZen logo" />
</p>

<h1 align="center">CodeZen 🪵</h1>

<p align="center">
  <strong>每一次击键都是一次叩拜，每一行代码都是一步修行。</strong><br>
  你从未见过的最禅意 VS Code 扩展。
</p>

<p align="center">
  <a href="./README.md">English</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=frankliu20.codezen"><img src="https://img.shields.io/visual-studio-marketplace/v/frankliu20.codezen?label=Marketplace&color=blue" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=frankliu20.codezen"><img src="https://img.shields.io/visual-studio-marketplace/i/frankliu20.codezen?label=Installs&color=green" alt="Installs" /></a>
  <a href="https://github.com/frankliu20/codezen/actions/workflows/ci.yml"><img src="https://github.com/frankliu20/codezen/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</p>

---

## CodeZen 是什么？

CodeZen 把你每天的码字生涯变成一场 **修行之旅**。每次击键积攒 **功德** — 没错，连你的 AI 助手写的代码也算。

看着精美的木鱼动画随你的输入而跳动。历经七重境界。成为你命中注定的得道程序员。

**不追踪。不上传。只有功德。** ✨

## 为什么要用 CodeZen？

- 😩 **问题**：你每天写几千行代码，除了 bug 什么都没得到。
- 🪵 **解决方案**：现在每个字符都能积功德。连删代码都不扣分 — 因为慈悲为怀 🙏

## 功能特性

🧘 **功德系统** — 状态栏实时功德计数器。敲键盘。攒功德。升境界。

🐟 **木鱼动画** — 精美的木鱼面板，敲击动画 + 金色波纹 + 浮动「功德 +1」— 因为多巴胺很重要。

🤖 **AI 助手支持** — 用 Copilot、Claude 还是 Cursor？它们的输出也算功德（权重可配置）。欢迎来到 2026 年。

🏆 **七级境界系统** — 从卑微的 *施主* 到传奇的 *编程成佛*。每次晋升都有庆祝通知。

🔊 **可选音效** — 木鱼敲击声，概率可调。程序员的 ASMR。

🌏 **中英双语** — 完整中文和英文支持。功德跨越语言。

🔒 **100% 本地隐私** — 零数据离开你的电脑。一切存储在 VS Code 本地。句号。

## 你的悟道之路

| 等级 | 境界 | 所需功德 | |
|------|------|---------|--|
| 1 | **施主** (Seeker) | 0 | *万丈高楼平地起* |
| 2 | **沙门** (Novice) | 1,000 | *修行之路始于足下* |
| 3 | **码僧** (Code Monk) | 10,000 | *日积月累见真章* |
| 4 | **禅师** (Zen Master) | 50,000 | *人码合一* |
| 5 | **代码罗汉** (Code Arhat) | 200,000 | *Bug 见了你绕道走* |
| 6 | **架构菩萨** (Architect Bodhisattva) | 1,000,000 | *系统在你面前俯首* |
| 7 | **编程成佛** (Enlightened) | 10,000,000 | *你就是代码本身* |

## 30 秒上手

1. 从 VS Code 扩展商店 **安装** CodeZen
2. 状态栏出现 `🪵 0` — **开始敲代码**积功德
3. 点击左侧活动栏的 **CodeZen 图标**，欣赏木鱼动画
4. 点击状态栏的 **功德数字**，打开功德簿

完事了。不用配置。敲就是了。

## 设置项

| 设置 | 默认值 | 说明 |
|------|--------|------|
| `codezen.agent.enabled` | `true` | AI 助手输出是否计入功德 |
| `codezen.agent.weight` | `10` | AI 输入每多少字符算 1 功德 |
| `codezen.agent.maxPerMinute` | `600` | AI 功德每分钟上限 |
| `codezen.sound.enabled` | `false` | 是否开启木鱼音效 |
| `codezen.sound.probability` | `0.01` | 每次击键触发音效的概率（0–1） |
| `codezen.statusBar.format` | `🪵 {merit}` | 状态栏格式（`{merit}`、`{rank}`） |
| `codezen.locale` | `auto` | 语言：`auto` / `en` / `zh-CN` |

## 防刷？不如说防贪 😤

我们公平，但慈悲：

- ✅ 人工输入 → 每键 1 功德
- ✅ AI 助手输出 → 每 N 字符 1 功德（可配置）
- ⛔ 按键精灵 → 每分钟上限 300
- ⛔ 同键连按 → 超过 5 次概率衰减
- 🙏 退格 / 删除 → 不扣分（慈悲为怀）

## 命令

| 命令 | 说明 |
|------|------|
| `CodeZen: Show Merit Book` | 你的修行报告 |
| `CodeZen: Toggle Sound` | 🔔 / 🔕 |
| `CodeZen: Reset Merit` | 核按钮（需二次确认） |
| `CodeZen: Toggle Muyu Panel` | 显示/隐藏木鱼面板 |

## 许可证

MIT — 自由如开悟。
