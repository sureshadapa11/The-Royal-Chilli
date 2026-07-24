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
                { name: "Vegetable Sweet Corn Soup", price: "£5.95", desc: "Sweetcorn and garden vegetables in a lightly seasoned broth.", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", badge: "veg", popular: false },
                { name: "Chicken Sweet Corn Soup", price: "£6.95", desc: "Tender chicken and sweetcorn in a smooth, gently seasoned broth.", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Vegetable Manchow Soup", price: "£5.95", desc: "Hot and tangy vegetable soup topped with crispy noodles.", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", badge: "veg", popular: false },
                { name: "Chicken Manchow Soup", price: "£6.95", desc: "Spicy chicken and vegetable soup with garlic, chilli and crispy noodles.", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", badge: "nonveg", popular: false }
            ],
            appetisers: [
                { name: "Masala Papad", price: "£3.45", desc: "Crisp papad topped with onion, tomato, chilli and tangy seasoning.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Plain Papad", price: "£2.50", desc: "Crisp roasted or fried papad served with house chutneys.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Chilli Garlic Mogo", price: "£6.95", desc: "Crispy cassava tossed with garlic, chilli, peppers and spring onion.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Vegetable Spring Rolls", price: "£5.95", desc: "Crispy rolls filled with vegetables and served with sweet chilli sauce.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Onion Pakoda", price: "£5.95", desc: "Crispy onion fritters seasoned with chilli and Indian spices.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Cut Mirchi", price: "£6.95", desc: "Battered green chillies fried until crisp and finished with tangy seasoning.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Samosa Chaat", price: "£6.95", desc: "Crushed samosas with chickpeas, yoghurt and tangy chutneys.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false }
            ],
            vegstarters: [
                { name: "Paneer Choice", price: "£8.95", desc: "Paneer 65, Chilli Paneer, Manchurian, Tikka or Pakoda.", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", badge: "veg", popular: false },
                { name: "Gobi Choice", price: "£8.95", desc: "Gobi 65, Chilli Gobi, Manchurian or Crispy Gobi.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Mushroom Choice", price: "£8.95", desc: "Chilli Mushroom, Mushroom 65, Pepper or Manchurian.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Crispy Corn", price: "£7.95", desc: "Golden sweetcorn tossed with garlic, chilli, pepper and curry leaves.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Vegetable Manchurian", price: "£8.95", desc: "Crispy vegetable dumplings tossed with garlic, chilli and sauce.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Tandoori Paneer Tikka", price: "£9.95", desc: "Paneer, onion and peppers marinated with yoghurt and Kashmiri chilli.", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", badge: "veg", popular: false },
                { name: "Bhindi Kurkuri", price: "£8.95", desc: "Crispy okra seasoned with gram flour, chilli, cumin and mango powder.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Hara Bhara Kebab", price: "£7.95", desc: "Spinach and green pea kebabs, lightly spiced and pan-fried.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false }
            ],
            royalveg: [
                { name: "Gutti Vankai", price: "£9.95", desc: "Baby aubergines stuffed with peanut, sesame, coconut and Andhra spices.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Gongura Paneer", price: "£9.95", desc: "Paneer cooked with tangy sorrel leaves, garlic, chilli and Andhra spices.", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", badge: "veg", popular: false },
                { name: "Paneer Ghee Roast", price: "£9.95", desc: "Paneer tossed in a rich Mangalorean chilli, spice and ghee masala.", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", badge: "veg", popular: false },
                { name: "Paneer Platter", price: "£12.95", desc: "Paneer tikka, hariyali paneer and malai paneer cooked in the tandoor.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Chilli Mushroom Pepper Fry", price: "£9.95", desc: "Mushrooms stir-fried with black pepper, curry leaves, garlic and chilli.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Crispy Lotus Stem", price: "£9.95", desc: "Crispy lotus stem tossed in a sweet, spicy and tangy chilli glaze.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Malai Broccoli", price: "£9.95", desc: "Broccoli marinated with yoghurt, mustard, chilli and tandoori spices.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Vegetable of the Day", price: "£9.95", desc: "Chef's daily vegetable special, prepared fresh.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false }
            ],
            vegmains: [
                { name: "Paneer Butter Masala", price: "£9.95", desc: "Paneer simmered in a creamy tomato, butter and mild spice sauce.", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", badge: "veg", popular: false },
                { name: "Kadai Paneer", price: "£9.95", desc: "Paneer with peppers, onion, tomato and freshly ground kadai spices.", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", badge: "veg", popular: false },
                { name: "Palak Paneer", price: "£9.95", desc: "Paneer gently cooked in a smooth spinach, garlic and tomato sauce.", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", badge: "veg", popular: false },
                { name: "Paneer Tikka Masala", price: "£9.95", desc: "Char-grilled paneer in a rich tomato, onion and cream sauce.", img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", badge: "veg", popular: false },
                { name: "Vegetable Korma", price: "£9.95", desc: "Mixed vegetables cooked with coconut, cashew and aromatic spices.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "veg", popular: false },
                { name: "Vegetable Chettinad", price: "£9.95", desc: "Seasonal vegetables with coconut, black pepper, fennel and curry leaves.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "veg", popular: false },
                { name: "Dal Tadka", price: "£8.95", desc: "Yellow lentils tempered with cumin, garlic, chilli and ghee.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "veg", popular: false },
                { name: "Dal Makhani", price: "£9.95", desc: "Black lentils slow-cooked with tomato, butter and cream.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "veg", popular: false },
                { name: "Chana Masala", price: "£8.95", desc: "Chickpeas cooked with onion, tomato, ginger and Punjabi spices.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "veg", popular: false }
            ],
            nonvegstarters: [
                { name: "Chicken Choice", price: "£8.95", desc: "Chicken 65, Chilli, Majestic, Lollipop, Manchurian, Pakoda or Tikka.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Fish Choice", price: "£9.95", desc: "Fish Pakoda, Apollo Fish Fry, Fish 65 or Chilli Fish.", img: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Lamb Choice", price: "£9.95", desc: "Lamb Ghee Roast, Chukka, Pepper, Seekh Kebab or Chops.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Prawn Choice", price: "£10.95", desc: "Pepper, Chilli Garlic, Prawn 65 or Butter Garlic Prawns.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Chicken Tangdi Kebab", price: "£9.95", desc: "Chicken drumsticks marinated with yoghurt, ginger, garlic and spices.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Malai Chicken Tikka", price: "£9.95", desc: "Tender chicken marinated with cream, cardamom and mild spices.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Lamb Seekh Kebab", price: "£10.95", desc: "Minced lamb skewers seasoned with herbs and cooked over charcoal.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", badge: "nonveg", popular: false }
            ],
            royalnonveg: [
                { name: "Chicken Platter", price: "£16.50", desc: "Chicken tikka, wings, tangdi kebab and house chicken kebab.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Bheja Fry", price: "£13.95", desc: "Tender lamb brain cooked with onion, chilli and traditional spices.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Liver Fry", price: "£8.95", desc: "Spiced liver stir-fried with onion, curry leaves and black pepper.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Natu Kodi Fry", price: "£9.95", desc: "Country-style chicken fried with chilli, curry leaves and Andhra spices.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Pistachio Lamb Chops", price: "£14.95", desc: "Char-grilled lamb chops finished with aromatic spices and pistachio.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Haleem", price: "£12.95", desc: "Slow-cooked meat, lentils and wheat blended with Hyderabadi spices.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Andhra Chicken Curry", price: "£10.95", desc: "Chicken slow-cooked with onion, tomato, curry leaves and Andhra spices.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Gongura Chicken", price: "£9.95", desc: "Chicken cooked with tangy sorrel leaves, garlic and green chilli.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Tiger Prawns Masala Fry", price: "£14.95", desc: "Tiger prawns tossed in onion, tomato, chilli and curry-leaf masala.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Paya", price: "£12.95", desc: "Slow-cooked lamb trotters in a rich and aromatic spiced gravy.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "King Fish Fry", price: "£12.95", desc: "King fish marinated with chilli, turmeric, ginger and garlic.", img: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Pomfret Fry", price: "£12.95", desc: "Whole pomfret marinated in coastal spices and fried until crisp.", img: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Lemon Butter Fish", price: "£12.95", desc: "Fish fillet finished with lemon, butter, garlic and fresh herbs.", img: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Grilled Sea Bass", price: "£13.95", desc: "Sea bass grilled with citrus, garlic, herbs and mild Indian spices.", img: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Valcona Garlic Prawns", price: "£14.95", desc: "Prawns cooked in an intense garlic, chilli and butter glaze.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Gongura Lamb", price: "£10.95", desc: "Tender lamb cooked with tangy sorrel leaves and Andhra spices.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Gongura Prawns", price: "£11.95", desc: "Prawns cooked with gongura leaves, garlic, chilli and coastal spices.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "nonveg", popular: false }
            ],
            nonvegmains: [
                { name: "Chicken Curry Choice", price: "£9.95", desc: "Chicken Tikka Masala, Butter Chicken, Kadai Chicken or Bhuna.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Lamb Curry Choice", price: "£10.95", desc: "Lamb Kadai, Telangana Mamsam, Railway Curry or Rogan Josh.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Prawn Curry Choice", price: "£10.95", desc: "Prawn Kadai, Masala, Chilli Garlic or Tikka Masala.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "nonveg", popular: false },
                { name: "King Fish Curry", price: "£12.95", desc: "King fish simmered in a rich onion, tomato, spice and tamarind curry.", img: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Chicken Chettinad", price: "£10.95", desc: "Chicken cooked with coconut, black pepper, fennel and curry leaves.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Andhra Mutton Curry", price: "£11.95", desc: "Tender mutton slow-cooked with onion, tomato, pepper and Andhra spices.", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Mangalore Prawn Curry", price: "£12.95", desc: "Prawns simmered with coconut, coriander, tamarind and curry leaves.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Nellore Fish Pulusu", price: "£12.95", desc: "Fish cooked in a tangy tamarind, raw mango and Andhra chilli gravy.", img: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&q=80", badge: "nonveg", popular: false }
            ],
            biryanis: [
                { name: "Hyderabadi Chicken Dum Biryani", price: "£8.95", desc: "Marinated chicken and basmati rice dum-cooked with saffron and spices.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Chicken Fry-Piece Biryani", price: "£8.95", desc: "Spiced fried chicken layered with aromatic rice and biryani masala.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Hyderabadi Lamb Dum Biryani", price: "£10.95", desc: "Tender lamb and basmati rice slow-cooked with saffron and spices.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Prawn Biryani", price: "£12.95", desc: "Prawns layered with basmati rice, saffron and coastal spices.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Chicken Tikka Biryani", price: "£10.95", desc: "Fragrant basmati rice layered with marinated chicken tikka.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Chicken 65 Biryani", price: "£10.95", desc: "Fragrant basmati rice layered with spicy Chicken 65.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Vegetable Dum Biryani", price: "£7.95", desc: "Seasonal vegetables and basmati rice dum-cooked with saffron.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", badge: "veg", popular: false },
                { name: "Paneer Biryani", price: "£8.95", desc: "Spiced paneer and vegetables layered with fragrant basmati rice.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", badge: "veg", popular: false },
                { name: "Family Chicken Biryani", price: "£29.95", desc: "A generous sharing portion of Hyderabadi chicken dum biryani for the table.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Family Lamb Biryani", price: "£34.95", desc: "A generous sharing portion of Hyderabadi lamb dum biryani for the table.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false }
            ],
            ricenoodles: [
                { name: "Egg Fried Rice / Noodles", price: "£7.95", desc: "Wok-tossed rice or noodles with egg and vegetables.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Chicken Fried Rice / Noodles", price: "£8.95", desc: "Wok-tossed rice or noodles with chicken and vegetables.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false },
                { name: "Vegetable Fried Rice / Noodles", price: "£6.95", desc: "Wok-tossed rice or noodles with vegetables and light seasoning.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Prawn Fried Rice / Noodles", price: "£9.95", desc: "Wok-tossed rice or noodles with prawns and vegetables.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "nonveg", popular: false }
            ],
            breads: [
                { name: "Plain Naan", price: "£2.00", desc: "Soft traditional bread freshly baked in the tandoor.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "veg", popular: false },
                { name: "Butter Naan", price: "£2.50", desc: "Tandoor-baked naan brushed with melted butter.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "veg", popular: false },
                { name: "Garlic Naan", price: "£3.45", desc: "Fresh naan topped with garlic, butter and coriander.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "veg", popular: false },
                { name: "Chilli Garlic Naan", price: "£3.45", desc: "Naan finished with garlic, chilli, coriander and butter.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "veg", popular: false },
                { name: "Cheese Naan", price: "£3.95", desc: "Soft naan filled with melted cheese.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "veg", popular: false },
                { name: "Tandoori Roti", price: "£2.50", desc: "Wholewheat flatbread baked in the tandoor.", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "veg", popular: false },
                { name: "Chapati (2 Pieces)", price: "£2.95", desc: "Soft wholewheat flatbread cooked on a hot griddle.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false }
            ],
            ricesides: [
                { name: "Steamed Basmati Rice", price: "£3.50", desc: "Fragrant basmati rice steamed until light and fluffy.", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80", badge: "veg", popular: false },
                { name: "Jeera Rice", price: "£4.50", desc: "Basmati rice tempered with cumin seeds and aromatic spices.", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80", badge: "veg", popular: false },
                { name: "Pilau Rice", price: "£3.95", desc: "Lightly spiced basmati rice cooked with whole spices.", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80", badge: "veg", popular: false },
                { name: "Bhindi Fry", price: "£6.95", desc: "Okra stir-fried with onion, tomato and dry spices.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Plain Raita", price: "£2.95", desc: "Chilled seasoned yoghurt served as a cooling accompaniment.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Boondi Raita", price: "£4.50", desc: "Seasoned yoghurt mixed with crisp gram-flour pearls.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Beetroot Raita", price: "£4.95", desc: "Chilled yoghurt with beetroot and gentle seasoning.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false },
                { name: "Green Salad", price: "£3.50", desc: "Lettuce, cucumber, tomato, onion and lemon.", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", badge: "veg", popular: false }
            ],
            desserts: [
                { name: "Double Ka Meetha", price: "£4.95", desc: "Hyderabadi bread pudding flavoured with saffron, cardamom and nuts.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "veg", popular: false },
                { name: "Gulab Jamun with Ice Cream", price: "£4.95", desc: "Warm milk dumplings soaked in fragrant cardamom syrup, served with vanilla ice cream.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "veg", popular: false },
                { name: "Kulfi", price: "£4.95", desc: "Traditional Indian ice cream: malai, mango or pistachio.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "veg", popular: false },
                { name: "Apricot Delight", price: "£5.95", desc: "Stewed apricots layered with cream, nuts and a delicate hint of cardamom.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "veg", popular: false },
                { name: "Chocolate Brownie with Ice Cream", price: "£5.95", desc: "Warm chocolate brownie served with vanilla ice cream.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "veg", popular: false },
                { name: "Ice Cream Selection", price: "£4.95", desc: "Choose from vanilla, chocolate, strawberry or mango.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "veg", popular: false }
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
        const bg = document.querySelector('.hero-bg');
        if (!bg) return;
        const images = (hero.bgImages && hero.bgImages.filter(function(u){return u;})) || (hero.bgImage ? [hero.bgImage] : []);
        if (!images.length) return;
        bg.innerHTML = images.map(function(url, i) {
            return '<div class="hero-slide' + (i === 0 ? ' active' : '') + '" style="background-image:url(\'' + url + '\')"></div>';
        }).join('');
        if (images.length > 1) {
            var cur = 0;
            setInterval(function() {
                var slides = bg.querySelectorAll('.hero-slide');
                slides[cur].classList.remove('active');
                cur = (cur + 1) % slides.length;
                slides[cur].classList.add('active');
            }, 5000);
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

    function buildDishCard(dish, cat) {
        const pop = dish.popular ? ' popular-dish' : '';
        const popTag = dish.popular ? '<div class="pop-tag">' + (dish.popularTag || 'Popular') + '</div>' : '';
        const price = dish.price ? '<span class="price">' + dish.price + '</span>' : '';
        const badge = (dish.badge && cat !== 'desserts') ? '<span class="badge ' + dish.badge + '">' + (dish.badge === 'veg' ? '🟢 Veg' : '🔴 Non-Veg') + '</span>' : '';
        return '<div class="dish-card' + pop + '">' +
            '<div class="dish-body">' + popTag + '<div class="dish-top"><h4>' + dish.name + '</h4>' + price + '</div>' +
            '<p>' + dish.desc + '</p>' + badge + '</div></div>';
    }

    function applyMenu(menu) {
        const cats = Object.keys(menu);
        cats.forEach(cat => {
            const panel = document.getElementById('panel-' + cat);
            if (!panel) return;
            const grid = panel.querySelector('.menu-grid');
            if (grid) grid.innerHTML = menu[cat].map(dish => buildDishCard(dish, cat)).join('');
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
        if (opening.hideAfter) {
            var hideDate = new Date(opening.hideAfter);
            if (!isNaN(hideDate) && new Date() > hideDate) {
                var section = document.getElementById('opening');
                if (section) section.style.display = 'none';
                document.querySelectorAll('a[href="#opening"]').forEach(function(a) {
                    var li = a.closest('li'); if (li) li.style.display = 'none';
                });
            }
        }
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

    // ── Supabase live menu fetch ──────────────────────────────────────────
    var SUPABASE_URL = 'https://mnmebxvxmpmkuokuudao.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_DMBrHPDVvoCGx5hKwgxMQA_-BLFjbr1';
    var CAT_PANEL_MAP = {
        'Soups': 'soups', 'Appetisers': 'appetisers',
        'Vegetarian Starters': 'vegstarters', 'Vegetarian Specials': 'royalveg',
        'Vegetarian Mains': 'vegmains',
        'Non-Vegetarian Starters': 'nonvegstarters', 'Non-Vegetarian Specials': 'royalnonveg',
        'Non-Vegetarian Mains': 'nonvegmains',
        'Biryanis': 'biryanis',
        'Rice & Noodles': 'ricenoodles', 'Breads': 'breads',
        'Rice & Sides': 'ricesides', 'Desserts': 'desserts'
    };

    function buildImageLookup(menu) {
        var map = {};
        Object.keys(menu).forEach(function(cat) {
            (menu[cat] || []).forEach(function(item) {
                if (item.img) map[item.name.toLowerCase()] = item.img;
            });
        });
        return map;
    }

    var DEFAULT_IMG_VEG = 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80';
    var DEFAULT_IMG_NONVEG = 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80';

    function fetchSupabaseMenu(imgLookup) {
        var headers = { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY };
        return Promise.all([
            fetch(SUPABASE_URL + '/rest/v1/menu_categories?active=eq.1&order=display_order', { headers: headers }),
            fetch(SUPABASE_URL + '/rest/v1/menu_items?active=eq.1&available_online=neq.false&order=display_order', { headers: headers })
        ]).then(function(responses) {
            if (!responses[0].ok || !responses[1].ok) return null;
            return Promise.all([responses[0].json(), responses[1].json()]);
        }).then(function(results) {
            if (!results) return null;
            var cats = results[0], items = results[1];
            var menu = {};
            cats.forEach(function(cat) {
                var panelId = CAT_PANEL_MAP[cat.name];
                if (!panelId) return;
                menu[panelId] = items
                    .filter(function(i) { return i.category_id === cat.id; })
                    .map(function(i) {
                        return {
                            name: i.name,
                            price: '£' + Number(i.price).toFixed(2),
                            desc: i.description || '',
                            img: imgLookup[i.name.toLowerCase()] || (i.is_veg ? DEFAULT_IMG_VEG : DEFAULT_IMG_NONVEG),
                            badge: i.is_veg ? 'veg' : 'nonveg',
                            popular: false
                        };
                    });
            });
            return menu;
        }).catch(function() { return null; });
    }

    window.addEventListener('load', function () {
        if (!document.getElementById('heroTag')) return; // only run on main site
        // Try fetching published content.json first; fall back to localStorage/defaults
        fetch('content.json?v=' + Date.now())
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (published) {
                var draft = localStorage.getItem('rc_admin_preview') === '1' ? getContent() : null;
                var baseContent = draft || published || getContent();
                var imgLookup = buildImageLookup(baseContent.menu || DEFAULTS.menu);
                fetchSupabaseMenu(imgLookup).then(function(supabaseMenu) {
                    if (supabaseMenu) baseContent.menu = supabaseMenu;
                    applyContent(baseContent);
                });
            })
            .catch(function () {
                var baseContent = getContent();
                var imgLookup = buildImageLookup(baseContent.menu || DEFAULTS.menu);
                fetchSupabaseMenu(imgLookup).then(function(supabaseMenu) {
                    if (supabaseMenu) baseContent.menu = supabaseMenu;
                    applyContent(baseContent);
                });
            });
    });

    DEFAULTS.stats = [
        {count:103,label:'Total Dishes'},
        {count:0,label:'Happy Customers'},
        {count:0,label:'Expert Chefs'}
    ];
    DEFAULTS.opening = { videoUrl: 'video/mayor welcoming video.mp4', hideAfter: '' };
    DEFAULTS.reservation = { tag:'Reserve a Table', title:'Reserve Your', titleGold:'Table', desc:"Whether it's a date night, family gathering or special celebration — we're here to make it truly memorable." };
    DEFAULTS.contact.address = '43 Kingsley Road, Hounslow, London, TW3 1PA';
    DEFAULTS.contact.mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.593!2d-0.3580133!3d51.4722309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760d00575f94db%3A0x374941cb29fce285!2sThe%20Royal%20Chilli!5e0!3m2!1sen!2suk!4v1718000000000!5m2!1sen!2suk';
    DEFAULTS.contact.social = { facebook:'#', instagram:'https://www.instagram.com/the_royal_chilli?igsh=MW12MTVzY2p0ZmUycw==', twitter:'#' };
    DEFAULTS.footer = { tagline:'Bringing the rich flavours and warmth of authentic Indian cuisine to the heart of London.', copyright:'© 2026 The Royal Chilli. All rights reserved.' };

    window.RC_CONTENT = { STORAGE_KEY: STORAGE_KEY, DEFAULTS: DEFAULTS };
})();
