import * as vscode from 'vscode';
import { MeritStore } from './store';
import { AntiCheat, AgentMeritConfig } from './anticheat';
import { getRankForMerit, getRankTitle, getNextRank } from './ranks';
import { getMessages, Messages } from './i18n';
import { SoundPlayer } from './sound';
import { MuyuViewProvider } from './muyuView';

let store: MeritStore;
let antiCheat: AntiCheat;
let statusBarItem: vscode.StatusBarItem;
let messages: Messages;
let soundPlayer: SoundPlayer;
let muyuViewProvider: MuyuViewProvider;
let updateTimer: ReturnType<typeof setTimeout> | undefined;
let pendingMerit = 0;
let pendingAgentMerit = 0;

export function activate(context: vscode.ExtensionContext) {
  store = new MeritStore(context.globalState);
  antiCheat = new AntiCheat(getAgentConfig());
  soundPlayer = new SoundPlayer();
  muyuViewProvider = new MuyuViewProvider();
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(MuyuViewProvider.viewType, muyuViewProvider)
  );

  // Resolve locale
  const config = vscode.workspace.getConfiguration('codezen');
  const locale = config.get<string>('locale', 'auto');
  messages = getMessages(locale);

  // Status bar
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.command = 'codezen.toggleMuyu';
  statusBarItem.tooltip = 'CodeZen - Click to toggle Muyu panel';
  updateStatusBar();
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Listen to text changes (core merit loop)
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((e) => {
      // Skip output channels, git, etc.
      if (e.document.uri.scheme !== 'file' && e.document.uri.scheme !== 'untitled') {
        return;
      }

      for (const change of e.contentChanges) {
        if (change.text.length === 1) {
          // Human typing — single character
          const merit = antiCheat.evaluate(change.text);
          if (merit > 0) {
            pendingMerit += merit;
            muyuViewProvider.knock();
            scheduleMeritFlush(context);
          }
        } else if (change.text.length > 1) {
          // Multi-character input (AI agent, paste, autocomplete)
          const agentMerit = antiCheat.evaluateAgent(change.text);
          if (agentMerit > 0) {
            pendingAgentMerit += agentMerit;
            muyuViewProvider.knock();
            scheduleMeritFlush(context);
          }
        }
      }
    })
  );

  // Commands
  context.subscriptions.push(
    vscode.commands.registerCommand('codezen.showMeritBook', () => showMeritBook()),
    vscode.commands.registerCommand('codezen.toggleSound', () => toggleSound()),
    vscode.commands.registerCommand('codezen.reset', () => resetMerit()),
    vscode.commands.registerCommand('codezen.toggleMuyu', () => {
      vscode.commands.executeCommand('codezen.muyuView.focus');
    })
  );

  // React to config changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('codezen')) {
        const cfg = vscode.workspace.getConfiguration('codezen');
        messages = getMessages(cfg.get<string>('locale', 'auto'));
        antiCheat.updateAgentConfig(getAgentConfig());
        updateStatusBar();
      }
    })
  );

  context.subscriptions.push({ dispose: () => soundPlayer.dispose() });
}

/**
 * Debounced merit flush — batches rapid keystrokes into a single state update.
 * Status bar updates at most every 500ms.
 */
function scheduleMeritFlush(context: vscode.ExtensionContext) {
  if (updateTimer) {
    return;
  }
  updateTimer = setTimeout(async () => {
    updateTimer = undefined;
    if (pendingMerit <= 0 && pendingAgentMerit <= 0) {
      return;
    }

    const oldRank = getRankForMerit(store.combinedMerit);
    if (pendingMerit > 0) {
      await store.addMerit(pendingMerit);
      pendingMerit = 0;
    }
    if (pendingAgentMerit > 0) {
      await store.addAgentMerit(pendingAgentMerit);
      pendingAgentMerit = 0;
    }

    const newRank = getRankForMerit(store.combinedMerit);
    updateStatusBar();

    // Update muyu panel
    const rankTitle = getRankTitle(newRank, messages);
    muyuViewProvider.updateMerit(store.combinedMerit, rankTitle);

    // Rank up notification
    if (newRank.level > oldRank.level) {
      const title = getRankTitle(newRank, messages);
      vscode.window.showInformationMessage(messages.rankUp(title));
      await store.setRankLevel(newRank.level);
    }

    // Sound (fire-and-forget)
    soundPlayer.play(context);
  }, 500);
}

function updateStatusBar() {
  const config = vscode.workspace.getConfiguration('codezen');
  const format = config.get<string>('statusBar.format', '🪵 {merit}');
  const total = store.combinedMerit + pendingMerit + pendingAgentMerit;
  const rank = getRankForMerit(total);
  const title = getRankTitle(rank, messages);

  statusBarItem.text = format
    .replace('{merit}', total.toLocaleString())
    .replace('{rank}', title);

  // Sync muyu panel
  muyuViewProvider?.updateMerit(total, title);
}

function showMeritBook() {
  const combined = store.combinedMerit;
  const rank = getRankForMerit(combined);
  const title = getRankTitle(rank, messages);
  const next = getNextRank(rank);
  let streak = '';
  if (next) {
    const remaining = next.threshold - combined;
    const nextTitle = getRankTitle(next, messages);
    streak = `\nNext: ${nextTitle} (${remaining.toLocaleString()} more)`;
  } else {
    streak = '\n🎉 Maximum enlightenment achieved!';
  }

  const todayCombined = store.todayMerit + store.todayAgentMerit;
  const text = messages.meritBook(combined, title, todayCombined, streak) +
    `\n\n${messages.humanMerit}: ${store.totalMerit.toLocaleString()}` +
    `\n${messages.agentMerit}: ${store.agentMerit.toLocaleString()}`;
  vscode.window.showInformationMessage(text, { modal: true });
}

async function toggleSound() {
  const config = vscode.workspace.getConfiguration('codezen');
  const current = config.get<boolean>('sound.enabled', false);
  await config.update('sound.enabled', !current, vscode.ConfigurationTarget.Global);
  vscode.window.showInformationMessage(current ? messages.soundOff : messages.soundOn);
}

async function resetMerit() {
  const answer = await vscode.window.showWarningMessage(
    messages.resetConfirm,
    { modal: true },
    'Yes'
  );
  if (answer === 'Yes') {
    await store.reset();
    updateStatusBar();
    vscode.window.showInformationMessage(messages.resetDone);
  }
}

export function deactivate() {
  soundPlayer?.dispose();
}

function getAgentConfig(): Partial<AgentMeritConfig> {
  const config = vscode.workspace.getConfiguration('codezen');
  return {
    enabled: config.get<boolean>('agent.enabled', true),
    weight: config.get<number>('agent.weight', 10),
    maxPerMinute: config.get<number>('agent.maxPerMinute', 600),
  };
}
