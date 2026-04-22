# CodeZen 🪵

> Turn every keystroke into merit. A mindful coding companion for VS Code.

[中文文档](./README.zh-CN.md)

## Features

- **Merit Counter** — Every keystroke earns merit, displayed in the status bar
- **Muyu Animation** — Sidebar wooden fish with real-time knock animation, ripple effects, and floating "+1"
- **Anti-Cheat** — Only genuine typing counts (paste, autocomplete, and macros are filtered out)
- **7-Level Rank System** — Progress from Seeker to Enlightened with milestone notifications
- **Optional Sound** — Wooden fish sound with configurable trigger probability
- **Bilingual** — Full English and 中文 support
- **Pure Local** — Zero data uploaded, everything stored locally via VS Code globalState

## Ranks

| Lv | Title | Merit Required |
|----|-------|---------------|
| 1 | Seeker | 0 |
| 2 | Novice | 1,000 |
| 3 | Code Monk | 10,000 |
| 4 | Zen Master | 50,000 |
| 5 | Code Arhat | 200,000 |
| 6 | Architect Bodhisattva | 1,000,000 |
| 7 | Enlightened | 10,000,000 |

## Getting Started

1. Install the extension
2. The status bar shows `🪵 0` — start typing to earn merit
3. Click the CodeZen icon in the activity bar to open the Muyu animation panel
4. Click the status bar merit counter to view your Merit Book

## Commands

| Command | Description |
|---------|-------------|
| `CodeZen: Show Merit Book` | View total merit, current rank, and progress to next level |
| `CodeZen: Toggle Sound` | Enable/disable wooden fish sound effect |
| `CodeZen: Reset Merit` | Reset all merit to zero (requires confirmation) |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `codezen.sound.enabled` | `false` | Enable wooden fish sound |
| `codezen.sound.probability` | `0.01` | Probability of sound per keystroke (0–1) |
| `codezen.statusBar.format` | `🪵 {merit}` | Status bar format. Variables: `{merit}`, `{rank}` |
| `codezen.locale` | `auto` | Language: `auto`, `en`, `zh-CN` |

## Anti-Cheat Rules

- Only single-character inputs count (paste and bulk inserts are ignored)
- Repeated same-key presses decay after 5 hits
- Per-minute cap of 300 merit (blocks key-repeat macros)
- Backspace / delete do not deduct merit (mercy mode 🙏)

## License

MIT
