// Cursor
const cur = document.getElementById('cur'), cur2 = document.getElementById('cur2');
document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
    setTimeout(() => { cur2.style.left = e.clientX + 'px'; cur2.style.top = e.clientY + 'px'; }, 70);
});
document.querySelectorAll('a,button,.svc-card,.b-item,.vcard').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.width = '18px'; cur.style.height = '18px'; cur2.style.width = '60px'; cur2.style.height = '60px'; cur2.style.borderColor = 'rgba(212,168,67,.8)'; });
    el.addEventListener('mouseleave', () => { cur.style.width = '8px'; cur.style.height = '8px'; cur2.style.width = '36px'; cur2.style.height = '36px'; cur2.style.borderColor = 'var(--gold)'; });
});

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('s', scrollY > 80));

// Reveal
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }), { threshold: .08 });
document.querySelectorAll('.r,.rl,.rr').forEach(el => obs.observe(el));

// Gallery Filter & Logic
const bentoGrid = document.getElementById('bentoGrid');
const bItems = document.querySelectorAll('.b-item');
const fBtns = document.querySelectorAll('.fbtn');

fBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fBtns.forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        const filter = btn.getAttribute('data-filter');

        bItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox
const imgs = [
    'assets/wedding1.png', 'assets/wedding2.png', 'assets/wedding3.png', 'assets/wedding4.png', 'assets/wedding5.png',
    'assets/wedding6.png', 'assets/wedding7.png', 'assets/wedding8.png', 'assets/wedding9.png', 'assets/wedding10.png',
    'assets/wedding11.png', 'assets/wedding12.png', 'assets/wedding13.png', 'assets/wedding14.png', 'assets/wedding15.png',
    'assets/nature1.png', 'assets/nature2.png', 'assets/nature3.png', 'assets/nature4.png', 'assets/nature5.png',
    'assets/nature6.png', 'assets/nature7.png', 'assets/nature8.png', 'assets/nature9.png', 'assets/nature10.png',
    'assets/nature11.png', 'assets/nature12.png', 'assets/nature13.png', 'assets/nature14.png', 'assets/nature15.png',
    'assets/nature16.png', 'assets/nature17.png', 'assets/nature18.png',
    'assets/potentate1.png', 'assets/potentate2.png', 'assets/potentate3.png', 'assets/potentate4.png', 'assets/potentate5.png',
    'assets/potentate6.png', 'assets/potentate7.png', 'assets/potentate8.png', 'assets/potentate9.png', 'assets/potentate10.png',
    'assets/potentate11.png', 'assets/potentate12.png', 'assets/potentate13.png', 'assets/gal5.png',
    'assets/kids1.png', 'assets/kids2.png', 'assets/kids3.png', 'assets/kids4.png', 'assets/kids5.png', 'assets/kids6.png',
    'assets/gal1.png', 'assets/gal2.png', 'assets/gal3.png', 'assets/gal4.png', 'assets/gal6.png', 'assets/gal7.png',
    'assets/gal8.png', 'assets/gal9.png', 'assets/film1.png', 'assets/film2.png', 'assets/film3.png', 'assets/film4.png'
];
let cur_i = 0;
function openLb(i) { cur_i = i; document.getElementById('lbImg').src = imgs[i]; document.getElementById('lb').classList.add('on'); document.body.style.overflow = 'hidden'; }
function closeLb() { document.getElementById('lb').classList.remove('on'); document.body.style.overflow = ''; }
function lbNav(d) { cur_i = (cur_i + d + imgs.length) % imgs.length; document.getElementById('lbImg').src = imgs[cur_i]; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') lbNav(-1); if (e.key === 'ArrowRight') lbNav(1); });
document.getElementById('lb').addEventListener('click', function (e) { if (e.target === this) closeLb(); });

// Form submit
document.querySelector('.sub-btn').addEventListener('click', function () {
    this.textContent = 'Message Sent ✓'; this.style.background = '#2D5A3D';
    setTimeout(() => { this.textContent = 'Send Message →'; this.style.background = 'var(--gold)'; }, 3000);
});
