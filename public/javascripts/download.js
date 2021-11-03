
const btnDownload = document.querySelector('.btnDownload');

btnDownload.addEventListener('click', function(e) {
    console.log('button was clicked');
    window.location="./data/jooble.json"
    // or window.open(url, '_blank') for new window.
  });