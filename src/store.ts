import * as vscode from 'vscode';

const KEYS = {
  totalMerit: 'codezen.totalMerit',
  todayMerit: 'codezen.todayMerit',
  todayDate: 'codezen.todayDate',
  rankLevel: 'codezen.rankLevel',
  firstUseDate: 'codezen.firstUseDate',
  agentMerit: 'codezen.agentMerit',
  todayAgentMerit: 'codezen.todayAgentMerit',
};

export class MeritStore {
  private state: vscode.Memento;

  constructor(globalState: vscode.Memento) {
    this.state = globalState;
    // Initialize first use date
    if (!this.state.get<string>(KEYS.firstUseDate)) {
      this.state.update(KEYS.firstUseDate, new Date().toISOString());
    }
  }

  get totalMerit(): number {
    return this.state.get<number>(KEYS.totalMerit, 0);
  }

  get todayMerit(): number {
    this.rolloverDay();
    return this.state.get<number>(KEYS.todayMerit, 0);
  }

  get rankLevel(): number {
    return this.state.get<number>(KEYS.rankLevel, 1);
  }

  get firstUseDate(): string {
    return this.state.get<string>(KEYS.firstUseDate, new Date().toISOString());
  }

  get agentMerit(): number {
    return this.state.get<number>(KEYS.agentMerit, 0);
  }

  get todayAgentMerit(): number {
    this.rolloverDay();
    return this.state.get<number>(KEYS.todayAgentMerit, 0);
  }

  /** Combined total of human + agent merit. */
  get combinedMerit(): number {
    return this.totalMerit + this.agentMerit;
  }

  async addMerit(amount: number): Promise<void> {
    this.rolloverDay();
    await this.state.update(KEYS.totalMerit, this.totalMerit + amount);
    await this.state.update(KEYS.todayMerit, this.state.get<number>(KEYS.todayMerit, 0) + amount);
  }

  async addAgentMerit(amount: number): Promise<void> {
    this.rolloverDay();
    await this.state.update(KEYS.agentMerit, this.agentMerit + amount);
    await this.state.update(KEYS.todayAgentMerit, this.state.get<number>(KEYS.todayAgentMerit, 0) + amount);
  }

  async setRankLevel(level: number): Promise<void> {
    await this.state.update(KEYS.rankLevel, level);
  }

  async reset(): Promise<void> {
    await this.state.update(KEYS.totalMerit, 0);
    await this.state.update(KEYS.todayMerit, 0);
    await this.state.update(KEYS.rankLevel, 1);
    await this.state.update(KEYS.agentMerit, 0);
    await this.state.update(KEYS.todayAgentMerit, 0);
    await this.state.update(KEYS.todayDate, this.getToday());
  }

  getDaysActive(): number {
    const first = new Date(this.firstUseDate);
    const now = new Date();
    return Math.max(1, Math.ceil((now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24)));
  }

  private rolloverDay(): void {
    const today = this.getToday();
    const stored = this.state.get<string>(KEYS.todayDate, '');
    if (stored !== today) {
      this.state.update(KEYS.todayDate, today);
      this.state.update(KEYS.todayMerit, 0);
    }
  }

  private getToday(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
