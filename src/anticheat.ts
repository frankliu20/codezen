/**
 * Anti-cheat module for merit counting.
 *
 * Rules:
 * - Single-character inputs count as 1 merit (human typing)
 * - Multi-character inputs (AI agent / paste) count with configurable weight
 * - Same key repeated rapidly → decay (diminishing returns)
 * - Per-minute caps to block macros / abuse
 * - Backspace/delete don't affect merit (慈悲为怀)
 */

export interface AgentMeritConfig {
  /** Whether to count multi-character (agent) input. Default: true */
  enabled: boolean;
  /** Characters per 1 merit for agent input. Default: 10 */
  weight: number;
  /** Per-minute merit cap for agent input. Default: 600 */
  maxPerMinute: number;
}

const DEFAULT_AGENT_CONFIG: AgentMeritConfig = {
  enabled: true,
  weight: 10,
  maxPerMinute: 600,
};

export class AntiCheat {
  private lastChar: string = '';
  private repeatCount: number = 0;
  private minuteMerit: number = 0;
  private minuteStart: number = Date.now();

  // Agent-specific rate limiting
  private agentMinuteMerit: number = 0;
  private agentMinuteStart: number = Date.now();

  private agentConfig: AgentMeritConfig;

  // Configurable limits
  private readonly MAX_PER_MINUTE = 300; // ~5 chars/sec sustained = fast typist
  private readonly REPEAT_DECAY_START = 5; // after 5 same-char, start decaying
  private readonly REPEAT_DECAY_FACTOR = 0.5;

  constructor(agentConfig?: Partial<AgentMeritConfig>) {
    this.agentConfig = { ...DEFAULT_AGENT_CONFIG, ...agentConfig };
  }

  /**
   * Update agent merit configuration at runtime (e.g. when settings change).
   */
  updateAgentConfig(config: Partial<AgentMeritConfig>): void {
    this.agentConfig = { ...this.agentConfig, ...config };
  }

  /**
   * Returns merit value for a single-character (human typing) text change.
   * Returns 0 if the input should not count.
   */
  evaluate(insertedText: string): number {
    // Only single character inputs count as human typing
    if (insertedText.length !== 1) {
      return 0;
    }

    // Per-minute cap
    const now = Date.now();
    if (now - this.minuteStart > 60_000) {
      this.minuteMerit = 0;
      this.minuteStart = now;
    }
    if (this.minuteMerit >= this.MAX_PER_MINUTE) {
      return 0;
    }

    // Same-key repeat decay
    let merit = 1;
    if (insertedText === this.lastChar) {
      this.repeatCount++;
      if (this.repeatCount > this.REPEAT_DECAY_START) {
        merit = Math.random() < this.REPEAT_DECAY_FACTOR ? 1 : 0;
      }
    } else {
      this.lastChar = insertedText;
      this.repeatCount = 1;
    }

    if (merit > 0) {
      this.minuteMerit++;
    }
    return merit;
  }

  /**
   * Returns merit value for multi-character (AI agent / paste) text changes.
   * Merit = floor(charCount / weight), subject to per-minute cap.
   * Returns 0 if agent merit is disabled or input is too short.
   */
  evaluateAgent(insertedText: string): number {
    if (!this.agentConfig.enabled) {
      return 0;
    }

    // Must be multi-character to qualify as agent input
    if (insertedText.length <= 1) {
      return 0;
    }

    // Per-minute cap for agent merit
    const now = Date.now();
    if (now - this.agentMinuteStart > 60_000) {
      this.agentMinuteMerit = 0;
      this.agentMinuteStart = now;
    }

    const rawMerit = Math.floor(insertedText.length / this.agentConfig.weight);
    if (rawMerit <= 0) {
      return 0;
    }

    // Clamp to remaining per-minute budget
    const remaining = this.agentConfig.maxPerMinute - this.agentMinuteMerit;
    if (remaining <= 0) {
      return 0;
    }

    const merit = Math.min(rawMerit, remaining);
    this.agentMinuteMerit += merit;
    return merit;
  }
}
