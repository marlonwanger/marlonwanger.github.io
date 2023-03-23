const Types = {
  install: "install",
  installed: "installed",
};

const Display = {
  none: "none",
  block: "block",
};

// Inicialize o deferredPrompt para posteriormente mostrar o prompt de instalação do navegador.
let deferredPrompt;

window.addEventListener("DOMContentLoaded", async (event) => { 
  if ("BeforeInstallPromptEvent" in window) {
    console.log("⏳ BeforeInstallPromptEvent supported but not fired yet");
  } else {
    console.log("❌ BeforeInstallPromptEvent NOT supported");
  }
 
  document.querySelector("#install").addEventListener("click", installApp);
});

window.addEventListener("appinstalled", (e) => {
  console.log('aew')
  console.log("✅ AppInstalled fired", true);
});

window.addEventListener("beforeinstallprompt", function (e) {
  // Impede que o mini-infobar apareça em mobile
  e.preventDefault();
  // Guarda evento para que possa ser disparado depois.
  deferredPrompt = e;
  // Atualiza UI notifica usuário que pode instalar PWA
  RefreshInterface(Types.install);
  // Opcionalmente, enviar eventos de analytics que promo de instalação PWA foi mostrado.
  console.log(`'beforeinstallprompt' event was fired.`);
});

async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    console.log("🆗 Janela de instalação Aberta");
    // Verifica se o usuario aceitou ou nao
    const { outcome } = await deferredPrompt.userChoice;
    // deferredPrompt pode ser usado apenas 1x 
    deferredPrompt = null;
    // Verifica a reposta do cliente
    if (outcome === "accepted") {
      console.log("😀 User accepted the install prompt.", true);
    } else if (outcome === "dismissed") {
      console.log("😟 User dismissed the install prompt");
    }

    RefreshInterface(Types.installed);
  }
}

function RefreshInterface(type) {
  if (type == Types.install) {
    console.log('install')
    ShowHide("install", Display.block);
    ShowHide("installed", Display.none);
  } else {
    ShowHide("install", Display.none);
    ShowHide("installation", Display.none);
    ShowHide("installed", Display.block);
  }
}

function ShowHide(id, display) {
  document.querySelector(`#${id}`).style.display = `${display}`;
}