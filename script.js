// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1800);
});

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
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById('panel-' + tab.dataset.tab);
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

// ===== WHATSAPP ORDERING SYSTEM =====
const WA_NUMBER = '442087973044';
let cart = [];

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
    card.querySelector('.dish-body').appendChild(stepper);
});

function stepInc(btn) {
    const stepper = btn.closest('.card-stepper');
    const name = stepper.dataset.name;
    const price = parseFloat(stepper.dataset.price);

    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    syncStepper(stepper);
    updateCartUI();
}

function stepDec(btn) {
    const stepper = btn.closest('.card-stepper');
    const name = stepper.dataset.name;
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty--;
    if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
    syncStepper(stepper);
    updateCartUI();
}

function syncStepper(stepper) {
    const name = stepper.dataset.name;
    const item = cart.find(i => i.name === name);
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
    const total = cart.reduce((s, i) => s + i.qty, 0);
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
    const cartSendBtn = document.getElementById('cartSendBtn');

    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartItems.innerHTML = '';
        cartFooter.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    cartTotal.textContent = 'Subtotal: £' + subtotal.toFixed(2);

    cartItems.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">£${item.price.toFixed(2)} each</div>
                <div class="cart-qty">
                    <button onclick="cartDec(${idx})">−</button>
                    <span>${item.qty}</span>
                    <button onclick="cartInc(${idx})">+</button>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.4rem">
                <span style="font-size:0.9rem;font-weight:700;color:var(--gold)">£${(item.price * item.qty).toFixed(2)}</span>
                <button class="cart-remove" onclick="cartRemove(${idx})"><i class="fas fa-times"></i></button>
            </div>
        </div>
    `).join('');

    // Reset send button state if it was shown — keep hidden until allergy answered
    const allergyYes = document.getElementById('allergyYes');
    const allergyNo = document.getElementById('allergyNo');
    const hasAnswer = allergyYes.classList.contains('selected') || allergyNo.classList.contains('selected');
    cartSendBtn.style.display = hasAnswer ? 'flex' : 'none';
}

function cartInc(idx) {
    cart[idx].qty++;
    resyncAllSteppers();
    updateCartUI();
}

function cartDec(idx) {
    cart[idx].qty--;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    resyncAllSteppers();
    updateCartUI();
}

function cartRemove(idx) {
    cart.splice(idx, 1);
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
    cartSendBtn.style.display = 'flex';
}

// Send WhatsApp order
function sendWhatsAppOrder() {
    if (cart.length === 0) return;
    const allergyInput = document.getElementById('allergyInput').value.trim();
    const allergyYes = document.getElementById('allergyYes');
    const hasAllergy = allergyYes.classList.contains('selected') && allergyInput;

    let msg = '🌶️ *Order from The Royal Chilli*\n\n';
    msg += '*Items:*\n';
    cart.forEach(item => {
        msg += `• ${item.name} x${item.qty} — £${(item.price * item.qty).toFixed(2)}\n`;
    });
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    msg += `\n*Total: £${total.toFixed(2)}*`;
    if (hasAllergy) msg += `\n\n⚠️ *Dietary requirements:* ${allergyInput}`;
    msg += '\n\nPlease confirm my order. Thank you! 🙏';

    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

// ===== RESERVATION FORM → WHATSAPP =====
document.getElementById('resForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[placeholder*="Name"], input[type="text"]')?.value.trim() || '';
    const phone = form.querySelector('input[type="tel"], input[placeholder*="Phone"]')?.value.trim() || '';
    const date = form.querySelector('input[type="date"]')?.value || '';
    const time = form.querySelector('input[type="time"], select')?.value || '';
    const guests = form.querySelector('input[type="number"], select[name="guests"]')?.value || '';
    const notes = form.querySelector('textarea')?.value.trim() || '';

    let msg = '🍽️ *Table Reservation — The Royal Chilli*\n\n';
    if (name) msg += `*Name:* ${name}\n`;
    if (phone) msg += `*Phone:* ${phone}\n`;
    if (date) msg += `*Date:* ${date}\n`;
    if (time) msg += `*Time:* ${time}\n`;
    if (guests) msg += `*Guests:* ${guests}\n`;
    if (notes) msg += `*Notes:* ${notes}\n`;
    msg += '\nPlease confirm my reservation. Thank you!';

    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
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
