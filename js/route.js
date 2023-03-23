
// Initial Navigo
var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

// const router = new Navigo('/');

const appElement = document.getElementById("app")
const pathPages = "pages/";

router
  .on("/", async () => {
    const html = await fetch(pathPages + "main.html").then((data) => data.text());
    appElement.innerHTML = html;
  })
  .on("/about", async () => {
    const html = await fetch(pathPages + "teste.html").then((data) => data.text());
    appElement.innerHTML = html;
  })
  .notFound(() => {
    appElement.innerHTML = "Page inexistante"
  })


  router.resolve()