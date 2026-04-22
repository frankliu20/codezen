import { Messages } from './i18n';

export interface Rank {
  level: number;
  threshold: number;
  titleEN: string;
  titleZH: string;
}

export const RANKS: Rank[] = [
  { level: 1, threshold: 0, titleEN: 'Seeker', titleZH: '施主' },
  { level: 2, threshold: 1_000, titleEN: 'Novice', titleZH: '沙门' },
  { level: 3, threshold: 10_000, titleEN: 'Code Monk', titleZH: '码僧' },
  { level: 4, threshold: 50_000, titleEN: 'Zen Master', titleZH: '禅师' },
  { level: 5, threshold: 200_000, titleEN: 'Code Arhat', titleZH: '代码罗汉' },
  { level: 6, threshold: 1_000_000, titleEN: 'Architect Bodhisattva', titleZH: '架构菩萨' },
  { level: 7, threshold: 10_000_000, titleEN: 'Enlightened', titleZH: '编程成佛' },
];

export function getRankForMerit(merit: number): Rank {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (merit >= rank.threshold) {
      current = rank;
    } else {
      break;
    }
  }
  return current;
}

export function getRankTitle(rank: Rank, messages: Messages): string {
  return messages.ranks[rank.level] || rank.titleEN;
}

export function getNextRank(current: Rank): Rank | undefined {
  const idx = RANKS.findIndex((r) => r.level === current.level);
  return idx < RANKS.length - 1 ? RANKS[idx + 1] : undefined;
}
