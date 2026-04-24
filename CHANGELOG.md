# Changelog

## 0.1.1 - 2026-04-24

### Added

- AI agent merit counting: multi-character input (Copilot, Claude, Cursor, etc.) now earns merit
- Configurable agent merit weight (`codezen.agent.weight`, default: 10 chars per 1 merit)
- Agent merit toggle (`codezen.agent.enabled`) and rate limit (`codezen.agent.maxPerMinute`)
- Separate human vs agent merit breakdown in Merit Book
- Bilingual labels for agent merit (English / 中文)

## 0.1.0 - 2026-04-22

### Initial Release

- Merit counter: every keystroke earns merit, displayed in status bar
- Anti-cheat: single char only, repeat decay, per-minute cap, paste/macro filtered
- 7-level rank system: Seeker → Novice → Code Monk → Zen Master → Code Arhat → Architect Bodhisattva → Enlightened
- Milestone toast notifications on rank up
- SVG wooden fish animation in bottom panel with knock effect and golden ripple
- Optional wooden fish sound with configurable probability
- Bilingual support (English / 中文)
- Pure local persistence via VS Code globalState
- Commands: Show Merit Book, Toggle Sound, Reset Merit
