
    document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
    currentSection: 'home',
    answers: { location: '', values: '', commitment: '' },
    matchedProduct: null,
};

    // --- DATA ---
    const products = [
{
    id: 'solid-shampoo', name: 'Organic Solid Shampoo Bar',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Perfect for your personal care routine! This zero-waste shampoo bar is gentle on your hair and the environment, lasting up to 80 washes.',
    benefit: 'Reduces plastic waste by 90%',
    criteria: { values: ['Personal care'], commitment: ['Sometimes', 'Always'] }
},
{
    id: 'solar-panel', name: 'Portable Solar Power Bank',
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Harness the power of the sun! This compact solar charger keeps your devices powered while reducing your carbon footprint.',
    benefit: 'Saves up to 50% on energy costs',
    criteria: { values: ['Energy saving'], commitment: ['Always'] }
},
{
    id: 'bamboo-cutlery', name: 'Bamboo Travel Cutlery Set',
    image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Your eco-friendly cooking companion! This stylish bamboo cutlery set is perfect for meals on the go and reduces single-use plastic.',
    benefit: 'Eliminates 200+ plastic utensils per year',
    criteria: { values: ['Eco-friendly cooking'], location: ['City', 'Beach'] }
},
{
    id: 'glass-water-bottle', name: 'Insulated Glass Water Bottle',
    image: 'https://images.pexels.com/photos/3094035/pexels-photo-3094035.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Stay hydrated sustainably! This beautiful glass bottle keeps drinks at perfect temperature while eliminating plastic bottle waste.',
    benefit: 'Prevents 300+ plastic bottles yearly',
    criteria: { location: ['City', 'Beach'], commitment: ['Sometimes', 'Always'] }
},
{
    id: 'bamboo-toothbrush', name: 'Biodegradable Bamboo Toothbrush',
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Start your day the green way! This bamboo toothbrush provides excellent oral care while being completely biodegradable.',
    benefit: 'Improves oral health naturally',
    criteria: { values: ['Personal care'], location: ['Countryside'] }
},
{
    id: 'reusable-bags', name: 'Organic Cotton Shopping Bags',
    image: 'https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Shop consciously! These durable cotton bags are perfect for all your shopping needs and can carry up to 40 pounds.',
    benefit: 'Replaces 500+ plastic bags',
    criteria: { commitment: ['Never', 'Sometimes'], location: ['City', 'Countryside'] }
},
{
    id: 'eco-lunch-box', name: 'Stainless Steel Lunch Container',
    image: 'https://images.pexels.com/photos/4226879/pexels-photo-4226879.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Perfect for your eco-friendly cooking lifestyle! This leak-proof container keeps food fresh and eliminates disposable packaging.',
    benefit: 'Reduces food packaging waste',
    criteria: { values: ['Eco-friendly cooking'], location: ['Countryside'] }
},
{
    id: 'led-bulbs', name: 'Smart LED Light Bulbs',
    image: 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    description: 'Illuminate your energy-saving journey! These smart LED bulbs use 75% less energy and last 25 times longer than traditional bulbs.',
    benefit: 'Cuts electricity bills by 75%',
    criteria: { values: ['Energy saving'], commitment: ['Sometimes'] }
}
    ];

    // --- FUNCTIONS ---
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
    return products[Math.floor(Math.random() * products.length)];
};

    const populateProducts = (container, productsToShow = products) => {
    const productCards = productsToShow.map(p => `
                    <div class="product-card">
                        <div class="product-image-wrapper">
                            <img src="${p.image}" alt="${p.name}" class="product-image">
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${p.name}</h3>
                            <p class="product-description">${p.description}</p>
                            <div class="product-benefit-badge">
                                <i data-lucide="leaf" style="width:0.75rem;height:0.75rem;"></i> ${p.benefit}
                            </div>
                            <div class="product-rating">
                                <i data-lucide="star" class="star"></i>
                                <i data-lucide="star" class="star"></i>
                                <i data-lucide="star" class="star"></i>
                                <i data-lucide="star" class="star"></i>
                                <i data-lucide="star" class="star"></i>
                                <span style="font-size:0.875rem;color:var(--color-gray-500);margin-left:0.25rem;">(4.8)</span>
                            </div>
                            <div class="product-price-section">
                                <div class="product-price">${(Math.random() * 30 + 10).toFixed(2)}</div>
                                <button class="add-to-cart-btn">
                                    <i data-lucide="shopping-cart" style="width:1rem;height:1rem;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
    container.innerHTML = productCards;
    lucide.createIcons();
};

    const populateResultProduct = (product) => {
    const container = document.getElementById('result-product-card');
    container.innerHTML = `
                    <div class="result-product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="result-product-image">
                    </div>
                    <div class="result-product-info">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <div class="benefit-badge">
                            <i data-lucide="leaf" style="width:1rem;height:1rem;"></i>
                            <span>${product.benefit}</span>
                        </div>
                    </div>
                `;
    lucide.createIcons();
};

    const showSection = (sectionName) => {
    // Hide all sections
    document.querySelectorAll('#home-section, #products-section, #quiz-section, #result-section').forEach(section => {
    section.classList.add('hidden');
});

    // Show target section
    document.getElementById(`${sectionName}-section`).classList.remove('hidden');

    // Update nav buttons
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    state.currentSection = sectionName;
    window.scrollTo(0, 0);
};

    // --- EVENT LISTENERS ---

    // Navigation
    document.querySelectorAll('[data-section]').forEach(el => {
    el.addEventListener('click', (e) => {
    showSection(e.currentTarget.dataset.section);
});
});

    // Hero buttons
    document.getElementById('start-quiz-btn').addEventListener('click', () => showSection('quiz'));
    document.getElementById('view-products-btn').addEventListener('click', () => showSection('products'));

    // Quiz functionality
    document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
    const questionId = e.currentTarget.closest('.question-card').dataset.questionId;
    const answer = e.currentTarget.dataset.answer;

    state.answers[questionId] = answer;

    // Update UI
    const questionCard = e.currentTarget.closest('.question-card');
    questionCard.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    e.currentTarget.classList.add('selected');

    // Check if quiz is complete
    const isComplete = state.answers.location && state.answers.values && state.answers.commitment;
    document.getElementById('submit-quiz-btn').disabled = !isComplete;
});
});

    document.getElementById('submit-quiz-btn').addEventListener('click', () => {
    state.matchedProduct = getMatchingProduct(state.answers);
    populateResultProduct(state.matchedProduct);
    showSection('result');
});

    document.getElementById('try-again-btn').addEventListener('click', () => {
    state.answers = { location: '', values: '', commitment: '' };
    state.matchedProduct = null;

    // Reset quiz UI
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('submit-quiz-btn').disabled = true;

    showSection('quiz');
});

    // --- INITIALIZATION ---
    populateProducts(document.getElementById('product-grid'), products.slice(0, 4)); // Show first 4 in home
    populateProducts(document.getElementById('all-products-grid'), products); // Show all in products page

    lucide.createIcons();
});