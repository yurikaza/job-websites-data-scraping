console.log('hHHELLO wORLD');

const btn = document.querySelector('.btn-primary')

btn.addEventListener('click', () => {
    var x = document.createElement("INPUT");
    x.style.border = 'none';
    x.style.cursor = 'none';
    x.setAttribute("type", "text");
    x.setAttribute("value", "Loading...");
    document.body.appendChild(x);
})