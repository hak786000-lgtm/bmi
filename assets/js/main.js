(function(){
var d=document,h=d.documentElement,mb=d.getElementById('menu-btn'),nav=d.getElementById('nav'),th=d.getElementById('theme'),dd=d.querySelector('.dd'),db=d.querySelector('.dd-btn');
function label(){var dark=h.dataset.theme==='dark';th.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme')}
label();
th.addEventListener('click',function(){var n=h.dataset.theme==='dark'?'light':'dark';h.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}label()});
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
db.addEventListener('click',function(){var o=dd.classList.toggle('open');db.setAttribute('aria-expanded',o)});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){nav.classList.remove('open');dd.classList.remove('open');mb.setAttribute('aria-expanded','false');db.setAttribute('aria-expanded','false')}});
})();