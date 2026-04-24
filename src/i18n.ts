// i18n messages for CodeZen
export interface Messages {
  merit: string;
  humanMerit: string;
  agentMerit: string;
  rankUp: (rank: string) => string;
  meritBook: (merit: number, rank: string, today: number, streak: string) => string;
  resetConfirm: string;
  resetDone: string;
  soundOn: string;
  soundOff: string;
  ranks: Record<number, string>;
}

const en: Messages = {
  merit: 'Merit',
  humanMerit: 'Human Merit',
  agentMerit: 'Agent Merit',
  rankUp: (rank) => `Congratulations! You have ascended to "${rank}" 🙏`,
  meritBook: (merit, rank, today, streak) =>
    `📿 Merit Book\n\n` +
    `Total Merit: ${merit.toLocaleString()}\n` +
    `Current Rank: ${rank}\n` +
    `Today's Merit: ${today.toLocaleString()}\n` +
    `${streak}`,
  resetConfirm: 'Are you sure you want to reset all merit? This cannot be undone.',
  resetDone: 'All merit has been reset. A new journey begins 🙏',
  soundOn: 'Wooden fish sound enabled 🔔',
  soundOff: 'Wooden fish sound disabled 🔕',
  ranks: {
    1: 'Seeker',
    2: 'Novice',
    3: 'Code Monk',
    4: 'Zen Master',
    5: 'Code Arhat',
    6: 'Architect Bodhisattva',
    7: 'Enlightened',
  },
};

const zhCN: Messages = {
  merit: '功德',
  humanMerit: '人工功德',
  agentMerit: 'AI功德',
  rankUp: (rank) => `恭喜施主晋升「${rank}」🙏`,
  meritBook: (merit, rank, today, streak) =>
    `📿 功德簿\n\n` +
    `累计功德：${merit.toLocaleString()}\n` +
    `当前境界：${rank}\n` +
    `今日功德：${today.toLocaleString()}\n` +
    `${streak}`,
  resetConfirm: '确定要清零所有功德吗？此操作不可撤销。',
  resetDone: '功德已清零，新的修行开始 🙏',
  soundOn: '木鱼音效已开启 🔔',
  soundOff: '木鱼音效已关闭 🔕',
  ranks: {
    1: '施主',
    2: '沙门',
    3: '码僧',
    4: '禅师',
    5: '代码罗汉',
    6: '架构菩萨',
    7: '编程成佛',
  },
};

const locales: Record<string, Messages> = { en, 'zh-CN': zhCN, 'zh-cn': zhCN };

export function getMessages(locale: string): Messages {
  if (locale === 'auto') {
    const vscodeLocale = process.env.VSCODE_NLS_CONFIG
      ? JSON.parse(process.env.VSCODE_NLS_CONFIG).locale || 'en'
      : 'en';
    return locales[vscodeLocale] || locales['en'];
  }
  return locales[locale] || locales['en'];
}
