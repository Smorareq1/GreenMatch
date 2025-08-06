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
            image: 'images/DesodoranteEcologico.jpg',
            description: 'Fórmula vegana y sin residuos químicos.',
            benefit: 'Tu piel merece conciencia.',
            criteria: { location: 'Ciudad', values: 'Cuidado personal', commitment: 'Siempre' }
        },
        {
            id: 'cepillo-bambu-ciudad', name: 'Cepillo de bambú',
            image: 'images/CepilloBambu.jpg',
            description: 'Reduce el uso de plásticos en tu rutina diaria.',
            benefit: 'Cada cepillada cuenta.',
            criteria: { location: 'Ciudad', values: 'Cuidado personal', commitment: 'Nunca' }
        },
        {
            id: 'shampoo-solido-ciudad', name: 'Shampoo sólido',
            image: 'images/ShampooSolido.jpg',
            description: 'Sin plástico y con ingredientes naturales.',
            benefit: 'Tu cabello también ama al planeta.',
            criteria: { location: 'Ciudad', values: 'Cuidado personal', commitment: 'A veces' }
        },
        {
            id: 'tote-bag-ciudad', name: 'Tote bag reutilizable',
            image: 'images/ToteBag.jpg',
            description: 'Ideal para reemplazar bolsas plásticas al hacer compras.',
            benefit: 'Cada hábito cuenta. Empieza por uno.',
            criteria: { location: 'Ciudad', values: 'Cocina ecológica', 'commitment': 'Nunca' }
        },
        {
            id: 'envases-silicona-ciudad', name: 'Envases de silicona',
            image: 'images/EnvasesSilicona.jpg',
            description: 'Alternativa reutilizable al film plástico.',
            benefit: 'Cuidá lo que comés… y cómo lo guardás.',
            criteria: { location: 'Ciudad', values: 'Cocina ecológica', 'commitment': 'A veces' }
        },
        {
            id: 'filtro-agua-ciudad', name: 'Filtro de agua de carbón',
            image: 'images/FiltroCarbon.jpg',
            description: 'Purifica sin necesidad de botellas plásticas.',
            benefit: 'Tu cocina también puede respirar verde.',
            criteria: { location: 'Ciudad', values: 'Cocina ecológica', 'commitment': 'Siempre' }
        },
        {
            id: 'luz-led-ciudad', name: 'Luz LED portátil',
            image: 'images/LedPortatil.jpg',
            description: 'Consumo eficiente y diseño compacto.',
            benefit: 'Ilumina con intención.',
            criteria: { location: 'Ciudad', values: 'Ahorro de energía', commitment: 'Nunca' }
        },
        {
            id: 'bombilla-led-ciudad', name: 'Bombilla LED inteligente',
            image: 'images/LedInteligente.jpg',
            description: 'Programable y ahorradora.',
            benefit: 'Pequeños cambios, gran ahorro.',
            criteria: { location: 'Ciudad', values: 'Ahorro de energía', commitment: 'A veces' }
        },
        {
            id: 'temporizador-enchufe-ciudad', name: 'Temporizador de enchufes',
            image: 'images/TemporizadorEnchufes.jpg',
            description: 'Controla tu consumo sin esfuerzo.',
            benefit: 'La energía que no usas, también cuenta.',
            criteria: { location: 'Ciudad', values: 'Ahorro de energía', commitment: 'Siempre' }
        },
        // === CAMPO ===
        {
            id: 'jabon-artesanal-campo', name: 'Jabón artesanal',
            image: 'images/JabonArtesanal.jpg',
            description: 'Hecho a mano con ingredientes naturales.',
            benefit: 'Volver a lo esencial.',
            criteria: { location: 'Campo', values: 'Cuidado personal', commitment: 'Nunca' }
        },
        {
            id: 'toallas-desmaquillantes-campo', name: 'Toallas desmaquillantes reutilizables',
            image: 'images/ToallasReutilizables.jpg',
            description: 'Reemplazan miles de descartables.',
            benefit: 'Tu rostro también puede cuidar el planeta.',
            criteria: { location: 'Campo', values: 'Cuidado personal', commitment: 'A veces' }
        },
        {
            id: 'kit-higiene-sostenible-campo', name: 'Kit de higiene sostenible',
            image: 'images/KitSostenible.jpg',
            description: 'Incluye cepillo, shampoo y desodorante sin plástico.',
            benefit: 'Sostenibilidad en cada paso.',
            criteria: { location: 'Campo', values: 'Cuidado personal', commitment: 'Siempre' }
        },
        {
            id: 'cubiertos-bambu-campo', name: 'Cubiertos de bambú',
            image: 'images/CubiertosBambu.jpg',
            description: 'Reutilizables y ligeros para cualquier ocasión.',
            benefit: 'Cocina con conciencia.',
            criteria: { location: 'Campo', values: 'Cocina ecológica', commitment: 'Nunca' }
        },
        {
            id: 'filtro-agua-gravedad-campo', name: 'Filtro de agua por gravedad',
            image: 'images/FiltroGravedad.jpg',
            description: 'Filtra sin electricidad, ideal para áreas rurales.',
            benefit: 'Cuidar el agua es cuidar la vida.',
            criteria: { location: 'Campo', values: 'Cocina ecológica', commitment: 'A veces' }
        },
        {
            id: 'compostera-domestica-campo', name: 'Compostera doméstica',
            image: 'images/ComposteraDomestica.jpg',
            description: 'Convierte residuos orgánicos en abono natural.',
            benefit: 'Tus desechos pueden alimentar la tierra.',
            criteria: { location: 'Campo', values: 'Cocina ecológica', commitment: 'Siempre' }
        },
        {
            id: 'lampara-solar-campo', name: 'Lámpara solar básica',
            image: 'images/LamparaSolar.jpg',
            description: 'Se carga con el sol, ilumina al anochecer.',
            benefit: 'Aprovecha la energía natural.',
            criteria: { location: 'Campo', values: 'Ahorro de energía', commitment: 'Nunca' }
        },
        {
            id: 'panel-solar-portatil-campo', name: 'Panel solar portátil',
            image: 'images/PanelSolar.jpg',
            description: 'Carga dispositivos sin red eléctrica.',
            benefit: 'Energía limpia donde la necesites.',
            criteria: { location: 'Campo', values: 'Ahorro de energía', commitment: 'A veces' }
        },
        {
            id: 'sistema-energia-solar-campo', name: 'Sistema de energía solar autónomo',
            image: 'images/SistemaEnergia.jpg',
            description: 'Para casas o huertas sostenibles.',
            benefit: 'El sol es tu mejor aliado.',
            criteria: { location: 'Campo', values: 'Ahorro de energía', commitment: 'Siempre' }
        },
        // === PLAYA ===
        {
            id: 'protector-solar-playa', name: 'Protector solar biodegradable',
            image: 'images/ProtectorSolar.jpg',
            description: 'Seguro para la piel y para los corales.',
            benefit: 'Cuida tu piel sin dañar el mar.',
            criteria: { location: 'Playa', values: 'Cuidado personal', commitment: 'Nunca' }
        },
        {
            id: 'cepillo-bambu-playa', name: 'Cepillo de bambú compacto',
            image: 'images/CepilloCompacto.jpg',
            description: 'Ideal para viajes o kits personales.',
            benefit: 'Sostenibilidad que va con vos.',
            criteria: { location: 'Playa', values: 'Cuidado personal', commitment: 'A veces' }
        },
        {
            id: 'kit-playa-ecologico-playa', name: 'Kit de playa ecológico',
            image: 'images/KitPlaya.jpg',
            description: 'Incluye protector, jabón y toalla de fibras naturales.',
            benefit: 'Disfruta la arena sin dejar huella.',
            criteria: { location: 'Playa', values: 'Cuidado personal', commitment: 'Siempre' }
        },
        {
            id: 'set-cubiertos-bambu-playa', name: 'Set de cubiertos de bambú',
            image: 'images/SetCubiertos.jpg',
            description: 'Evitá descartables en tus picnics.',
            benefit: 'La playa limpia empieza por tu mochila.',
            criteria: { location: 'Playa', values: 'Cocina ecológica', commitment: 'Nunca' }
        },
        {
            id: 'botella-acero-playa', name: 'Botella de acero',
            image: 'images/BotellaAcero.jpg',
            description: 'Mantiene la temperatura por horas.',
            benefit: 'Cada sorbo cuenta.',
            criteria: { location: 'Playa', values: 'Cocina ecológica', commitment: 'A veces' }
        },
        {
            id: 'kit-picnic-sostenible-playa', name: 'Kit de picnic sustentable',
            image: 'images/KitSostenible.jpg',
            description: 'Incluye platos, cubiertos y servilletas reutilizables.',
            benefit: 'Cada comida puede ser un acto consciente.',
            criteria: { location: 'Playa', values: 'Cocina ecológica', commitment: 'Siempre' }
        },
        {
            id: 'linterna-solar-playa', name: 'Linterna solar',
            image: 'images/LinternaSolar.jpg',
            description: 'Cargá de día, usá de noche.',
            benefit: 'Brilla con energía limpia.',
            criteria: { location: 'Playa', values: 'Ahorro de energía', commitment: 'Nunca' }
        },
        {
            id: 'powerbank-solar-playa', name: 'Powerbank solar',
            image: 'images/PowerBank.jpg',
            description: 'Cargá tu teléfono con energía del sol.',
            benefit: 'La batería verde siempre que necesites.',
            criteria: { location: 'Playa', values: 'Ahorro de energía', commitment: 'A veces' }
        },
        {
            id: 'mini-estacion-solar-playa', name: 'Mini estación solar portátil',
            image: 'images/EstacionSolar.jpg',
            description: 'Ideal para camping o trabajo remoto.',
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