// ===== PRELOADER =====
const hidePreloader = () => {
    document.getElementById('preloader').classList.add('hidden');
    showBannerSplash();
};
setTimeout(hidePreloader, 4000);
window.addEventListener('load', () => setTimeout(hidePreloader, 300));

// ===== BANNER SPLASH =====
const SPLASH_DURATION = 5000;
let splashTimer = null;

function showBannerSplash() {
    const splash = document.getElementById('bannerSplash');
    if (!splash) return;
    splash.classList.add('visible');

    // Progress bar
    const fill = document.getElementById('bsProgressFill');
    if (fill) {
        requestAnimationFrame(() => {
            fill.style.transition = `width ${SPLASH_DURATION}ms linear`;
            fill.style.width = '100%';
        });
    }

    // Sparkle canvas
    initSplashCanvas();

    splashTimer = setTimeout(hideBannerSplash, SPLASH_DURATION);
}

function hideBannerSplash() {
    if (splashTimer) { clearTimeout(splashTimer); splashTimer = null; }
    const splash = document.getElementById('bannerSplash');
    if (!splash) return;
    splash.classList.add('hiding');
    splash.classList.remove('visible');
    setTimeout(() => { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 750);
}

function initSplashCanvas() {
    const canvas = document.getElementById('bsCanvas');
    if (!canvas) return;
    const scene = canvas.closest('.bs-scene');
    if (!scene) return;
    canvas.width  = scene.offsetWidth;
    canvas.height = scene.offsetHeight + 160; // include rigging area
    canvas.style.top    = '-140px';
    canvas.style.height = (scene.offsetHeight + 160) + 'px';
    canvas.style.position = 'absolute';

    const ctx = canvas.getContext('2d');
    const cx  = canvas.width / 2;
    const cy  = canvas.height - (scene.offsetHeight / 2) + 20;
    const rx  = canvas.width  / 2 + 20;
    const ry  = rx * 0.3;
    const sparks = Array.from({length: 22}, (_, i) => ({
        angle:  (i / 22) * Math.PI * 2,
        speed:  0.008 + Math.random() * 0.004,
        size:   2 + Math.random() * 3.5,
        alpha:  0.4 + Math.random() * 0.6
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparks.forEach(s => {
            s.angle += s.speed;
            const x = cx + Math.cos(s.angle) * rx;
            const y = cy + Math.sin(s.angle) * ry;
            const grd = ctx.createRadialGradient(x, y, 0, x, y, s.size * 3);
            grd.addColorStop(0,   `rgba(255,248,180,${s.alpha})`);
            grd.addColorStop(0.4, `rgba(240,192,64,${s.alpha * 0.6})`);
            grd.addColorStop(1,   'rgba(240,192,64,0)');
            ctx.beginPath();
            ctx.arc(x, y, s.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
    updateActiveNav();
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ===== ACTIVE NAV =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
}

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.count);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = target >= 1000
                ? Math.floor(current).toLocaleString() + '+'
                : Math.floor(current) + (target === 5 ? '+' : '');
        }, 16);
    });
}
const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
}, { threshold: 0.3 });
const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ===== MENU TABS =====
document.querySelectorAll('.menu-cat').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.menu-cat').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById('panel-' + btn.dataset.cat);
        if (panel) panel.classList.add('active');
    });
});

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('sliderTrack');
const dotsContainer = document.getElementById('sliderDots');
let sliderCurrent = 0;
let autoSlide;

function getVisible() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

function buildDots() {
    if (!dotsContainer || !track) return;
    const cards = track.querySelectorAll('.review-card');
    const vis = getVisible();
    const pages = cards.length - vis + 1;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < pages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    }
}

