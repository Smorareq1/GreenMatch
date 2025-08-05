document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        currentSection: 'home', // 'home', 'quiz', 'products', 'result'
        answers: {
            location: '',
            values: '',
            commitment: ''
        },
        matchedProduct: null,
    };

    // --- DATA ---
    const products = [
        {
            id: 'solid-shampoo', name: 'Organic Solid Shampoo Bar', image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Perfect for your personal care routine! This zero-waste shampoo bar is gentle on your hair and the environment, lasting up to 80 washes.', benefit: 'Reduces plastic waste by 90%',
            criteria: { values: ['Personal care'], commitment: ['Sometimes', 'Always'] }
        },
        {
            id: 'solar-panel', name: 'Portable Solar Power Bank', image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Harness the power of the sun! This compact solar charger keeps your devices powered while reducing your carbon footprint.', benefit: 'Saves up to 50% on energy costs',
            criteria: { values: ['Energy saving'], commitment: ['Always'] }
        },
        {
            id: 'bamboo-cutlery', name: 'Bamboo Travel Cutlery Set', image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Your eco-friendly cooking companion! This stylish bamboo cutlery set is perfect for meals on the go and reduces single-use plastic.', benefit: 'Eliminates 200+ plastic utensils per year',
            criteria: { values: ['Eco-friendly cooking'], location: ['City', 'Beach'] }
        },
        {
            id: 'glass-water-bottle', name: 'Insulated Glass Water Bottle', image: 'https://images.pexels.com/photos/3094035/pexels-photo-3094035.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Stay hydrated sustainably! This beautiful glass bottle keeps drinks at perfect temperature while eliminating plastic bottle waste.', benefit: 'Prevents 300+ plastic bottles yearly',
            criteria: { location: ['City', 'Beach'], commitment: ['Sometimes', 'Always'] }
        },
        {
            id: 'bamboo-toothbrush', name: 'Biodegradable Bamboo Toothbrush', image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Start your day the green way! This bamboo toothbrush provides excellent oral care while being completely biodegradable.', benefit: 'Improves oral health naturally',
            criteria: { values: ['Personal care'], location: ['Countryside'] }
        },
        {
            id: 'reusable-bags', name: 'Organic Cotton Shopping Bags', image: 'https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Shop consciously! These durable cotton bags are perfect for all your shopping needs and can carry up to 40 pounds.', benefit: 'Replaces 500+ plastic bags',
            criteria: { commitment: ['Never', 'Sometimes'], location: ['City', 'Countryside'] }
        },
        {
            id: 'eco-lunch-box', name: 'Stainless Steel Lunch Container', image: 'https://images.pexels.com/photos/4226879/pexels-photo-4226879.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Perfect for your eco-friendly cooking lifestyle! This leak-proof container keeps food fresh and eliminates disposable packaging.', benefit: 'Reduces food packaging waste',
            criteria: { values: ['Eco-friendly cooking'], location: ['Countryside'] }
        },
        {
            id: 'led-bulbs', name: 'Smart LED Light Bulbs', image: 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Illuminate your energy-saving journey! These smart LED bulbs use 75% less energy and last 25 times longer than traditional bulbs.', benefit: 'Cuts electricity bills by 75%',
            criteria: { values: ['Energy saving'], commitment: ['Sometimes'] }
        }
    ];

    const getMatchingProduct = (answers) => {
        const matchingProducts = products.filter(product => {
            let score = 0;
            if (product.criteria.location?.includes(answers.location)) score += 2;
            if (product.criteria.values?.includes(answers.values)) score += 3;
            if (product.criteria.commitment?.includes(answers.commitment)) score += 1;
            return score > 0;
        });

        if (matchingProducts.length > 0) {
            return matchingProducts.sort((a, b) => {
                let scoreA = 0, scoreB = 0;
                if (a.criteria.location?.includes(answers.location)) scoreA += 2;
                if (a.criteria.values?.includes(answers.values)) scoreA += 3;
                if (a.criteria.commitment?.includes(answers.commitment)) scoreA += 1;
                if (b.criteria.location?.includes(answers.location)) scoreB += 2;
                if (b.criteria.values?.includes(answers.values)) scoreB += 3;
                if (b.criteria.commitment?.includes(answers.commitment)) scoreB += 1;
                return scoreB - scoreA;
            })[0];
        }
        return products[Math.floor(Math.random() * products.length)]; // Fallback a producto aleatorio
    };


    // --- TEMPLATE/COMPONENT FUNCTIONS ---

    const createHeaderHTML = () => `
        <header class="header">
            <div class="max-w-7xl container">
                <div class="logo" data-section="home">
                    <div class="logo-icon-wrapper"><i data-lucide="leaf"></i></div>
                    <span class="logo-text">GreenMatch</span>
                </div>
                <nav class="nav">
                    <button class="nav-button ${state.currentSection === 'home' ? 'active' : ''}" data-section="home">Home</button>
                    <button class="nav-button ${state.currentSection === 'quiz' ? 'active' : ''}" data-section="quiz">Quiz</button>
                    <button class="nav-button ${state.currentSection === 'products' ? 'active' : ''}" data-section="products">Products</button>
                </nav>
                <div class="header-actions">
                    <button><i data-lucide="search"></i></button>
                    <button><i data-lucide="shopping-bag"></i></button>
                </div>
            </div>
        </header>
    `;

    const createHeroSectionHTML = () => `
        <section class="hero-section">
            <div class="max-w-7xl">
                <div class="hero-main-grid">
                    <div class="hero-content">
                        <div class="hero-badge"><i data-lucide="sparkles" style="width:1rem;height:1rem;"></i> Sustainable Living Made Simple</div>
                        <h1 class="hero-title">Discover Your Perfect <span class="highlight">Eco-Friendly Match</span></h1>
                        <p class="hero-description">Transform your lifestyle with carefully curated sustainable products. Take our personalized quiz and find eco-friendly solutions that fit your unique needs.</p>
                        <div class="hero-cta-buttons">
                            <button class="btn-primary" id="start-quiz-btn"><i data-lucide="arrow-right" style="width:1.25rem;height:1.25rem;"></i> Take the Quiz</button>
                            <button class="btn-secondary" id="view-products-btn">Browse Products</button>
                        </div>
                        <div class="hero-stats">
                            <div><div class="stat-number">500+</div><div class="stat-label">Happy Customers</div></div>
                            <div><div class="stat-number">50+</div><div class="stat-label">Eco Products</div></div>
                            <div><div class="stat-number">100%</div><div class="stat-label">Sustainable</div></div>
                        </div>
                    </div>
                    <div class="hero-visual">
                         <div class="visual-main-card">
                            <div class="visual-grid">
                                <div class="visual-item green"><div class="visual-icon-wrapper green"><i data-lucide="leaf" class="icon-green"></i></div><h3>Eco-Friendly</h3></div>
                                <div class="visual-item blue"><div class="visual-icon-wrapper blue"><i data-lucide="heart" class="icon-blue"></i></div><h3>Health Focused</h3></div>
                            </div>
                            <div class="visual-item gray"><div class="visual-icon-wrapper gray"><i data-lucide="shield" class="icon-gray"></i></div><h3>Quality Guaranteed</h3></div>
                         </div>
                         <div class="floating-element floating-1"><i data-lucide="sparkles"></i></div>
                         <div class="floating-element floating-2"><i data-lucide="leaf"></i></div>
                    </div>
                </div>
            </div>
        </section>
    `;

    const createProductCatalogHTML = () => {
        const productCards = products.map(p => `
            <div class="product-card">
                <div class="product-image-wrapper"><img src="${p.image}" alt="${p.name}" class="product-image"></div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <p class="product-description">${p.description}</p>
                    <div class="product-benefit-badge"><i data-lucide="leaf" style="width:0.75rem;height:0.75rem;"></i> ${p.benefit}</div>
                    <div class="product-rating">
                        ${[...Array(5)].map(() => `<i data-lucide="star" class="star"></i>`).join('')}
                        <span style="font-size:0.875rem;color:var(--color-gray-500);margin-left:0.25rem;">(4.8)</span>
                    </div>
                    <div class="product-price-section">
                        <div class="product-price">$${(Math.random() * 30 + 10).toFixed(2)}</div>
                        <button class="add-to-cart-btn"><i data-lucide="shopping-cart" style="width:1rem;height:1rem;"></i></button>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <section class="product-catalog">
                <div class="max-w-7xl">
                    <div class="catalog-header">
                        <div class="catalog-badge"><i data-lucide="leaf" style="width:1rem;height:1rem;"></i> Sustainable Products</div>
                        <h2 class="catalog-title">Our Eco-Friendly Collection</h2>
                        <p class="catalog-description">Discover our carefully curated selection of sustainable products designed to help you live more consciously.</p>
                    </div>
                    <div class="product-grid">${productCards}</div>
                    <div class="view-all-btn-wrapper"><button class="view-all-btn">View All Products</button></div>
                </div>
            </section>
        `;
    };

    const createFooterHTML = () => `
        <footer class="footer">
            <div class="max-w-7xl">
                <div class="footer-grid">
                    <div class="footer-brand-col">
                        <div class="logo"><div class="logo-icon-wrapper"><i data-lucide="leaf"></i></div><span class="logo-text">GreenMatch</span></div>
                        <p class="footer-description">Your trusted partner in sustainable living. We help you discover eco-friendly products that match your lifestyle and values.</p>
                        <div class="social-links">
                            <a href="#" class="social-link"><i data-lucide="facebook"></i></a>
                            <a href="#" class="social-link"><i data-lucide="twitter"></i></a>
                            <a href="#" class="social-link"><i data-lucide="instagram"></i></a>
                            <a href="#" class="social-link"><i data-lucide="youtube"></i></a>
                        </div>
                    </div>
                    <div>
                        <h3 class="footer-heading">Quick Links</h3>
                        <ul class="footer-links">
                           <li><a href="#">About Us</a></li><li><a href="#">Take Quiz</a></li><li><a href="#">Products</a></li><li><a href="#">Blog</a></li><li><a href="#">Sustainability</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="footer-heading">Customer Service</h3>
                        <ul class="footer-links">
                            <li><a href="#">Help Center</a></li><li><a href="#">Shipping Info</a></li><li><a href="#">Returns</a></li><li><a href="#">Size Guide</a></li><li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="footer-heading">Get in Touch</h3>
                        <div class="contact-item"><i data-lucide="mail"></i><span>hello@greenmatch.com</span></div>
                        <div class="contact-item"><i data-lucide="phone"></i><span>+1 (555) 123-4567</span></div>
                        <div class="contact-item"><i data-lucide="map-pin"></i><span>San Francisco, CA</span></div>
                        <div class="newsletter-form">
                            <h4>Stay Updated</h4>
                            <div class="newsletter-input-group">
                                <input type="email" placeholder="Your email" class="newsletter-input"/>
                                <button class="newsletter-submit">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom-bar">
                    <p class="copyright">© ${new Date().getFullYear()} GreenMatch. All rights reserved.</p>
                    <div class="footer-legal-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookie Policy</a></div>
                </div>
            </div>
        </footer>
    `;

    const createQuizScreenHTML = () => {
        const questions = [
            { id: 'location', icon: 'map-pin', question: 'Where do you live?', options: ['City', 'Countryside', 'Beach'] },
            { id: 'values', icon: 'heart', question: 'What do you value most in your daily life?', options: ['Personal care', 'Eco-friendly cooking', 'Energy saving'] },
            { id: 'commitment', icon: 'target', question: 'How committed are you to sustainable consumption?', options: ['Never', 'Sometimes', 'Always'] }
        ];

        const questionsHTML = questions.map(q => `
            <div class="question-card" data-question-id="${q.id}">
                <div class="question-title-wrapper">
                    <div class="icon-wrapper"><i data-lucide="${q.icon}"></i></div>
                    <h3>${q.question}</h3>
                </div>
                <div class="options-grid">
                    ${q.options.map(opt => `<button class="option-btn" data-answer="${opt}">${opt}</button>`).join('')}
                </div>
            </div>
        `).join('');

        const isComplete = state.answers.location && state.answers.values && state.answers.commitment;

        return `
            <main class="quiz-screen">
                <div class="quiz-container">
                    <div class="quiz-header">
                        <div class="icon-wrapper"><i data-lucide="leaf"></i></div>
                        <h1>Discover your GreenMatch 🌱</h1>
                        <p>Answer three quick questions and find the eco-friendly product that's perfect for you.</p>
                    </div>
                    <div class="quiz-questions-container">${questionsHTML}</div>
                    <div class="quiz-submit-wrapper">
                        <button class="quiz-submit-btn" id="submit-quiz-btn" ${!isComplete ? 'disabled' : ''}>Find My GreenMatch</button>
                    </div>
                </div>
            </main>
        `;
    };

    const createResultScreenHTML = () => {
        const p = state.matchedProduct;
        if (!p) return '';
        return `
            <main class="result-screen">
                <div class="result-container">
                    <div class="result-header">
                        <div class="icon-wrapper"><i data-lucide="sparkles"></i></div>
                        <h1>Your Perfect GreenMatch!</h1>
                        <p>Here's what we found for you</p>
                    </div>
                    <div class="result-product-card">
                        <div class="result-product-image-wrapper"><img src="${p.image}" alt="${p.name}" class="result-product-image"></div>
                        <div class="result-product-info">
                            <h2>${p.name}</h2>
                            <p>${p.description}</p>
                            <div class="benefit-badge"><i data-lucide="leaf" style="width:1rem;height:1rem;"></i><span>${p.benefit}</span></div>
                        </div>
                    </div>
                    <div class="motivational-message">
                        <div class="message-box"><p>"Remember, every small change counts. Together we can care for the planet, step by step."</p></div>
                    </div>
                    <div class="try-again-wrapper">
                        <button class="try-again-btn" id="try-again-btn"><i data-lucide="rotate-ccw" style="width:1rem;height:1rem;"></i> Try Again</button>
                    </div>
                </div>
            </main>
        `;
    }

    // --- RENDER & EVENT LISTENERS ---
    const appContainer = document.getElementById('app-container');

    const render = () => {
        window.scrollTo(0, 0);
        let contentHTML = createHeaderHTML();

        switch (state.currentSection) {
            case 'products':
                contentHTML += createProductCatalogHTML() + createFooterHTML();
                break;
            case 'quiz':
                contentHTML += createQuizScreenHTML();
                break;
            case 'result':
                contentHTML += createResultScreenHTML();
                break;
            case 'home':
            default:
                contentHTML += createHeroSectionHTML() + createProductCatalogHTML() + createFooterHTML();
                break;
        }

        appContainer.innerHTML = contentHTML;
        lucide.createIcons();
        attachEventListeners();
    };

    const handleNavigate = (section) => {
        state.currentSection = section;
        render();
    };

    const handleAnswerChange = (questionId, answer) => {
        state.answers[questionId] = answer;

        // Update UI
        const questionCard = document.querySelector(`.question-card[data-question-id="${questionId}"]`);
        questionCard.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        questionCard.querySelector(`.option-btn[data-answer="${answer}"]`).classList.add('selected');

        // Check if quiz is complete to enable submit
        const isComplete = state.answers.location && state.answers.values && state.answers.commitment;
        document.getElementById('submit-quiz-btn').disabled = !isComplete;
    };

    const handleSubmitQuiz = () => {
        state.matchedProduct = getMatchingProduct(state.answers);
        state.currentSection = 'result';
        render();
    };

    const handleTryAgain = () => {
        state.answers = { location: '', values: '', commitment: '' };
        state.matchedProduct = null;
        state.currentSection = 'quiz';
        render();
    };


    function attachEventListeners() {
        // Header navigation
        appContainer.querySelectorAll('.header .logo, .header .nav-button').forEach(el => {
            el.addEventListener('click', (e) => handleNavigate(e.currentTarget.dataset.section));
        });

        // Hero buttons
        const startQuizBtn = document.getElementById('start-quiz-btn');
        if (startQuizBtn) startQuizBtn.addEventListener('click', () => handleNavigate('quiz'));

        const viewProductsBtn = document.getElementById('view-products-btn');
        if (viewProductsBtn) viewProductsBtn.addEventListener('click', () => handleNavigate('products'));

        // Quiz buttons
        appContainer.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const questionId = e.currentTarget.closest('.question-card').dataset.questionId;
                const answer = e.currentTarget.dataset.answer;
                handleAnswerChange(questionId, answer);
            });
        });

        const submitQuizBtn = document.getElementById('submit-quiz-btn');
        if (submitQuizBtn) submitQuizBtn.addEventListener('click', handleSubmitQuiz);

        // Result button
        const tryAgainBtn = document.getElementById('try-again-btn');
        if (tryAgainBtn) tryAgainBtn.addEventListener('click', handleTryAgain);
    }

    // Initial Render
    render();
});