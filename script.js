document.addEventListener('DOMContentLoaded', () => {
    // --- GESTIÓN DE ESTADO ---
    const state = {
        currentSection: 'home',
        answers: { location: '', values: '', commitment: '' },
        matchedProduct: null,
    };

    // --- DATOS (Reconstruidos 100% desde tu tabla) ---
    const products = [
        // === CIUDAD ===
        {
            id: 'desodorante-eco-ciudad', name: 'Desodorante ecológico',
            image: 'https://images.pexels.com/photos/7262913/pexels-photo-7262913.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Fórmula vegana y sin residuos químicos para cuidar tu piel y el medio ambiente.',
            benefit: 'Tu piel merece conciencia.',
            criteria: { location: 'Ciudad', values: 'Cuidado personal', commitment: 'Siempre' }
        },
        {
            id: 'cepillo-bambu-ciudad', name: 'Cepillo de bambú',
            image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Un gesto simple que reduce el uso de plásticos en tu rutina diaria. ¡Ideal para la vida urbana!',
            benefit: 'Cada cepillada cuenta.',
            criteria: { location: 'Ciudad', values: 'Cuidado personal', commitment: 'Nunca' }
        },
        {
            id: 'shampoo-solido-ciudad', name: 'Shampoo sólido',
            image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Cuida tu cabello y el planeta con este shampoo sin plásticos y con ingredientes 100% naturales.',
            benefit: 'Tu cabello también ama al planeta.',
            criteria: { location: 'Ciudad', values: 'Cuidado personal', commitment: 'A veces' }
        },
        {
            id: 'tote-bag-ciudad', name: 'Tote bag reutilizable',
            image: 'https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Perfecta para tus compras diarias y para reemplazar las bolsas de plástico. Un pequeño cambio con un gran impacto.',
            benefit: 'Cada hábito cuenta. Empieza por uno.',
            criteria: { location: 'Ciudad', values: 'Cocina ecológica', 'commitment': 'Nunca' }
        },
        {
            id: 'envases-silicona-ciudad', name: 'Envases de silicona',
            image: 'https://images.pexels.com/photos/4226879/pexels-photo-4226879.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Una alternativa reutilizable y duradera al film de plástico para conservar tus alimentos frescos por más tiempo.',
            benefit: 'Lo que comías antes, y cómo lo guardas.',
            criteria: { location: 'Ciudad', values: 'Cocina ecológica', 'commitment': 'A veces' }
        },
        {
            id: 'filtro-agua-ciudad', name: 'Filtro de agua de carbón',
            image: 'https://images.pexels.com/photos/3094035/pexels-photo-3094035.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Purifica el agua del grifo, eliminando la necesidad de comprar botellas de plástico. Agua limpia, planeta limpio.',
            benefit: 'Tu cocina también puede respirar verde.',
            criteria: { location: 'Ciudad', values: 'Cocina ecológica', 'commitment': 'Siempre' }
        },
        {
            id: 'luz-led-ciudad', name: 'Luz LED portátil',
            image: 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Iluminación de bajo consumo y diseño compacto para cualquier rincón de tu hogar. Ahorra energía con estilo.',
            benefit: 'Ilumina con intención.',
            criteria: { location: 'Ciudad', values: 'Ahorro de energía', commitment: 'Nunca' }
        },
        {
            id: 'bombilla-led-ciudad', name: 'Bombilla LED inteligente',
            image: 'https://images.pexels.com/photos/8134931/pexels-photo-8134931.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Programable y ahorradora, te permite controlar la luz y reducir tu consumo eléctrico de forma sencilla.',
            benefit: 'Pequeños cambios, gran ahorro.',
            criteria: { location: 'Ciudad', values: 'Ahorro de energía', commitment: 'A veces' }
        },
        {
            id: 'temporizador-enchufe-ciudad', name: 'Temporizador de enchufes',
            image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Controla el consumo de tus electrodomésticos incluso cuando no estás. Evita el consumo fantasma sin esfuerzo.',
            benefit: 'La energía que no usas, también cuenta.',
            criteria: { location: 'Ciudad', values: 'Ahorro de energía', commitment: 'Siempre' }
        },
        // === CAMPO ===
        {
            id: 'jabon-artesanal-campo', name: 'Jabón artesanal',
            image: 'https://images.pexels.com/photos/4465126/pexels-photo-4465126.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Elaborado a mano con ingredientes naturales que cuidan tu piel y respetan el entorno.',
            benefit: 'Volver a lo esencial.',
            criteria: { location: 'Campo', values: 'Cuidado personal', commitment: 'Nunca' }
        },
        {
            id: 'toallas-desmaquillantes-campo', name: 'Toallas desmaquillantes reutilizables',
            image: 'https://images.pexels.com/photos/7262913/pexels-photo-7262913.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Reemplazan miles de discos de usar y tirar. Suaves con tu piel y amables con el planeta.',
            benefit: 'Tu rostro también puede cuidar el planeta.',
            criteria: { location: 'Campo', values: 'Cuidado personal', commitment: 'A veces' }
        },
        {
            id: 'kit-higiene-sostenible-campo', name: 'Kit de higiene sostenible',
            image: 'https://images.pexels.com/photos/7262995/pexels-photo-7262995.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Un set completo con cepillo, shampoo y desodorante sólido. Todo lo que necesitas para una rutina sin plástico.',
            benefit: 'Sostenibilidad en cada paso.',
            criteria: { location: 'Campo', values: 'Cuidado personal', commitment: 'Siempre' }
        },
        {
            id: 'cubiertos-bambu-campo', name: 'Cubiertos de bambú',
            image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Ligeros, reutilizables y perfectos para cualquier ocasión al aire libre. Di adiós a los cubiertos de plástico.',
            benefit: 'Cocina con conciencia.',
            criteria: { location: 'Campo', values: 'Cocina ecológica', commitment: 'Nunca' }
        },
        {
            id: 'filtro-agua-gravedad-campo', name: 'Filtro de agua por gravedad',
            image: 'https://images.pexels.com/photos/213204/pexels-photo-213204.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Filtra el agua sin necesidad de electricidad. Ideal para áreas rurales y para conectar con la naturaleza.',
            benefit: 'Cuidar el agua es cuidar la vida.',
            criteria: { location: 'Campo', values: 'Cocina ecológica', commitment: 'A veces' }
        },
        {
            id: 'compostera-domestica-campo', name: 'Compostera doméstica',
            image: 'https://images.pexels.com/photos/5029643/pexels-photo-5029643.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Transforma tus residuos orgánicos en abono natural para tus plantas. Cierra el ciclo de la materia.',
            benefit: 'Tus desechos pueden alimentar la tierra.',
            criteria: { location: 'Campo', values: 'Cocina ecológica', commitment: 'Siempre' }
        },
        {
            id: 'lampara-solar-campo', name: 'Lámpara solar básica',
            image: 'https://images.pexels.com/photos/163792/scenery-based-on-the-luminaire-light-desktop-backgrounds-163792.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Se carga con el sol y te ilumina al anochecer. Una solución simple y sostenible para tus noches en el campo.',
            benefit: 'Aprovecha la energía natural.',
            criteria: { location: 'Campo', values: 'Ahorro de energía', commitment: 'Nunca' }
        },
        {
            id: 'panel-solar-portatil-campo', name: 'Panel solar portátil',
            image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Carga tus dispositivos sin necesidad de red eléctrica. La energía del sol, donde la necesites.',
            benefit: 'Energía limpia donde la necesites.',
            criteria: { location: 'Campo', values: 'Ahorro de energía', commitment: 'A veces' }
        },
        {
            id: 'sistema-energia-solar-campo', name: 'Sistema de energía solar autónomo',
            image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Una solución completa para casas o huertas sostenibles. Genera tu propia energía y vive desconectado de la red.',
            benefit: 'El sol es tu mejor aliado.',
            criteria: { location: 'Campo', values: 'Ahorro de energía', commitment: 'Siempre' }
        },
        // === PLAYA ===
        {
            id: 'protector-solar-playa', name: 'Protector solar biodegradable',
            image: 'https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Protege tu piel del sol y los corales del mar. Una fórmula segura para ti y para los océanos.',
            benefit: 'Cuida tu piel sin dañar el mar.',
            criteria: { location: 'Playa', values: 'Cuidado personal', commitment: 'Nunca' }
        },
        {
            id: 'cepillo-bambu-playa', name: 'Cepillo de bambú compacto',
            image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Ideal para tus viajes o para llevar en tu kit de playa. Un básico sostenible que siempre va contigo.',
            benefit: 'Sostenibilidad que va con vos.',
            criteria: { location: 'Playa', values: 'Cuidado personal', commitment: 'A veces' }
        },
        {
            id: 'kit-playa-ecologico-playa', name: 'Kit de playa ecológico',
            image: 'https://images.pexels.com/photos/7262995/pexels-photo-7262995.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Incluye protector solar, jabón en barra y una toalla de fibras naturales. Todo lo que necesitas para un día de playa sin residuos.',
            benefit: 'Disfruta la arena sin dejar huella.',
            criteria: { location: 'Playa', values: 'Cuidado personal', commitment: 'Siempre' }
        },
        {
            id: 'set-cubiertos-bambu-playa', name: 'Set de cubiertos de bambú',
            image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Evita los cubiertos desechables en tus picnics en la playa. Un set práctico y respetuoso con el entorno.',
            benefit: 'La playa limpia empieza por tu mochila.',
            criteria: { location: 'Playa', values: 'Cocina ecológica', commitment: 'Nunca' }
        },
        {
            id: 'botella-acero-playa', name: 'Botella de acero',
            image: 'https://images.pexels.com/photos/3094035/pexels-photo-3094035.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Mantén la temperatura de tus bebidas durante horas, ya sean frías o calientes. Indispensable para un día de playa.',
            benefit: 'Cada sorbo cuenta.',
            criteria: { location: 'Playa', values: 'Cocina ecológica', commitment: 'A veces' }
        },
        {
            id: 'kit-picnic-sostenible-playa', name: 'Kit de picnic sustentable',
            image: 'https://images.pexels.com/photos/4226879/pexels-photo-4226879.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Incluye platos, cubiertos y servilletas reutilizables. Todo lo necesario para un almuerzo en la playa sin generar basura.',
            benefit: 'Cada comida puede ser un acto consciente.',
            criteria: { location: 'Playa', values: 'Cocina ecológica', commitment: 'Siempre' }
        },
        {
            id: 'linterna-solar-playa', name: 'Linterna solar',
            image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Se carga de día para iluminar tus noches. Perfecta para paseos nocturnos por la playa o para tu campamento.',
            benefit: 'Brilla con energía limpia.',
            criteria: { location: 'Playa', values: 'Ahorro de energía', commitment: 'Nunca' }
        },
        {
            id: 'powerbank-solar-playa', name: 'Powerbank solar',
            image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Carga tu teléfono o dispositivos con la energía del sol. No te quedes sin batería mientras disfrutas de la playa.',
            benefit: 'La batería verde siempre que necesites.',
            criteria: { location: 'Playa', values: 'Ahorro de energía', commitment: 'A veces' }
        },
        {
            id: 'mini-estacion-solar-playa', name: 'Mini estación solar portátil',
            image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            description: 'Ideal para camping o trabajo remoto en la playa. Energía limpia y constante para tus dispositivos más importantes.',
            benefit: 'Conectado con la naturaleza, sin enchufes.',
            criteria: { location: 'Playa', values: 'Ahorro de energía', commitment: 'Siempre' }
        }
    ];

    // --- FUNCIONES ---

    // Lógica de match exacta que busca la combinación en el array de productos
    const getMatchingProduct = (answers) => {
        const matched = products.find(product =>
            product.criteria.location === answers.location &&
            product.criteria.values === answers.values &&
            product.criteria.commitment === answers.commitment
        );
        // Si no encuentra una coincidencia (porque alguna combinación no está en la tabla), devuelve un producto aleatorio.
        return matched || products[Math.floor(Math.random() * products.length)];
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
        document.querySelectorAll('#home-section, #products-section, #quiz-section, #result-section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(`${sectionName}-section`).classList.remove('hidden');
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.nav-button[data-section="${sectionName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        state.currentSection = sectionName;
        window.scrollTo(0, 0);
    };

    // --- EVENT LISTENERS ---

    document.querySelectorAll('[data-section]').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.currentTarget.closest('.footer') && e.currentTarget.dataset.section === 'home') {
                window.scrollTo(0, 0);
                return;
            }
            showSection(e.currentTarget.dataset.section);
        });
    });

    document.getElementById('start-quiz-btn').addEventListener('click', () => showSection('quiz'));
    document.getElementById('view-products-btn').addEventListener('click', () => showSection('products'));
    document.querySelector('.view-all-btn').addEventListener('click', () => showSection('products'));

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const questionId = e.currentTarget.closest('.question-card').dataset.questionId;
            const answer = e.currentTarget.dataset.answer;
            state.answers[questionId] = answer;
            const questionCard = e.currentTarget.closest('.question-card');
            questionCard.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
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
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('submit-quiz-btn').disabled = true;
        showSection('quiz');
    });

    // --- INICIALIZACIÓN ---
    populateProducts(document.getElementById('product-grid'), products.slice(0, 4));
    populateProducts(document.getElementById('all-products-grid'), products);
    lucide.createIcons();
});