function goTo(index) {
    if (!track) return;
    const cards = track.querySelectorAll('.review-card');
    const vis = getVisible();
    const pages = cards.length - vis + 1;
    sliderCurrent = Math.max(0, Math.min(index, pages - 1));
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${sliderCurrent * cardW}px)`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === sliderCurrent));
}

function startAuto() {
    autoSlide = setInterval(() => {
        const cards = track.querySelectorAll('.review-card');
        const vis = getVisible();
        const pages = cards.length - vis + 1;
        goTo(sliderCurrent + 1 >= pages ? 0 : sliderCurrent + 1);
    }, 4000);
}

document.getElementById('prevBtn')?.addEventListener('click', () => { clearInterval(autoSlide); goTo(sliderCurrent - 1); startAuto(); });
document.getElementById('nextBtn')?.addEventListener('click', () => { clearInterval(autoSlide); goTo(sliderCurrent + 1); startAuto(); });
window.addEventListener('resize', () => { buildDots(); goTo(0); });
buildDots();
startAuto();

// ===== BACK TO TOP =====
document.getElementById('backTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SET MIN DATE FOR RESERVATION =====
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);

// ===== GALLERY VIEW MORE =====
function toggleGallery() {
    const hidden = document.querySelectorAll('.g-hidden');
    const btn = document.getElementById('galleryMoreBtn');
    const allVisible = [...hidden].every(el => el.classList.contains('g-visible'));
    hidden.forEach(el => el.classList.toggle('g-visible', !allVisible));
    btn.innerHTML = allVisible
        ? '<i class="fas fa-images"></i> View More Photos'
        : '<i class="fas fa-chevron-up"></i> Show Less';
}

let cart = {};
try { cart = JSON.parse(sessionStorage.getItem('rc_cart') || '{}'); } catch(e) { cart = {}; }

function persistHomeCart() {
    sessionStorage.setItem('rc_cart', JSON.stringify(cart));
}

// Inject steppers on all dish cards
document.querySelectorAll('.dish-card').forEach(card => {
    const nameEl = card.querySelector('.dish-top h4');
    const priceEl = card.querySelector('.price');
    if (!nameEl || !priceEl) return;

    const name = nameEl.textContent.trim();
    const price = parseFloat(priceEl.textContent.replace('£', '').trim());

    const stepper = document.createElement('div');
    stepper.className = 'card-stepper';
    stepper.dataset.name = name;
    stepper.dataset.price = price;
    stepper.innerHTML = `
        <button class="stepper-btn stepper-dec" onclick="stepDec(this)">−</button>
        <span class="stepper-label">ADD</span>
        <button class="stepper-btn stepper-inc" onclick="stepInc(this)">+</button>
    `;
    const dishBody = card.querySelector('.dish-body');
    const badge = dishBody.querySelector('.badge');
    const row = document.createElement('div');
    row.className = 'badge-stepper-row';
    dishBody.appendChild(row);
    if (badge) row.appendChild(badge);
    row.appendChild(stepper);
});

// Restore cart UI after steppers are injected
updateCartUI();
resyncAllSteppers();

function stepInc(btn) {
    const stepper = btn.closest('.card-stepper');
    const name = stepper.dataset.name;
    const price = parseFloat(stepper.dataset.price);
    if (cart[name]) {
        cart[name].qty++;
    } else {
        cart[name] = { name, priceNum: price, qty: 1, note: '', img: '' };
    }
    syncStepper(stepper);
    updateCartUI();
}

function stepDec(btn) {
    const stepper = btn.closest('.card-stepper');
    const name = stepper.dataset.name;
    if (!cart[name]) return;
    cart[name].qty--;
    if (cart[name].qty <= 0) delete cart[name];
    syncStepper(stepper);
    updateCartUI();
}

function syncStepper(stepper) {
    const name = stepper.dataset.name;
    const item = cart[name];
    const label = stepper.querySelector('.stepper-label');
    const dec = stepper.querySelector('.stepper-dec');
    if (item && item.qty > 0) {
        label.textContent = item.qty;
        dec.classList.add('visible');
        stepper.classList.add('in-cart');
    } else {
        label.textContent = 'ADD';
        dec.classList.remove('visible');
        stepper.classList.remove('in-cart');
    }
}

function updateCartUI() {
    persistHomeCart();
    const total = Object.values(cart).reduce((s, i) => s + i.qty, 0);
    const floatBtn = document.getElementById('floatCartBtn');
    const badge = document.getElementById('cartBadge');
    if (total > 0) {
        floatBtn.style.display = 'flex';
        badge.textContent = total;
    } else {
        floatBtn.style.display = 'none';
    }
    renderCartDrawer();
}

function renderCartDrawer() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    const items = Object.values(cart);
    if (!items.length) {
        cartEmpty.style.display = 'flex';
        cartItems.innerHTML = '';
        cartFooter.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    const subtotal = items.reduce((s, i) => s + i.priceNum * i.qty, 0);
    cartTotal.textContent = 'Subtotal: £' + subtotal.toFixed(2);

    cartItems.innerHTML = items.map(item => {
        const price = (item.priceNum || item.price || 0);
        const safe = item.name.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        return `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">£${Number(price).toFixed(2)} each</div>
                <div class="cart-qty">
                    <button class="cq-btn" data-action="dec" data-name="${safe}">−</button>
                    <span>${item.qty}</span>
                    <button class="cq-btn" data-action="inc" data-name="${safe}">+</button>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.4rem">
                <span style="font-size:0.9rem;font-weight:700;color:var(--gold)">£${(Number(price) * item.qty).toFixed(2)}</span>
                <button class="cart-remove cq-btn" data-action="remove" data-name="${safe}"><i class="fas fa-times"></i></button>
            </div>
        </div>
        <textarea class="item-cooking-note" data-name="${safe}" rows="2"
            placeholder="Cooking notes for ${safe} (optional)…">${item.note || ''}</textarea>`;
    }).join('');

    // Show order-type buttons only if allergy already answered
    const allergyYes = document.getElementById('allergyYes');
    const allergyNo = document.getElementById('allergyNo');
    const hasAnswer = allergyYes.classList.contains('selected') || allergyNo.classList.contains('selected');
    const otDiv = document.getElementById('orderTypeBtns');
    otDiv.style.display = hasAnswer ? 'block' : 'none';
    // Pre-highlight chosen order type
    if (hasAnswer) {
        const saved = sessionStorage.getItem('rc_order_type');
        otDiv.querySelectorAll('.cart-ot-btn').forEach(b => b.style.opacity = '1');
        if (saved === 'delivery') otDiv.querySelector('.cart-ot-btn[data-type="delivery"]')?.style.setProperty('outline', '2px solid white');
        if (saved === 'collection') otDiv.querySelector('.cart-ot-btn[data-type="collection"]')?.style.setProperty('outline', '2px solid white');
    }
}

function saveCartNote(name, val) {
    if (cart[name]) cart[name].note = val;
}

function cartInc(name) {
    if (cart[name]) { cart[name].qty++; resyncAllSteppers(); updateCartUI(); }
}

function cartDec(name) {
    if (!cart[name]) return;
    cart[name].qty--;
    if (cart[name].qty <= 0) delete cart[name];
    resyncAllSteppers();
    updateCartUI();
}

function cartRemove(name) {
    delete cart[name];
    resyncAllSteppers();
    updateCartUI();
}

function resyncAllSteppers() {
    document.querySelectorAll('.card-stepper').forEach(stepper => syncStepper(stepper));
}

// Cart open/close
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

cartOverlay.addEventListener('click', closeCart);

// Cart item controls — event delegation avoids onclick string-encoding issues
document.getElementById('cartItems').addEventListener('click', e => {
    const btn = e.target.closest('.cq-btn');
    if (!btn) return;
    const name = btn.dataset.name;
    const action = btn.dataset.action;
    if (!name || !action) return;
    if (action === 'inc') cartInc(name);
    else if (action === 'dec') cartDec(name);
    else if (action === 'remove') cartRemove(name);
});

document.getElementById('cartItems').addEventListener('input', e => {
    const ta = e.target.closest('.item-cooking-note');
    if (!ta) return;
    saveCartNote(ta.dataset.name, ta.value);
});

// Allergy selection
function selectAllergy(choice) {
    const allergyYes = document.getElementById('allergyYes');
    const allergyNo = document.getElementById('allergyNo');
    const allergyNoteWrap = document.getElementById('allergyNoteWrap');
    const cartSendBtn = document.getElementById('cartSendBtn');

    allergyYes.classList.remove('selected');
    allergyNo.classList.remove('selected');

    if (choice === 'yes') {
        allergyYes.classList.add('selected');
        allergyNoteWrap.style.display = 'block';
    } else {
        allergyNo.classList.add('selected');
        allergyNoteWrap.style.display = 'none';
        document.getElementById('allergyInput').value = '';
    }
    document.getElementById('orderTypeBtns').style.display = 'block';
}

// Proceed to checkout with chosen order type
function goToCheckout(type) {
    if (!type) type = sessionStorage.getItem('rc_order_type') || 'delivery';
    if (!Object.keys(cart).length) return;

    // Snapshot any cooking notes from open textareas
    document.querySelectorAll('.item-cooking-note').forEach(ta => {
        const name = ta.dataset.name;
        if (name && cart[name]) cart[name].note = ta.value;
    });

    const allergyInput = document.getElementById('allergyInput')?.value.trim() || '';
    const allergyYes = document.getElementById('allergyYes');
    const hasAllergy = allergyYes?.classList.contains('selected');

    sessionStorage.setItem('rc_cart', JSON.stringify(cart));
    sessionStorage.setItem('rc_order_type', type);
    sessionStorage.setItem('rc_allergy', JSON.stringify({ hasAllergy, text: allergyInput }));
    sessionStorage.removeItem('rc_order_scheduled');

    window.location.href = 'checkout.html';
}

// ===== ORDER TYPE MODAL =====
function openOrderModal(e) {
    if (e) e.preventDefault();
    // Close mobile menu if open
    document.getElementById('mobileMenu')?.classList.remove('open');
    document.getElementById('hamburger')?.classList.remove('open');
    // Highlight current selection if already set
    const current = sessionStorage.getItem('rc_order_type');
    document.querySelectorAll('.ot-btn').forEach(b => b.classList.remove('active'));
    if (current === 'delivery') document.querySelector('.ot-delivery')?.classList.add('active');
    if (current === 'collection') document.querySelector('.ot-collection')?.classList.add('active');
    document.getElementById('otModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal(e) {
    if (e && e.target !== document.getElementById('otModalOverlay')) return;
    document.getElementById('otModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function chooseOrderType(type) {
    sessionStorage.setItem('rc_order_type', type);
    document.getElementById('otModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    // Scroll to menu section
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
}

// ===== MENU PAGES MODAL =====
const MENU_PAGE_COUNT = 5;
let menuPageIndex = 1;

function renderMenuPage() {
    document.getElementById('menuPageImg').src = 'menu-pages/page-' + menuPageIndex + '.png';
    document.getElementById('menuPageCount').textContent = '· Page ' + menuPageIndex + ' of ' + MENU_PAGE_COUNT;
    document.getElementById('menuPageDownload').href = 'menu-pages/page-' + menuPageIndex + '.png';
    document.querySelectorAll('#menuPageDots .menu-page-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === menuPageIndex - 1);
    });
}

function goToMenuPage(n) {
    menuPageIndex = ((n - 1 + MENU_PAGE_COUNT) % MENU_PAGE_COUNT) + 1;
    renderMenuPage();
}
function prevMenuPage() { goToMenuPage(menuPageIndex - 1); }
function nextMenuPage() { goToMenuPage(menuPageIndex + 1); }

function openMenuPdf() {
    const overlay = document.getElementById('pdfModalOverlay');
    const dots = document.getElementById('menuPageDots');
    if (!dots.children.length) {
        for (let i = 1; i <= MENU_PAGE_COUNT; i++) {
            const dot = document.createElement('button');
            dot.className = 'menu-page-dot';
            dot.setAttribute('aria-label', 'Go to page ' + i);
            dot.onclick = () => goToMenuPage(i);
            dots.appendChild(dot);
        }
    }
    goToMenuPage(1);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePdfModal(e) {
    if (e && e.target !== document.getElementById('pdfModalOverlay')) return;
    document.getElementById('pdfModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (!document.getElementById('pdfModalOverlay')?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') prevMenuPage();
    if (e.key === 'ArrowRight') nextMenuPage();
    if (e.key === 'Escape') closePdfModal();
});

// ===== RESERVATION FORM =====
document.getElementById('resForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const name     = document.getElementById('res-name')?.value.trim() || '';
    const phone    = document.getElementById('res-phone')?.value.trim() || '';
    const date     = document.getElementById('res-date')?.value || '';
    const time     = document.getElementById('res-time')?.value || '';
    const guests   = document.getElementById('res-guests')?.value || '';
    const occasion = document.getElementById('res-occasion')?.value || '';
    const notes    = document.getElementById('res-notes')?.value.trim() || '';

    const btn = document.getElementById('resSubmitBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    // Save reservation to Supabase
    try {
        const SB_URL = 'https://mnmebxvxmpmkuokuudao.supabase.co';
        const SB_KEY = 'sb_publishable_quwTSUSQLMwVOkcBLjiQZQ_pQ8BbrM3';
        await fetch(SB_URL + '/rest/v1/reservations', {
            method: 'POST',
            headers: {
                'apikey': SB_KEY,
                'Authorization': 'Bearer ' + SB_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                customer_name: name,
                customer_phone: phone || null,
                party_size: parseInt(guests) || 2,
                reservation_date: date,
                reservation_time: time,
                notes: (occasion ? 'Occasion: ' + occasion + (notes ? '\n' + notes : '') : notes) || null,
                source: 'website',
                status: 'pending'
            })
        });
    } catch(err) {
        console.warn('Reservation save failed.');
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Reservation';
    const mp = document.getElementById('modalPhone');
    if (mp) mp.textContent = phone || 'the number provided';
    document.getElementById('modalOverlay').classList.add('show');
});

document.getElementById('modalClose')?.addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('show');
    document.getElementById('resForm').reset();
});
document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) {
        document.getElementById('modalOverlay').classList.remove('show');
    }
});

// Initial render
updateCartUI();

// ===== GRAND OPENING AUTO VIDEO =====
const openingVideos = [
    'video/mayor welcoming video.mp4',
    'video/mayor ribbon cutting video.mp4',
    'video/mayor walking into restaurent.mp4',
    'video/mayor speech and founder speech.mp4'
];
let openingIdx = 0;
const openingVideo = document.getElementById('openingVideo');
if (openingVideo) {
    openingVideo.addEventListener('ended', () => {
        openingIdx = (openingIdx + 1) % openingVideos.length;
        openingVideo.src = openingVideos[openingIdx];
        openingVideo.load();
        openingVideo.play().catch(() => {});
    });
}

// ===== PROMOTIONS SLIDER =====
(function () {
    const slides = Array.from(document.querySelectorAll('.promo-slide'));
    const tabs = Array.from(document.querySelectorAll('.promo-tab'));
    const dotsWrap = document.querySelector('.promo-dots');
    if (!slides.length || !dotsWrap) return;

    let current = 0;
    let timer;

    // Build dots
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'promo-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.querySelectorAll('.promo-dot'));

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        const group = slides[current].dataset.group;
        tabs.forEach(t => t.classList.toggle('active', t.dataset.group === group));
        resetTimer();
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => goTo(current + 1), 4000);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const group = tab.dataset.group;
            const idx = slides.findIndex(s => s.dataset.group === group);
            if (idx !== -1) goTo(idx);
        });
    });

    document.querySelector('.promo-prev')?.addEventListener('click', () => goTo(current - 1));
    document.querySelector('.promo-next')?.addEventListener('click', () => goTo(current + 1));

    resetTimer();
})();
