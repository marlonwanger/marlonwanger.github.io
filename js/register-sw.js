if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Registrado com sucesso", reg);
      })
      .catch((err) => {
        console.log("Algo deu errado", err);
      });
  });
}
