<p align="center">
  <img src="media/icon.png" width="128" alt="CodeZen logo" />
</p>

<h1 align="center">CodeZen 🪵</h1>

<p align="center">
  <strong>Every keystroke is a prayer. Every line of code, a step toward enlightenment.</strong><br>
  The most zen VS Code extension you never knew you needed.
</p>

<p align="center">
  <a href="./README.zh-CN.md">中文文档</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=frankliu20.codezen"><img src="https://img.shields.io/visual-studio-marketplace/v/frankliu20.codezen?label=Marketplace&color=blue" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=frankliu20.codezen"><img src="https://img.shields.io/visual-studio-marketplace/i/frankliu20.codezen?label=Installs&color=green" alt="Installs" /></a>
  <a href="https://github.com/frankliu20/codezen/actions/workflows/ci.yml"><img src="https://github.com/frankliu20/codezen/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</p>

---

## What is CodeZen?

CodeZen turns your daily coding grind into a **spiritual journey**. Each keystroke earns **merit (功德)** — and yes, even your AI copilot's code counts now.

Watch a gorgeous wooden fish animation respond to your typing. Level up through 7 ranks. Become the enlightened developer you were always meant to be.

**No tracking. No telemetry. Just vibes.** ✨

## Why CodeZen?

- 😩 **Problem**: You write thousands of lines of code every day and get nothing but bugs in return.
- 🪵 **Solution**: Now every character earns you merit. Even deleting code won't hurt you — because we believe in mercy (慈悲为怀 🙏).

## Features

🧘 **Merit System** — Real-time merit counter in your status bar. Type. Earn. Ascend.

🐟 **Muyu (木鱼) Animation** — A beautiful wooden fish panel with knock animations, golden ripples, and floating "+1" — because dopamine matters.

🤖 **AI Agent Support** — Using Copilot, Claude, or Cursor? Their output earns merit too (configurable weight). Welcome to 2026.

🏆 **7-Level Rank System** — From humble *Seeker* to legendary *Enlightened*. Each rank-up comes with a celebratory notification.

🔊 **Optional Sound Effects** — Toggle wooden fish sound with configurable probability. ASMR for developers.

🌏 **Bilingual** — Full English and 中文 support. Your merit transcends language.

🔒 **100% Local & Private** — Zero data leaves your machine. Everything lives in VS Code's local storage. Period.

## Your Path to Enlightenment

| Lv | Rank | Merit Required | |
|----|------|---------------|-|
| 1 | **Seeker** (施主) | 0 | *Everyone starts somewhere* |
| 2 | **Novice** (沙门) | 1,000 | *The journey begins* |
| 3 | **Code Monk** (码僧) | 10,000 | *Dedication shows* |
| 4 | **Zen Master** (禅师) | 50,000 | *One with the codebase* |
| 5 | **Code Arhat** (代码罗汉) | 200,000 | *Bugs fear you* |
| 6 | **Architect Bodhisattva** (架构菩萨) | 1,000,000 | *Systems bend to your will* |
| 7 | **Enlightened** (编程成佛) | 10,000,000 | *You ARE the code* |

## Get Started in 30 Seconds

1. **Install** CodeZen from the VS Code Marketplace
2. See `🪵 0` in your status bar — **start typing** to earn merit
3. Click the **CodeZen icon** in the activity bar to watch the Muyu animation
4. Click the **merit counter** in the status bar to open your Merit Book

That's it. No config needed. Just code.

## Settings

| Setting | Default | What it does |
|---------|---------|-------------|
| `codezen.agent.enabled` | `true` | Count AI agent output as merit |
| `codezen.agent.weight` | `10` | Characters per 1 merit (AI input) |
| `codezen.agent.maxPerMinute` | `600` | Rate limit for agent merit |
| `codezen.sound.enabled` | `false` | Wooden fish sound effects |
| `codezen.sound.probability` | `0.01` | Sound trigger probability (0–1) |
| `codezen.statusBar.format` | `🪵 {merit}` | Format string (`{merit}`, `{rank}`) |
| `codezen.locale` | `auto` | Language: `auto` / `en` / `zh-CN` |

## Anti-Cheat? More Like Anti-Greed 😤

We keep it fair, but merciful:

- ✅ Human typing → 1 merit per keystroke
- ✅ AI agent output → 1 merit per N characters (configurable)
- ⛔ Key-repeat macros → Capped at 300/min
- ⛔ Same key spam → Decays after 5 repeats
- 🙏 Backspace/delete → No penalty (mercy mode)

## Commands

| Command | What it does |
|---------|-------------|
| `CodeZen: Show Merit Book` | Your spiritual progress report |
| `CodeZen: Toggle Sound` | 🔔 / 🔕 |
| `CodeZen: Reset Merit` | Nuclear option (requires confirmation) |
| `CodeZen: Toggle Muyu Panel` | Show/hide the wooden fish |

## License

MIT — Free as in enlightenment.
