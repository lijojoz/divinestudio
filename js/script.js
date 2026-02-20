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

// Show wedding by default on load
window.addEventListener('load', () => {
    const weddingBtn = document.querySelector('[data-filter="wedding"]');
    if (weddingBtn) weddingBtn.click();
});

// Lightbox
let visibleItems = [];
function openLb(i) {
    const clickedItem = bItems[i];
    const category = clickedItem.getAttribute('data-category');
    const onBtn = document.querySelector('.fbtn.on');
    const currentFilter = onBtn ? onBtn.getAttribute('data-filter') : 'all';

    // Get visible images based on current filter
    visibleItems = Array.from(bItems).filter(item =>
        currentFilter === 'all' || item.getAttribute('data-category') === currentFilter
    );

    cur_i = visibleItems.indexOf(clickedItem);
    updateLbImg();
    document.getElementById('lb').classList.add('on');
    document.body.style.overflow = 'hidden';
}

function updateLbImg() {
    const img = visibleItems[cur_i].querySelector('img');
    document.getElementById('lbImg').src = img.src;
}

function closeLb() { document.getElementById('lb').classList.remove('on'); document.body.style.overflow = ''; }
function lbNav(d) {
    cur_i = (cur_i + d + visibleItems.length) % visibleItems.length;
    updateLbImg();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') lbNav(-1); if (e.key === 'ArrowRight') lbNav(1); });
document.getElementById('lb').addEventListener('click', function (e) { if (e.target === this) closeLb(); });

// Form submit
document.querySelector('.sub-btn').addEventListener('click', function () {
    this.textContent = 'Message Sent ✓'; this.style.background = '#2D5A3D';
    setTimeout(() => { this.textContent = 'Send Message →'; this.style.background = 'var(--gold)'; }, 3000);
});
