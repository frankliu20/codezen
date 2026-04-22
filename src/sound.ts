import * as vscode from 'vscode';
import * as path from 'path';

export class SoundPlayer {
  private panel: vscode.WebviewPanel | undefined;

  /**
   * Play wooden fish sound via a hidden webview (VS Code has no native audio API).
   * The webview is created on demand and reused.
   */
  async play(context: vscode.ExtensionContext): Promise<void> {
    const config = vscode.workspace.getConfiguration('codezen');
    const enabled = config.get<boolean>('sound.enabled', false);
    if (!enabled) {
      return;
    }

    const probability = config.get<number>('sound.probability', 0.01);
    if (Math.random() > probability) {
      return;
    }

    if (!this.panel) {
      this.panel = vscode.window.createWebviewPanel(
        'codezenSound',
        'CodeZen Sound',
        { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
        {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))],
        }
      );
      // Hide the panel (make it as unobtrusive as possible)
      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });

      const soundUri = this.panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(context.extensionPath, 'media', 'wooden-fish.wav'))
      );

      this.panel.webview.html = this.getWebviewHtml(soundUri.toString());
    }

    // Tell the webview to play
    this.panel.webview.postMessage({ type: 'play' });
  }

  dispose(): void {
    this.panel?.dispose();
  }

  private getWebviewHtml(soundUrl: string): string {
    return `<!DOCTYPE html>
<html><head><style>body{display:none}</style></head>
<body>
<audio id="sound" src="${soundUrl}" preload="auto"></audio>
<script>
  const audio = document.getElementById('sound');
  window.addEventListener('message', e => {
    if (e.data.type === 'play') {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  });
</script>
</body></html>`;
  }
}
