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
            const offset = 80;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
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
            el.textContent = target >= 1000 ? Math.floor(current).toLocaleString() + '+' : Math.floor(current) + (target === 5 ? '+' : '');
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
        if (panel) { panel.classList.add('active'); }
    });
});

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('sliderTrack');
const dotsContainer = document.getElementById('sliderDots');
let current = 0;
let autoSlide;

function getVisible() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

function buildDots() {
    if (!dotsContainer) return;
    const cards = track.querySelectorAll('.review-card');
    const total = cards.length;
    const vis = getVisible();
    const pages = total - vis + 1;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < pages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    }
}

function goTo(index) {
    const cards = track.querySelectorAll('.review-card');
    const total = cards.length;
    const vis = getVisible();
    const pages = total - vis + 1;
    current = Math.max(0, Math.min(index, pages - 1));
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cardW}px)`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

function startAuto() {
    autoSlide = setInterval(() => {
        const cards = track.querySelectorAll('.review-card');
        const vis = getVisible();
        const pages = cards.length - vis + 1;
        goTo(current + 1 >= pages ? 0 : current + 1);
    }, 4000);
}

document.getElementById('prevBtn')?.addEventListener('click', () => { clearInterval(autoSlide); goTo(current - 1); startAuto(); });
document.getElementById('nextBtn')?.addEventListener('click', () => { clearInterval(autoSlide); goTo(current + 1); startAuto(); });

window.addEventListener('resize', () => { buildDots(); goTo(0); });
buildDots();
startAuto();

// ===== RESERVATION FORM =====
document.getElementById('resForm')?.addEventListener('submit', e => {
    e.preventDefault();
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

// ===== BACK TO TOP =====
document.getElementById('backTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== WHATSAPP ORDER SYSTEM =====
const WA_NUMBER = '442087973044';
let cart = [];

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
    const list = document.getElementById('waItemList');
    const empty = document.getElementById('waEmpty');
    const count = document.getElementById('cartCount');
    const total = document.getElementById('waTotal');
    const sendBtn = document.getElementById('waSendBtn');

    if (cart.length === 0) {
        empty.style.display = 'block';
        list.style.display = 'none';
        count.style.display = 'none';
        sendBtn.disabled = true;
    } else {
        empty.style.display = 'none';
        list.style.display = 'flex';
        const totalQty = cart.reduce((s, i) => s + i.qty, 0);
        count.textContent = totalQty;
        count.style.display = 'flex';
        sendBtn.disabled = false;
    }

    list.innerHTML = cart.map((item, idx) => `
        <li class="wa-item">
            <span class="wa-item-name">${item.name}</span>
            <div class="wa-item-qty">
                <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
                <span class="qty-num">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
            </div>
            <span class="wa-item-price">£${(item.price * item.qty).toFixed(2)}</span>
        </li>
    `).join('');

    total.textContent = '£' + getCartTotal().toFixed(2);
}

function changeQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);

    // update add button state
    updateAddBtns();
    renderCart();
}

function updateAddBtns() {
    document.querySelectorAll('.add-btn').forEach(btn => {
        const name = btn.dataset.name;
        const inCart = cart.find(i => i.name === name);
        btn.textContent = inCart ? `✓ Added (${inCart.qty})` : '+ Add to Order';
        btn.classList.toggle('added', !!inCart);
    });
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateAddBtns();
    renderCart();

    // flash the WA button
    document.getElementById('waBtn').style.transform = 'scale(1.2)';
    setTimeout(() => document.getElementById('waBtn').style.transform = '', 300);
}

// Inject Add buttons into all dish cards
document.querySelectorAll('.dish-card').forEach(card => {
    const nameEl = card.querySelector('.dish-top h4');
    const priceEl = card.querySelector('.price');
    if (!nameEl || !priceEl) return;

    const name = nameEl.textContent.trim();
    const priceText = priceEl.textContent.replace('£', '').trim();
    const price = parseFloat(priceText);

    const btn = document.createElement('button');
    btn.className = 'add-btn';
    btn.dataset.name = name;
    btn.dataset.price = price;
    btn.textContent = '+ Add to Order';
    btn.addEventListener('click', () => addToCart(name, price));

    card.querySelector('.dish-body').appendChild(btn);
});

// Panel open/close
const waPanel = document.getElementById('waPanel');
const waBackdrop = document.getElementById('waBackdrop');

document.getElementById('waBtn').addEventListener('click', () => {
    waPanel.classList.add('open');
    waBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
});

function closeWaPanel() {
    waPanel.classList.remove('open');
    waBackdrop.classList.remove('show');
    document.body.style.overflow = '';
}

document.getElementById('waPanelClose').addEventListener('click', closeWaPanel);
waBackdrop.addEventListener('click', closeWaPanel);

// Allergy toggle
let allergyText = '';
document.getElementById('allergyYes').addEventListener('click', () => {
    document.getElementById('allergyYes').classList.add('active');
    document.getElementById('allergyNo').classList.remove('active');
    document.getElementById('allergyNote').style.display = 'block';
});
document.getElementById('allergyNo').addEventListener('click', () => {
    document.getElementById('allergyNo').classList.add('active');
    document.getElementById('allergyYes').classList.remove('active');
    document.getElementById('allergyNote').style.display = 'none';
    document.getElementById('allergyNote').value = '';
});

// Send via WhatsApp
document.getElementById('waSendBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    const allergy = document.getElementById('allergyNote').value.trim();
    const allergyActive = document.getElementById('allergyYes').classList.contains('active');

    let msg = '🌶️ *Order from The Royal Chilli Website*\n\n';
    msg += '*Items Ordered:*\n';
    cart.forEach(item => {
        msg += `• ${item.name} x${item.qty} — £${(item.price * item.qty).toFixed(2)}\n`;
    });
    msg += `\n*Total: £${getCartTotal().toFixed(2)}*`;
    if (allergyActive && allergy) msg += `\n\n⚠️ *Dietary Requirements:* ${allergy}`;
    msg += '\n\nPlease confirm my order. Thank you! 🙏';

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
});

renderCart();

// ===== SET MIN DATE FOR RESERVATION =====
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}
