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
function openLb(clickedItem) {
    // const clickedItem = bItems[i]; // No longer needed as we pass 'this'
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

// Google Sheets Integration
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const originalText = btn.textContent;

        // Visual feedback: Sending...
        btn.disabled = true;
        btn.textContent = 'Sending...';

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Replace with your Google Apps Script Web App URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwlO2xenyiQSiEwWn6R9aceJEQIl5MqIeajSjbsCEJjCgS5KUc3PZSn2RyvtTFJ3eErkA/exec';

        try {
            if (!SCRIPT_URL || SCRIPT_URL.includes('YOUR_APPS_SCRIPT_URL_HERE')) {
                throw new Error('Please set your Google Apps Script URL in js/script.js');
            }

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script requires no-cors for simple posts
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            // Since mode is no-cors, we won't get a proper response body, 
            // but we can assume success if no error was thrown.
            btn.textContent = 'Message Sent ✓';
            btn.style.background = '#2D5A3D';
            this.reset();
        } catch (error) {
            console.error('Submission Error:', error);
            btn.textContent = 'Error! Try Again';
            btn.style.background = '#8B0000';
            alert(error.message || 'There was an error sending your message. Please try again or contact us directly.');
        } finally {
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = originalText;
                btn.style.background = '';
            }, 4000);
        }
    });
}
