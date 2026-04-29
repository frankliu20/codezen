import * as vscode from 'vscode';

export class MuyuViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'codezen.muyuView';
  private view?: vscode.WebviewView;
  private currentMerit = 0;
  private currentRank = '';

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this.view = webviewView;
    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.html = this.getHtml();
    if (this.currentMerit > 0 || this.currentRank) {
      webviewView.webview.postMessage({ type: 'update', merit: this.currentMerit, rank: this.currentRank });
    }
  }

  knock() {
    this.view?.webview.postMessage({ type: 'knock' });
  }

  updateMerit(merit: number, rank: string) {
    this.currentMerit = merit;
    this.currentRank = rank;
    this.view?.webview.postMessage({ type: 'update', merit, rank });
  }

  private getHtml(): string {
    return /*html*/ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100%;
    min-height: 80px;
    background: transparent;
    font-family: system-ui, sans-serif;
    overflow: hidden;
    user-select: none;
    padding: 8px 16px;
  }

  .scene {
    position: relative;
    width: 80px;
    height: 70px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .muyu-svg {
    width: 65px; height: 60px;
    transition: transform 0.08s ease-out;
    animation: breathe 3s ease-in-out infinite;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));
  }
  .muyu-svg.hit {
    transform: scale(0.88) rotate(-3deg);
    animation: none;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.02) rotate(0deg); }
  }

  .ripple {
    position: absolute;
    width: 60px; height: 55px;
    border-radius: 50%;
    border: 2px solid rgba(255, 215, 0, 0);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .ripple.active { animation: rippleOut 0.5s ease-out forwards; }

  @keyframes rippleOut {
    0% { border-color: rgba(255, 215, 0, 0.7); transform: translate(-50%, -50%) scale(1); }
    100% { border-color: rgba(255, 215, 0, 0); transform: translate(-50%, -50%) scale(2); }
  }

  .float-text {
    position: absolute;
    color: #FFD700;
    font-size: 14px;
    font-weight: bold;
    pointer-events: none;
    opacity: 0;
    text-shadow: 0 0 6px rgba(255, 215, 0, 0.5);
    white-space: nowrap;
  }
  .float-text.active { animation: floatUp 0.7s ease-out forwards; }

  @keyframes floatUp {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-40px); }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .merit-number {
    font-size: 28px;
    font-weight: bold;
    color: #FFD700;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    line-height: 1;
  }
  .merit-label {
    font-size: 10px;
    opacity: 0.4;
    color: var(--vscode-foreground, #ccc);
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .merit-rank {
    font-size: 13px;
    color: #c49a2a;
    margin-top: 2px;
  }
</style>
</head>
<body>
  <div class="scene">
    <svg class="muyu-svg" id="muyu" viewBox="0 0 247 197" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bodyGrad" cx="40%" cy="35%">
          <stop offset="0%" stop-color="#d4a83a"/>
          <stop offset="60%" stop-color="#a07818"/>
          <stop offset="100%" stop-color="#6b4f12"/>
        </radialGradient>
      </defs>
      <path fill="url(#bodyGrad)" stroke="#5a3e0a" stroke-width="2"
        d="M 109.12 6.53 C 124.09 4.27 139.37 2.82 154.47 4.79 C 173.07 7.14 191.38 14.02 206.02 25.89 C 217.01 34.77 225.17 46.63 231.55 59.13 C 237.81 72.25 241.16 86.53 243.92 100.74 C 225.49 104.75 206.58 105.76 187.77 106.20 C 186.21 100.02 183.12 93.94 177.74 90.25 C 172.00 85.96 163.98 84.19 157.26 87.18 C 145.99 91.69 139.62 105.22 142.63 116.85 C 145.12 127.39 154.97 136.11 166.05 135.69 C 176.18 134.97 184.61 126.81 187.19 117.22 C 192.74 116.73 198.32 116.63 203.89 116.32 C 217.57 115.26 231.14 113.14 244.82 111.98 C 245.52 121.28 246.13 130.75 244.11 139.94 C 242.32 149.02 239.23 158.07 233.39 165.39 C 224.88 176.55 212.15 183.64 199.01 187.98 C 187.42 191.86 175.20 193.41 163.05 194.29 C 140.40 195.87 117.64 195.62 94.99 194.19 C 74.79 192.81 54.55 190.78 34.79 186.17 C 27.91 184.54 21.07 182.47 14.77 179.21 C 8.58 175.93 4.23 169.71 2.72 162.92 C -0.48 151.41 3.00 139.09 9.20 129.21 C 14.61 119.75 27.61 116.88 30.81 105.83 C 35.50 90.01 37.28 73.40 42.87 57.82 C 47.56 45.36 54.34 33.26 64.82 24.75 C 77.25 14.19 93.24 9.04 109.12 6.53 Z"/>
      <!-- Fish eye (the hole) - already part of the path as inner circle -->
      <circle cx="165" cy="112" r="22" fill="#1a1008" opacity="0.6"/>
      <circle cx="165" cy="112" r="14" fill="#2a1a08" opacity="0.4"/>
    </svg>
    <div class="ripple" id="ripple"></div>
    <div class="float-text" id="floatText">功德 +1</div>
  </div>
  <div class="info">
    <div class="merit-number" id="meritNum">0</div>
    <div class="merit-label">merit / 功德</div>
    <div class="merit-rank" id="meritRank">施主</div>
  </div>

<script>
  const muyu = document.getElementById('muyu');
  const ripple = document.getElementById('ripple');
  const floatText = document.getElementById('floatText');
  const meritNum = document.getElementById('meritNum');
  const meritRank = document.getElementById('meritRank');
  let knockTimeout = null;
  const texts = ['功德 +1', '+1', 'Merit +1', '善哉 🙏', '+1 ✨'];

  function doKnock() {
    muyu.classList.add('hit');

    ripple.classList.remove('active');
    void ripple.offsetWidth;
    ripple.classList.add('active');

    const ox = (Math.random() - 0.5) * 30;
    floatText.style.left = (35 + ox) + 'px';
    floatText.style.top = '0px';
    floatText.textContent = texts[Math.floor(Math.random() * texts.length)];
    floatText.classList.remove('active');
    void floatText.offsetWidth;
    floatText.classList.add('active');

    clearTimeout(knockTimeout);
    knockTimeout = setTimeout(() => {
      muyu.classList.remove('hit');
    }, 100);
  }

  window.addEventListener('message', (e) => {
    const msg = e.data;
    if (msg.type === 'knock') doKnock();
    else if (msg.type === 'update') {
      meritNum.textContent = Number(msg.merit).toLocaleString();
      meritRank.textContent = msg.rank;
    }
  });
</script>
</body>
</html>`;
  }
}
