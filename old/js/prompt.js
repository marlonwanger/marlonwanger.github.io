// Inicialize o deferredPrompt para posteriormente mostrar o prompt de instalação do navegador.
let deferredPrompt;

window.addEventListener("DOMContentLoaded", async event => {
  if ('BeforeInstallPromptEvent' in window) {
    console.log("⏳ BeforeInstallPromptEvent supported but not fired yet");
  } else {
    console.log("❌ BeforeInstallPromptEvent NOT supported");    
  }
  document.querySelector("#install").addEventListener("click", installApp);
});

window.addEventListener('appinstalled', (e) => {
  console.log("✅ AppInstalled fired", true);
});

window.addEventListener('beforeinstallprompt', function(e) {

  // Impede que o mini-infobar apareça em mobile
  e.preventDefault();
  // Guarda evento para que possa ser disparado depois.
  deferredPrompt = e;
  // Atualiza UI notifica usuário que pode instalar PWA
  // showInstallPromotion();
  document.querySelector("#install").style.display="block";  
  // Opcionalmente, enviar eventos de analytics que promo de instalação PWA foi mostrado.
  console.log(`'beforeinstallprompt' event was fired.`);
});

async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    console.log("🆗 Installation Dialog opened");
    // Find out whether the user confirmed the installation or not
    const { outcome } = await deferredPrompt.userChoice;
    // The deferredPrompt can only be used once.
    deferredPrompt = null;
    // Act on the user's choice
    if (outcome === 'accepted') {
      console.log('😀 User accepted the install prompt.', true);
    } else if (outcome === 'dismissed') {
      console.log('😟 User dismissed the install prompt');
    }
    // We hide the install button
    document.querySelector("#install").style.display="none";

  }
}