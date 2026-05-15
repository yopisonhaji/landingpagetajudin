document.addEventListener('DOMContentLoaded', () => {

    // ── FADE IN ON SCROLL ─────────────────────────
    const faders = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    faders.forEach(el => observer.observe(el));

    // ── COUNTDOWN TIMER ───────────────────────────
    // Rolling 53h countdown stored in sessionStorage for consistency
    let deadline = sessionStorage.getItem('dq_deadline');
    if (!deadline) {
        const d = new Date();
        d.setHours(d.getHours() + 53);
        d.setMinutes(d.getMinutes() + 14);
        deadline = d.getTime();
        sessionStorage.setItem('dq_deadline', deadline);
    } else {
        deadline = parseInt(deadline);
        // If expired, reset
        if (deadline < Date.now()) {
            const d = new Date();
            d.setHours(d.getHours() + 53);
            d.setMinutes(d.getMinutes() + 14);
            deadline = d.getTime();
            sessionStorage.setItem('dq_deadline', deadline);
        }
    }

    function pad(n) { return n.toString().padStart(2, '0'); }

    function updateCountdown() {
        const diff = deadline - Date.now();
        if (diff <= 0) {
            ['cd-days','cd-hours','cd-minutes','cd-seconds','st-hours','st-minutes','st-seconds']
                .forEach(id => { const el = document.getElementById(id); if(el) el.innerText = '00'; });
            return;
        }
        const days    = Math.floor(diff / 86400000);
        const hours   = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        const set = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = pad(val); };
        set('cd-days', days);
        set('cd-hours', hours);
        set('cd-minutes', minutes);
        set('cd-seconds', seconds);
        set('st-hours', hours);
        set('st-minutes', minutes);
        set('st-seconds', seconds);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

});

// ── IMAGE MODAL ───────────────────────────────────
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const img   = document.getElementById('modalImg');
    if (!modal || !img) return;
    img.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
