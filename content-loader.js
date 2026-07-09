// ===== THE ROYAL CHILLI — CONTENT LOADER =====
(function () {
    const STORAGE_KEY = 'rc_content';

    const DEFAULTS = {
        hero: {
            tag: 'Authentic Indian Cuisine · London',
            line1: 'Dil Se Desi',
            line2: 'Taste Mein Royal',
            desc: 'Experience the rich flavours and traditions of authentic Indian cooking, crafted with love and passion in the heart of London.',
            bgImage: ''
        },
        about: {
            title: 'Where Every Dish Tells a Story of',
            titleGold: 'Passion & Heritage',
            text1: 'The Royal Chilli was born from a deep love for authentic Indian flavours and the age-old traditions of Indian cooking. We bring you the very best of South and North Indian cuisine, using the freshest ingredients and spices imported directly from India.',
            text2: 'Our chefs, trained in the finest culinary traditions, create dishes that transport you straight to the bustling streets and royal kitchens of India — right here in London.'
        },
        contact: {
            phone: '020 8797 3044',
            waNumber: '442087973044',
            hours: [
                { day: 'Mon – Thu', time: '9:00 AM – 11:00 PM' },
                { day: 'Friday', time: '11:00 AM – 11:00 PM' },
                { day: 'Saturday', time: '9:00 AM – 11:00 PM' },
                { day: 'Sunday', time: '9:00 AM – 11:00 PM' }
            ]
        },
        promotions: [
            { name: 'Breakfast Deals', icon: 'fas fa-sun', sub: 'Mon–Fri · 7AM–11:30AM', slides: [
                { img: 'pptx_images/image4.png', alt: 'Breakfast Deals Mon-Fri' }
            ]},
            { name: 'Weekend Special', icon: 'fas fa-star', sub: 'Sat–Sun · Unlimited £7.95', slides: [
                { img: 'pptx_images/image5.png', alt: 'Andhra Weekend Unlimited Breakfast' }
            ]},
            { name: 'Happy Hour', icon: 'fas fa-cocktail', sub: 'Every Day · 4PM–7PM', slides: [
                { img: 'pptx_images/image7.png', alt: 'Happy Hour 4PM-7PM' },
                { img: 'pptx_images/image8.png', alt: 'Happy Hour Bar Menu' }
            ]},
            { name: 'Live Football', icon: 'fas fa-futbol', sub: 'Match Day Specials', slides: [
                { img: 'pptx_images/image3.png', alt: 'Live Football Match Day Specials' }
            ]},
            { name: 'Signature Dishes', icon: 'fas fa-crown', sub: "Chef's Finest Picks", slides: [
                { img: 'pptx_images/image6.png', alt: 'Signature Dishes' },
                { img: 'pptx_images/image9.png', alt: 'Chicken Lamb Dum Biryani' },
                { img: 'pptx_images/image10.png', alt: 'Haleem' },
                { img: 'pptx_images/image11.png', alt: 'Nellore Chepala Pulusu' },
                { img: 'pptx_images/image12.png', alt: 'Nihari Paaya' },
                { img: 'pptx_images/image13.png', alt: 'Apricot Delight' }
            ]},
            { name: 'Cocktails & Bar', icon: 'fas fa-glass-martini-alt', sub: 'Drinks & Bar Menu', slides: [
                { img: 'pptx_images/image14.png', alt: 'Signature Cocktails' },
                { img: 'pptx_images/image15.png', alt: 'Food Specials' },
                { img: 'pptx_images/image16.png', alt: 'Drinks Menu' }
            ]}
        ],
        menu: {
            soups: [
                { name: 'Veg Sweet Corn Soup', price: '£6.95', desc: 'Classic sweet corn soup with vegetables', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Chicken Sweet Corn Soup', price: '£7.95', desc: 'Hearty sweet corn soup with tender chicken', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Prawns Sweet Corn Soup', price: '£8.95', desc: 'Sweet corn soup with juicy prawns', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Veg Manchow Soup', price: '£6.95', desc: 'Bold Indo-Chinese manchow with vegetables', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Chicken Manchow Soup', price: '£7.95', desc: 'Spicy manchow soup with chicken pieces', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Prawns Manchow Soup', price: '£8.95', desc: 'Rich manchow soup with prawns', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', badge: 'nonveg', popular: false }
            ],
            veg: [
                { name: 'Onion Pakoda', price: '', desc: 'Crispy golden onion fritters in spiced chickpea batter', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Palak Pakoda', price: '', desc: 'Crispy spinach fritters in seasoned chickpea batter', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Crispy Corn', price: '', desc: 'Crunchy fried corn kernels tossed in spices and herbs', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80', badge: 'veg', popular: true },
                { name: 'Chilli Paneer', price: '', desc: 'Wok-tossed paneer cubes with peppers in Indo-Chinese sauce', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80', badge: 'veg', popular: true },
                { name: 'Mirchi Bajji', price: '', desc: 'Whole green chillies in crispy besan batter, Andhra style', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Cut Mirchi', price: '', desc: 'Sliced fried green chillies — a classic Andhra favourite', img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', badge: 'veg', popular: false }
            ],
            nonveg: [
                { name: 'Chicken 65', price: '£6.95', desc: 'Spicy deep-fried chicken with classic Hyderabadi marinade', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', badge: 'nonveg', popular: true },
                { name: 'Chicken Majestic', price: '£6.95', desc: 'Crispy fried chicken tossed in a bold majestic masala sauce', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Chicken Lollipop', price: '£6.95', desc: 'Marinated chicken wings in a spicy lollipop coating', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Apollo Fish', price: '£7.45', desc: 'Crispy fried fish tossed in signature Apollo masala sauce', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Lamb Ghee Roast', price: '£7.45', desc: 'Mangalorean-style lamb roasted in rich ghee and spices', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', badge: 'nonveg', popular: false }
            ],
            tandoori: [
                { name: 'Paneer Tikka', price: '£9.95', desc: 'Marinated paneer cubes grilled in the clay tandoor', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Chicken Tikka', price: '£9.95', desc: 'Tender chicken marinated in spiced yoghurt, tandoor-grilled', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', badge: 'nonveg', popular: true },
                { name: 'Lamb Chops', price: '£9.95', desc: 'Marinated lamb chops grilled to perfection with royal spices', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Chicken Seekh Kebab', price: '£7.95', desc: 'Minced chicken and herb kebabs cooked in the tandoor', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', badge: 'nonveg', popular: false }
            ],
            vegcurry: [
                { name: 'Dal Tadka', price: '£5.95', desc: 'Yellow lentils tempered with cumin, garlic and spices', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Dal Makhani', price: '£6.45', desc: 'Slow-cooked black lentils in creamy buttery sauce', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Chana Masala', price: '£6.45', desc: 'Chickpeas cooked in bold aromatic masala gravy', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Paneer Butter Masala', price: '£6.95', desc: 'Soft paneer in creamy tomato butter sauce', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80', badge: 'veg', popular: true },
                { name: 'Palak Paneer', price: '£6.95', desc: 'Paneer cubes in rich spiced spinach gravy', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80', badge: 'veg', popular: false }
            ],
            nonvegcurry: [
                { name: 'Butter Chicken', price: '£6.95', desc: 'Tender chicken in rich, creamy tomato butter sauce', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', badge: 'nonveg', popular: true },
                { name: 'Andhra Chicken Curry', price: '£6.95', desc: 'Fiery Andhra-style chicken curry with bold spices', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Gongura Chicken', price: '£7.95', desc: 'Chicken cooked with tangy Andhra gongura leaves', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Gongura Lamb', price: '£8.45', desc: 'Tender lamb slow-cooked with sorrel leaves and spices', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Prawns Kadai', price: '£7.95', desc: 'Juicy prawns cooked in bold kadai masala sauce', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80', badge: 'nonveg', popular: false }
            ],
            rice: [
                { name: 'Veg Fried Rice', price: '£5.95', desc: 'Wok-tossed basmati with mixed vegetables and soy sauce', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Chicken Fried Rice', price: '£6.95', desc: 'Wok-tossed rice with tender chicken pieces and egg', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Mixed Fried Rice', price: '£7.95', desc: 'Chicken and prawn fried rice — the best of both worlds', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80', badge: 'nonveg', popular: false },
                { name: 'Chicken Noodles', price: '£9.95', desc: 'Stir-fried noodles with tender chicken in Indo-Chinese style', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80', badge: 'nonveg', popular: false }
            ],
            breads: [
                { name: 'Plain Naan', price: '', desc: 'Soft leavened bread baked in clay tandoor oven', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Butter Naan', price: '', desc: 'Naan brushed with rich melted butter', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', badge: 'veg', popular: true },
                { name: 'Garlic Naan', price: '', desc: 'Tandoori naan brushed with garlic butter and coriander', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', badge: 'veg', popular: true },
                { name: 'Tandoori Roti', price: '', desc: 'Light whole wheat roti baked in the clay tandoor', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Cheese Naan', price: '', desc: 'Naan stuffed with melted cheese and fragrant herbs', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Peshwari Naan', price: '', desc: 'Sweet naan filled with coconut, almonds and sultanas', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', badge: 'veg', popular: false }
            ],
            desserts: [
                { name: 'Gulab Jamun', price: '£4.95', desc: 'Soft milk dumplings soaked in rose-flavoured sugar syrup', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Rasmalai', price: '£5.00', desc: 'Soft paneer patties soaked in sweetened saffron milk', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Apricot Delight', price: '£6.95', desc: 'A royal blend of creamy indulgence, apricot goodness & nutty richness', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', badge: 'veg', popular: true, popularTag: 'Must Try' },
                { name: 'Irani Chai', price: '£2.50', desc: 'Rich and creamy traditional Hyderabadi tea', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', badge: 'veg', popular: false },
                { name: 'Filter Coffee', price: '£2.50', desc: 'Authentic South Indian filter coffee', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', badge: 'veg', popular: false }
            ]
        },
        gallery: [
            { src: 'gallery/g15.jpg', name: 'The Royal Chilli', large: true, hidden: false },
            { src: 'gallery/Chicken_Dum_Biryani.JPG', name: 'Chicken Dum Biryani', hidden: false },
            { src: 'gallery/Royal_Mixed_Platter.JPG', name: 'Royal Mixed Platter', hidden: false },
            { src: 'gallery/Tandoori_Sizzler.JPG', name: 'Tandoori Sizzler', hidden: false },
            { src: 'gallery/Chili_Chicken_65.JPG', name: 'Chilli Chicken 65', hidden: false },
            { src: 'gallery/Haleem.JPG', name: 'Haleem', hidden: false },
            { src: 'gallery/Masala_Dosa.JPG', name: 'Masala Dosa', hidden: false },
            { src: 'gallery/Chicken_Tikka.JPG', name: 'Chicken Tikka', hidden: false },
            { src: 'gallery/Lamb_Dum_Biryani.JPG', name: 'Lamb Dum Biryani', hidden: false },
            { src: 'gallery/Apollo_Fish.JPG', name: 'Apollo Fish', hidden: true },
            { src: 'gallery/Baby_Cap_Dosa.JPG', name: 'Baby Cap Dosa', hidden: true },
            { src: 'gallery/Butter_Naan.JPG', name: 'Butter Naan', hidden: true },
            { src: 'gallery/Chef_Spiecial_Chicken_Fried_Rice.JPG', name: 'Chef Special Chicken Fried Rice', hidden: true },
            { src: 'gallery/Chicken_Dragon.JPG', name: 'Chicken Dragon', hidden: true },
            { src: 'gallery/Chicken_Lollipop.JPG', name: 'Chicken Lollipop', hidden: true },
            { src: 'gallery/Chicken_Malai_Tikka.JPG', name: 'Chicken Malai Tikka', hidden: true },
            { src: 'gallery/Chicken_Manchow.JPG', name: 'Chicken Manchow', hidden: true },
            { src: 'gallery/Dahi_Pasi.JPG', name: 'Dahi Pasi', hidden: true },
            { src: 'gallery/Garlic_Naan.JPG', name: 'Garlic Naan', hidden: true },
            { src: 'gallery/Gobi_65.JPG', name: 'Gobi 65', hidden: true },
            { src: 'gallery/Huge.JPG', name: 'The Royal Chilli', hidden: true },
            { src: 'gallery/Kesari_Bath.JPG', name: 'Kesari Bath', hidden: true },
            { src: 'gallery/Manchurian_Mushroom.JPG', name: 'Manchurian Mushroom', hidden: true },
            { src: 'gallery/Masala_Bonda.JPG', name: 'Masala Bonda', hidden: true },
            { src: 'gallery/Masala_Papad.JPG', name: 'Masala Papad', hidden: true },
            { src: 'gallery/Masala_Wada.JPG', name: 'Masala Wada', hidden: true },
            { src: 'gallery/Mushroom_Masala.JPG', name: 'Mushroom Masala', hidden: true },
            { src: 'gallery/Mutter_Keema.JPG', name: 'Mutter Keema', hidden: true },
            { src: 'gallery/Paneer.JPG', name: 'Paneer', hidden: true },
            { src: 'gallery/Paya.JPG', name: 'Paya', hidden: true },
            { src: 'gallery/Plain_Dosa.JPG', name: 'Plain Dosa', hidden: true },
            { src: 'gallery/Salad.JPG', name: 'Salad', hidden: true },
            { src: 'gallery/Samosa_Chat.JPG', name: 'Samosa Chaat', hidden: true },
            { src: 'gallery/Sheek_Kebap_Lamb.JPG', name: 'Sheek Kebab Lamb', hidden: true },
            { src: 'gallery/Spring_Rolls.JPG', name: 'Spring Rolls', hidden: true },
            { src: 'gallery/Tadka_Dal.JPG', name: 'Tadka Dal', hidden: true },
            { src: 'gallery/Tatthi_Paratha.JPG', name: 'Tatthi Paratha', hidden: true },
            { src: 'gallery/Veg_Noddles.JPG', name: 'Veg Noodles', hidden: true },
            { src: 'gallery/Veg_Samosa.JPG', name: 'Veg Samosa', hidden: true },
            { src: 'gallery/Veg_Sweetcorn_Soup.JPG', name: 'Veg Sweetcorn Soup', hidden: true }
        ],
        testimonials: [
            { name: 'Aditya Sharma', text: '"Absolutely incredible food! The Chicken 65 and Biryani are out of this world. You can taste the authenticity in every bite. Best Indian restaurant in London by far!"', stars: 5, platform: 'Google Review' },
            { name: 'Priya Patel', text: '"The Royal Dum Biryani is a masterpiece. Warm and attentive service, beautiful ambiance, and food that tasted just like home in Hyderabad. Will be back every week!"', stars: 5, platform: 'Google Review' },
            { name: 'Mohammed Ali', text: '"Been coming here for months and it never disappoints. The Butter Chicken and Garlic Naan are simply divine. Staff are always friendly and welcoming — love this place!"', stars: 5, platform: 'Google Review' },
            { name: 'Sarah Johnson', text: '"Tried the Chilli Paneer and the Mixed Grill Platter — both phenomenal! The Royal Chilli truly lives up to its name. Highly recommend exploring the Specials menu."', stars: 5, platform: 'Google Review' },
            { name: 'Ravi Kumar', text: '"The flavours are genuine and authentic. Spice levels are perfectly balanced. This has become our family\'s go-to restaurant for every celebration. Absolutely love it!"', stars: 5, platform: 'Google Review' }
        ]
    };

    function getContent() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return DEFAULTS;
            return JSON.parse(saved);
        } catch (e) {
            return DEFAULTS;
        }
    }

    function applyHero(hero) {
        const set = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.textContent = val; };
        set('heroTag', hero.tag);
        set('heroLine1', hero.line1);
        set('heroLine2', hero.line2);
        set('heroDesc', hero.desc);
        if (hero.bgImage) {
            const bg = document.querySelector('.hero-bg');
            if (bg) bg.style.backgroundImage = "url('" + hero.bgImage + "')";
        }
    }

    function applyAbout(about) {
        const title = document.getElementById('aboutTitle');
        if (title) title.innerHTML = about.title + ' <span class="text-gold">' + about.titleGold + '</span>';
        const t1 = document.getElementById('aboutText1');
        const t2 = document.getElementById('aboutText2');
        if (t1) t1.textContent = about.text1;
        if (t2) t2.textContent = about.text2;
    }

    function applyContact(contact) {
        document.querySelectorAll('[data-rc-phone]').forEach(el => {
            const tel = 'tel:' + contact.phone.replace(/\s/g, '');
            if (el.tagName === 'A') el.href = tel;
            // preserve child icon if present, only update text nodes
            const icon = el.querySelector('i');
            if (icon) {
                el.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = ' ' + contact.phone; });
            } else {
                el.textContent = contact.phone;
                if (el.tagName === 'A') el.href = tel;
            }
        });
        const ht = document.getElementById('hoursTable');
        if (ht && contact.hours) {
            ht.innerHTML = contact.hours.map(h => '<tr><td>' + h.day + '</td><td>' + h.time + '</td></tr>').join('');
        }
        const resHrs = document.getElementById('resHours');
        if (resHrs && contact.hours) {
            const grouped = contact.hours.map(h => '<p>' + h.day + ': ' + h.time + '</p>').join('');
            resHrs.innerHTML = grouped;
        }
    }

    function applyPromotions(promos) {
        const tabs = document.querySelectorAll('.promo-tab');
        tabs.forEach((tab, i) => {
            if (!promos[i]) return;
            const nm = tab.querySelector('.pt-name'); if (nm) nm.textContent = promos[i].name;
            const sb = tab.querySelector('.pt-sub'); if (sb) sb.textContent = promos[i].sub;
            const ic = tab.querySelector('.pt-icon i'); if (ic && promos[i].icon) ic.className = promos[i].icon;
        });
        promos.forEach((promo, gi) => {
            const slides = document.querySelectorAll('.promo-slide[data-group="' + gi + '"]');
            slides.forEach((slide, si) => {
                const img = slide.querySelector('img');
                if (img && promo.slides[si]) { img.src = promo.slides[si].img; img.alt = promo.slides[si].alt || ''; }
            });
        });
    }

    function buildDishCard(dish) {
        const pop = dish.popular ? ' popular-dish' : '';
        const popTag = dish.popular ? '<div class="pop-tag">' + (dish.popularTag || 'Popular') + '</div>' : '';
        const price = dish.price ? '<span class="price">' + dish.price + '</span>' : '';
        const badge = dish.badge ? '<span class="badge ' + dish.badge + '">' + (dish.badge === 'veg' ? '🟢 Veg' : '🔴 Non-Veg') + '</span>' : '';
        return '<div class="dish-card' + pop + '">' + popTag +
            '<div class="dish-img"><img src="' + (dish.img || '') + '" alt="' + dish.name + '" loading="lazy"></div>' +
            '<div class="dish-body"><div class="dish-top"><h4>' + dish.name + '</h4>' + price + '</div>' +
            '<p>' + dish.desc + '</p>' + badge + '</div></div>';
    }

    function applyMenu(menu) {
        const cats = Object.keys(menu);
        cats.forEach(cat => {
            const panel = document.getElementById('panel-' + cat);
            if (!panel) return;
            const grid = panel.querySelector('.menu-grid');
            if (grid) grid.innerHTML = menu[cat].map(buildDishCard).join('');
        });
        reinitSteppers();
    }

    function reinitSteppers() {
        document.querySelectorAll('.dish-card').forEach(card => {
            if (card.querySelector('.card-stepper')) return;
            const nameEl = card.querySelector('.dish-top h4');
            const priceEl = card.querySelector('.price');
            if (!nameEl || !priceEl) return;
            const name = nameEl.textContent.trim();
            const price = parseFloat(priceEl.textContent.replace('£', '').trim());
            const stepper = document.createElement('div');
            stepper.className = 'card-stepper';
            stepper.dataset.name = name;
            stepper.dataset.price = price;
            stepper.innerHTML = '<button class="stepper-btn stepper-dec" onclick="stepDec(this)">−</button><span class="stepper-label">ADD</span><button class="stepper-btn stepper-inc" onclick="stepInc(this)">+</button>';
            const body = card.querySelector('.dish-body');
            const badge = body.querySelector('.badge');
            const row = document.createElement('div');
            row.className = 'badge-stepper-row';
            body.appendChild(row);
            if (badge) row.appendChild(badge);
            row.appendChild(stepper);
        });
    }

    function applyGallery(gallery) {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;
        grid.innerHTML = gallery.map(item => {
            const hid = item.hidden ? ' g-hidden' : '';
            const lg = item.large ? ' g-large g-cover' : '';
            return '<div class="g-item' + lg + hid + '"><img src="' + item.src + '" alt="' + item.name + '" loading="lazy"><div class="g-overlay"></div><span class="g-name">' + item.name + '</span></div>';
        }).join('');
    }

    function applyTestimonials(reviews) {
        const track = document.getElementById('sliderTrack');
        if (!track) return;
        track.innerHTML = reviews.map(r => {
            const stars = '★'.repeat(r.stars || 5);
            return '<div class="review-card"><div class="stars">' + stars + '</div><p>' + r.text + '</p><div class="reviewer"><div class="avatar">' + r.name.charAt(0) + '</div><div><strong>' + r.name + '</strong><span>' + (r.platform || 'Google Review') + '</span></div></div></div>';
        }).join('');
        if (typeof buildDots === 'function') buildDots();
        if (typeof autoSlide !== 'undefined') clearInterval(autoSlide);
        if (typeof startAuto === 'function') startAuto();
    }

    function applyStats(stats) {
        stats.forEach(function(s, i) {
            var numEl = document.getElementById('statNum' + i);
            var lblEl = document.getElementById('statLabel' + i);
            if (numEl) numEl.setAttribute('data-count', s.count);
            if (lblEl) lblEl.textContent = s.label;
        });
    }

    function applyOpening(opening) {
        var vid = document.getElementById('openingVideo');
        if (vid && opening.videoUrl) { vid.src = opening.videoUrl; }
    }

    function applyReservation(res) {
        var tag = document.getElementById('resTag'); if (tag) tag.textContent = res.tag;
        var title = document.getElementById('resTitle'); if (title) title.textContent = res.title;
        var gold = document.getElementById('resTitleGold'); if (gold) gold.textContent = res.titleGold;
        var desc = document.getElementById('resDesc'); if (desc) desc.textContent = res.desc;
    }

    function applyContactExtra(contact) {
        if (contact.address) {
            document.querySelectorAll('[data-rc-address]').forEach(function(el) { el.innerHTML = contact.address.replace(/,\s*/g, '<br>'); });
        }
        if (contact.mapEmbed) {
            var map = document.getElementById('contactMap');
            if (map) map.src = contact.mapEmbed;
        }
        if (contact.social) {
            document.querySelectorAll('[data-rc-social]').forEach(function(el) {
                var key = el.getAttribute('data-rc-social');
                if (contact.social[key]) el.href = contact.social[key];
            });
        }
    }

    function applyFooter(footer) {
        var tag = document.getElementById('footerTagline'); if (tag) tag.textContent = footer.tagline;
        var copy = document.getElementById('footerCopyright'); if (copy) copy.textContent = footer.copyright;
    }

    function applyContent(c) {
        if (!c) return;
        applyHero(c.hero || DEFAULTS.hero);
        applyAbout(c.about || DEFAULTS.about);
        applyContact(c.contact || DEFAULTS.contact);
        applyContactExtra(c.contact || DEFAULTS.contact);
        applyPromotions(c.promotions || DEFAULTS.promotions);
        applyMenu(c.menu || DEFAULTS.menu);
        applyGallery(c.gallery || DEFAULTS.gallery);
        applyTestimonials(c.testimonials || DEFAULTS.testimonials);
        if (c.stats) applyStats(c.stats);
        if (c.opening) applyOpening(c.opening);
        if (c.reservation) applyReservation(c.reservation);
        if (c.footer) applyFooter(c.footer);
    }

    window.addEventListener('load', function () {
        if (!document.getElementById('heroTag')) return; // only run on main site
        // Try fetching published content.json first; fall back to localStorage/defaults
        fetch('content.json?v=' + Date.now())
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (published) {
                // localStorage draft overrides published (only used in admin preview mode)
                const draft = localStorage.getItem('rc_admin_preview') === '1'
                    ? getContent()
                    : null;
                applyContent(draft || published || getContent());
            })
            .catch(function () {
                applyContent(getContent());
            });
    });

    DEFAULTS.stats = [
        {count:150,label:'Signature Dishes'},
        {count:10000,label:'Happy Customers'},
        {count:5,label:'Years of Excellence'},
        {count:12,label:'Expert Chefs'}
    ];
    DEFAULTS.opening = { videoUrl: 'video/mayor welcoming video.mp4' };
    DEFAULTS.reservation = { tag:'Reserve a Table', title:'Book Your', titleGold:'Royal Experience', desc:"Whether it's a date night, family gathering or special celebration — we're here to make it truly memorable." };
    DEFAULTS.contact.address = '43 Kingsley Road, Hounslow, London, TW3 1PA';
    DEFAULTS.contact.mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.593!2d-0.3580133!3d51.4722309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760d00575f94db%3A0x374941cb29fce285!2sThe%20Royal%20Chilli!5e0!3m2!1sen!2suk!4v1718000000000!5m2!1sen!2suk';
    DEFAULTS.contact.social = { facebook:'#', instagram:'https://www.instagram.com/the_royal_chilli?igsh=MW12MTVzY2p0ZmUycw==', twitter:'#' };
    DEFAULTS.footer = { tagline:'Bringing the rich flavours and warmth of authentic Indian cuisine to the heart of London.', copyright:'© 2025 The Royal Chilli. All rights reserved.' };

    window.RC_CONTENT = { STORAGE_KEY: STORAGE_KEY, DEFAULTS: DEFAULTS };
})();
