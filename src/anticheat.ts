/**
 * Anti-cheat module for merit counting.
 *
 * Rules:
 * - Only single-character inputs count (no paste / autocomplete bulk inserts)
 * - Same key repeated rapidly → decay (diminishing returns)
 * - Per-minute cap to block key-repeat macros
 * - Backspace/delete don't affect merit (慈悲为怀)
 */

export class AntiCheat {
  private lastChar: string = '';
  private repeatCount: number = 0;
  private minuteMerit: number = 0;
  private minuteStart: number = Date.now();

  // Configurable limits
  private readonly MAX_PER_MINUTE = 300; // ~5 chars/sec sustained = fast typist
  private readonly REPEAT_DECAY_START = 5; // after 5 same-char, start decaying
  private readonly REPEAT_DECAY_FACTOR = 0.5;

  /**
   * Returns merit value (0 or 1) for a text change event.
   * Returns 0 if the input should not count.
   */
  evaluate(insertedText: string): number {
    // Only single character inputs count
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
}
