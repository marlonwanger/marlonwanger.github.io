const shareButton = document.querySelector('#compartilhar');
shareButton.addEventListener('click', shareContent);

function shareContent() {
  if (navigator.share) {
    navigator.share({
      title: 'Criando Apps com o Gvinci',
      url: 'https://www.gvinci.com.br/'
    }).then(() => {
      console.log('Compartilhado com sucesso!');
    })
    .catch((error) => console.log('Sharing failed', error));
   } else {
     // fallback
     console.log(`Your system doesn't support sharing files.`);
   }
}