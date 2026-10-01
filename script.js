/**
 * R8 MOTORS OFICIAL - SCRIPTS DE INTERATIVIDADE & MOTION
 * Motor de Animação: GSAP 3.12.5 + ScrollTrigger + Lenis Smooth Scroll (Local Vendor)
 * Inclui: Orquestração Hero, Contadores Numéricos, Filtros em Tempo Real,
 * Simulador de Financiamento Sem Entrada, Efeitos 3D e Integração WhatsApp.
 */

const initR8App = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Inicializar Ícones Lucide
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    try {
      window.lucide.createIcons();
    } catch (e) {
      console.warn('Lucide icon init warning:', e);
    }
  }

  // 2. Registrar Plugins GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
      console.warn('GSAP ScrollTrigger register warning:', e);
    }
  }

  // 3. Smooth Scroll com Lenis perfeitamente sincronizado com ScrollTrigger
  let lenisInstance = null;

  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    try {
      lenisInstance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenisInstance.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    } catch (e) {
      console.warn('Lenis init warning:', e);
    }
  }

  // 4. Tela de Inicialização: Velocímetro Digital (0 a 100 km/h) com Logo Centralizada
  const speedoIntro = document.getElementById('speedoIntro');
  let motionSuiteStarted = false;

  const startShowroomExperience = () => {
    if (motionSuiteStarted) return;
    motionSuiteStarted = true;
    initGSAPMotionSuite();
  };

  if (speedoIntro) {
    if (prefersReducedMotion || typeof gsap === 'undefined') {
      speedoIntro.remove();
      startShowroomExperience();
    } else {
      const speedoNumber = document.getElementById('speedoNumber');
      const speedoProgress = document.getElementById('speedoProgress');
      const speedoRpmVal = document.getElementById('speedoRpmVal');
      const speedoRpmFill = document.getElementById('speedoRpmFill');
      const speedoGear = document.getElementById('speedoGear');
      const speedoSkip = document.getElementById('speedoSkip');
      const speedoFlash = document.getElementById('speedoFlash');

      const ARC_LENGTH = 544.54;
      const speedState = { speed: 0, rpm: 800 };
      let finished = false;

      const completeSpeedo = () => {
        if (finished) return;
        finished = true;

        // Flash de aceleração e saída suave
        if (speedoFlash) {
          gsap.to(speedoFlash, {
            opacity: 0.9,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
          });
        }

        gsap.to(speedoIntro, {
          scale: 1.08,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
          onComplete: () => {
            if (speedoIntro && speedoIntro.parentNode) {
              speedoIntro.remove();
            }
            startShowroomExperience();
          }
        });
      };

      // Animação esportiva de aceleração de 0 a 100 km/h
      const speedTween = gsap.to(speedState, {
        speed: 100,
        rpm: 8400,
        duration: 1.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentSpeed = Math.floor(speedState.speed);
          if (speedoNumber) speedoNumber.textContent = currentSpeed;
          
          if (speedoProgress) {
            const offset = ARC_LENGTH - (currentSpeed / 100) * ARC_LENGTH;
            speedoProgress.style.strokeDashoffset = offset;
          }

          if (speedoRpmVal) {
            speedoRpmVal.textContent = `${Math.floor(speedState.rpm).toLocaleString('pt-BR')} RPM`;
          }

          if (speedoRpmFill) {
            const rpmPct = Math.min(100, Math.max(12, (speedState.rpm / 8500) * 100));
            speedoRpmFill.style.width = `${rpmPct}%`;
          }

          if (speedoGear) {
            if (currentSpeed < 25) speedoGear.textContent = 'D1';
            else if (currentSpeed < 55) speedoGear.textContent = 'D2';
            else if (currentSpeed < 85) speedoGear.textContent = 'D3';
            else speedoGear.textContent = 'D4';
          }
        },
        onComplete: () => {
          completeSpeedo();
        }
      });

      // Pular animação via clique no botão, no fundo ou tecla ESC
      const skipSpeedo = () => {
        if (finished) return;
        speedTween.kill();
        completeSpeedo();
      };

      if (speedoSkip) {
        speedoSkip.addEventListener('click', (e) => {
          e.stopPropagation();
          skipSpeedo();
        });
      }

      speedoIntro.addEventListener('click', skipSpeedo);
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') skipSpeedo();
      });

      // Salvaguarda absoluta contra qualquer bloqueio
      setTimeout(() => {
        if (!finished) skipSpeedo();
      }, 2600);
    }
  } else {
    startShowroomExperience();
  }

  // 5. Catálogo de Estoque Dinâmico
  const inventory = [
    {
      id: 1,
      name: 'Fiat Fastback Audace 1.0 Turbo',
      brand: 'Fiat',
      year: '2023/2023',
      km: '18.400 km',
      transmission: 'Automático',
      fuel: 'Flex',
      category: 'suv',
      price: 109900,
      installment: 1980,
      image: 'assets/hero-cars.png',
      badge: 'Destaque Showroom',
      cautelar: '100% Aprovado',
      features: ['Câmbio CVT 7 marchas', 'Painel Digital', 'Câmera de Ré', 'Faróis Full LED', 'Laudo Cautelar Limpo', 'Garantia Motor e Câmbio']
    },
    {
      id: 2,
      name: 'Chery Tiggo 7 Pro 1.6 Turbo GDI',
      brand: 'Chery',
      year: '2022/2023',
      km: '34.000 km',
      transmission: 'Automático',
      fuel: 'Gasolina',
      category: 'suv',
      price: 124900,
      installment: 2290,
      image: 'assets/cars/tiggo7.jpg',
      badge: 'SUV Premium',
      cautelar: '100% Aprovado',
      features: ['Teto Solar Panorâmico', 'Piloto Automático Adaptativo', 'Bancos em Couro Elétricos', 'Câmera 360°', 'Carregador por Indução']
    },
    {
      id: 3,
      name: 'Nissan Kicks Exclusive 1.6 CVT',
      brand: 'Nissan',
      year: '2021/2022',
      km: '41.200 km',
      transmission: 'Automático',
      fuel: 'Flex',
      category: 'suv',
      price: 94900,
      installment: 1790,
      image: 'assets/cars/kicks.jpg',
      badge: 'Sem Entrada',
      cautelar: '100% Aprovado',
      features: ['Sistema de Som Bose nos Encostos', 'Alerta de Colisão Frontal', 'Chave Presencial I-Key', 'Bancos Gravidade Zero']
    },
    {
      id: 4,
      name: 'Jeep Compass Longitude 1.3 T270',
      brand: 'Jeep',
      year: '2022/2022',
      km: '39.800 km',
      transmission: 'Automático',
      fuel: 'Flex',
      category: 'suv',
      price: 129900,
      installment: 2390,
      image: 'assets/cars/compass.jpg',
      badge: 'Pronta Entrega',
      cautelar: '100% Aprovado',
      features: ['Motor Turbo 185cv', 'Central Uconnect 10.1"', 'Ar Dual Zone', 'Sensor de Ponto Cego', 'Rodas Liga Leve 18"']
    },
    {
      id: 5,
      name: 'Fiat Pulse Drive 1.3 Firefly Flex',
      brand: 'Fiat',
      year: '2022/2023',
      km: '28.500 km',
      transmission: 'Automático',
      fuel: 'Flex',
      category: 'hatch',
      price: 82900,
      installment: 1490,
      image: 'assets/hero-cars.png',
      badge: 'Econômico & Moderno',
      cautelar: '100% Aprovado',
      features: ['Central Multimídia Wireless', 'Faróis em LED', 'Controle de Tração TC+', 'Direção Elétrica']
    },
    {
      id: 6,
      name: 'Ford EcoSport Titanium 1.5 AT',
      brand: 'Ford',
      year: '2020/2020',
      km: '52.000 km',
      transmission: 'Automático',
      fuel: 'Flex',
      category: 'suv',
      price: 68900,
      installment: 1290,
      image: 'assets/promo-financiamento.png',
      badge: 'Sem Entrada Fácil',
      cautelar: '100% Aprovado',
      features: ['Teto Solar Elétrico', '7 Airbags', 'Bancos em Couro Claro', 'Sensor de Chuva e Crepuscular', 'Chave Presencial']
    },
    {
      id: 7,
      name: 'Volkswagen Polo Comfortline 200 TSI',
      brand: 'Volkswagen',
      year: '2021/2021',
      km: '48.900 km',
      transmission: 'Automático',
      fuel: 'Flex',
      category: 'hatch',
      price: 76900,
      installment: 1390,
      image: 'assets/promo-garantia.png',
      badge: 'Baixo Consumo',
      cautelar: '100% Aprovado',
      features: ['Motor TSI Turbo', 'VW Play 10"', 'Controle de Estabilidade', 'Volante Multifuncional com Padel Shift']
    },
    {
      id: 8,
      name: 'Toyota Corolla XEi 2.0 Dynamic Force',
      brand: 'Toyota',
      year: '2021/2022',
      km: '46.000 km',
      transmission: 'Automático',
      fuel: 'Flex',
      category: 'sedan',
      price: 119900,
      installment: 2190,
      image: 'assets/cars/compass.jpg',
      badge: 'Confiabilidade Japonesa',
      cautelar: '100% Aprovado',
      features: ['Motor 2.0 177cv', 'Toyota Safety Sense', 'Bancos em Couro', 'Revisto rigorosamente com Laudo Aprovado']
    }
  ];

  const stockGrid = document.getElementById('stockGrid');
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const totalVeiculosCount = document.getElementById('totalVeiculosCount');

  let currentCategory = 'all';
  let currentSearch = '';

  function formatBRL(val) {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  }

  function renderInventory(isInitial = false) {
    if (!stockGrid) return;
    stockGrid.innerHTML = '';

    const filtered = inventory.filter((car) => {
      const matchesSearch = 
        car.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
        car.brand.toLowerCase().includes(currentSearch.toLowerCase()) ||
        car.year.toLowerCase().includes(currentSearch.toLowerCase());

      if (!matchesSearch) return false;

      if (currentCategory === 'all') return true;
      if (currentCategory === 'sem-entrada') return car.installment <= 1800;
      return car.category === currentCategory;
    });

    if (totalVeiculosCount) {
      totalVeiculosCount.textContent = filtered.length;
    }

    if (filtered.length === 0) {
      stockGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--color-bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--color-border-subtle);">
          <p style="color: var(--color-text-muted); font-size: 1.1rem; margin-bottom: 1rem;">Nenhum veículo encontrado com esse critério.</p>
          <button type="button" class="btn btn--brand btn--sm" id="resetFiltersBtn">Limpar Filtros e Ver Todos</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          currentSearch = '';
          if (searchInput) searchInput.value = '';
          filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
          renderInventory();
        });
      }
      return;
    }

    filtered.forEach((car) => {
      const card = document.createElement('article');
      card.className = 'car-card';
      card.innerHTML = `
        <div class="car-card__media">
          <img src="${car.image}" alt="${car.name}" class="car-card__img" loading="lazy" width="400" height="225">
          <div class="car-card__badge-top">
            <span class="badge badge--brand">${car.badge}</span>
          </div>
          <div class="car-card__badge-cautelar">
            <i data-lucide="shield-check" class="icon-xs icon-gold"></i>
            <span>${car.cautelar}</span>
          </div>
        </div>

        <div class="car-card__content">
          <h3 class="car-card__title">${car.name}</h3>

          <div class="car-card__specs">
            <span class="car-card__spec-item"><i data-lucide="calendar" class="icon-xs"></i> ${car.year}</span>
            <span class="car-card__spec-item"><i data-lucide="gauge" class="icon-xs"></i> ${car.km}</span>
            <span class="car-card__spec-item"><i data-lucide="cpu" class="icon-xs"></i> ${car.transmission}</span>
            <span class="car-card__spec-item"><i data-lucide="fuel" class="icon-xs"></i> ${car.fuel}</span>
          </div>

          <div class="car-card__pricing">
            <div class="car-card__price-row">
              <span class="car-card__price-label">À vista</span>
              <span class="car-card__price-value tabular-nums">${formatBRL(car.price)}</span>
            </div>
            <div class="car-card__installment">
              <i data-lucide="sparkles" class="icon-xs"></i>
              <span>Sem entrada a partir de <strong>48x ${formatBRL(car.installment)}</strong></span>
            </div>
          </div>

          <div class="car-card__actions">
            <button type="button" class="btn btn--outline btn--sm" data-action="details" data-id="${car.id}">
              <i data-lucide="eye" class="icon-xs"></i>
              Ver Detalhes
            </button>
            <a href="https://wa.me/551149753270?text=${encodeURIComponent(`Olá! Vi o ${car.name} (${car.year}) por ${formatBRL(car.price)} no site da R8 Motors e gostaria de simular o financiamento sem entrada.`)}" target="_blank" rel="noopener" class="btn btn--brand btn--sm">
              <i data-lucide="message-circle" class="icon-xs"></i>
              WhatsApp
            </a>
          </div>
        </div>
      `;
      stockGrid.appendChild(card);
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons({ root: stockGrid });
      } catch (e) {}
    }

    // Animação de entrada dos cards com GSAP
    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
      const cards = stockGrid.querySelectorAll('.car-card');
      if (isInitial) {
        if (typeof ScrollTrigger !== 'undefined') {
          gsap.fromTo(cards, 
            { opacity: 0, y: 40, scale: 0.96 }, 
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: '#stockGrid',
                start: 'top 85%',
                once: true
              }
            }
          );
        } else {
          gsap.fromTo(cards, 
            { opacity: 0, y: 25 }, 
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' }
          );
        }
      } else {
        // Ao filtrar ou buscar, faz transição cascata imediata
        gsap.fromTo(cards, 
          { opacity: 0, y: 25, scale: 0.97 }, 
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'transform'
          }
        );
      }

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }
  }

  // Render inicial do estoque
  renderInventory(true);

  // Filtros por Categoria
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      renderInventory(false);
    });
  });

  // Busca em Tempo Real com Debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value.trim();
        renderInventory(false);
      }, 150);
    });
  }

  // 6. Simulador Interativo de Financiamento Sem Entrada
  const rangeParcela = document.getElementById('rangeParcela');
  const valorParcelaDisplay = document.getElementById('valorParcelaDisplay');
  const summaryParcelaDisplay = document.getElementById('summaryParcelaDisplay');
  const btnAprovarCreditoWhatsApp = document.getElementById('btnAprovarCreditoWhatsApp');
  const radioPills = document.querySelectorAll('.radio-pill');
  const prazoTabs = document.querySelectorAll('.prazo-tab');

  let selectedParcela = 1890;
  let selectedCategoria = 'SUV';
  let selectedMeses = 48;

  function updateSimuladorLink() {
    const formatParcela = selectedParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    
    if (valorParcelaDisplay) {
      valorParcelaDisplay.textContent = `${formatParcela} /mês`;
    }
    if (summaryParcelaDisplay) {
      summaryParcelaDisplay.textContent = `${selectedMeses}x de ${formatParcela}*`;
    }

    if (btnAprovarCreditoWhatsApp) {
      const message = `Olá equipe R8 Motors! Simulei pelo site oficial uma parcela de ${formatParcela}/mês em ${selectedMeses}x para a categoria ${selectedCategoria} SEM ENTRADA. Como posso aprovar meu crédito?`;
      btnAprovarCreditoWhatsApp.href = `https://wa.me/551149753270?text=${encodeURIComponent(message)}`;
    }

    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
      gsap.fromTo('#summaryParcelaDisplay', 
        { scale: 1.05 }, 
        { scale: 1, duration: 0.2, ease: 'power2.out' }
      );
    }
  }

  if (rangeParcela) {
    rangeParcela.addEventListener('input', (e) => {
      selectedParcela = parseInt(e.target.value, 10);
      updateSimuladorLink();
    });
  }

  radioPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      radioPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedCategoria = pill.dataset.categoria;
      updateSimuladorLink();
    });
  });

  prazoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      prazoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedMeses = parseInt(tab.dataset.meses, 10);
      updateSimuladorLink();
    });
  });

  updateSimuladorLink();

  // 7. Modal de Detalhes do Veículo
  const carModal = document.getElementById('carModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  function openModal(carId) {
    const car = inventory.find(c => c.id === parseInt(carId, 10));
    if (!car) return;

    modalBody.innerHTML = `
      <div class="modal-car">
        <div class="modal-car__img-wrap">
          <img src="${car.image}" alt="${car.name}" class="modal-car__img">
        </div>
        <div class="modal-car__info">
          <div class="modal-car__header">
            <div>
              <span class="badge badge--brand">${car.badge}</span>
              <h3 class="modal-car__title" id="modalTitle">${car.name}</h3>
            </div>
            <div class="modal-car__price-box">
              <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block;">Valor à Vista</span>
              <span class="modal-car__price tabular-nums">${formatBRL(car.price)}</span>
            </div>
          </div>

          <div class="modal-car__specs-grid">
            <div class="modal-car__spec-box">
              <span>Ano Modelo</span>
              <strong>${car.year}</strong>
            </div>
            <div class="modal-car__spec-box">
              <span>Quilometragem</span>
              <strong>${car.km}</strong>
            </div>
            <div class="modal-car__spec-box">
              <span>Câmbio</span>
              <strong>${car.transmission}</strong>
            </div>
            <div class="modal-car__spec-box">
              <span>Combustível</span>
              <strong>${car.fuel}</strong>
            </div>
          </div>

          <div class="modal-car__features-list">
            <h4>Itens e Diferenciais Deste Veículo:</h4>
            <div class="modal-car__chips">
              ${car.features.map(f => `<span class="modal-car__chip"><i data-lucide="check" class="icon-xs icon-brand"></i> ${f}</span>`).join('')}
            </div>
          </div>

          <div class="modal-car__actions">
            <a href="https://wa.me/551149753270?text=${encodeURIComponent(`Olá! Estou interessado no ${car.name} (${car.year}) por ${formatBRL(car.price)} que vi no site da R8 Motors. Gostaria de agendar uma visita e simular sem entrada.`)}" target="_blank" rel="noopener" class="btn btn--brand btn--lg btn--full shadow-glow">
              <i data-lucide="message-circle" class="icon-sm"></i>
              Negociar Este Carro no WhatsApp
            </a>
            <a href="https://maps.google.com/?q=Av.+Martim+Francisco,+1104+-+Vila+Alto+de+Santo+Andre,+Santo+Andre+-+SP" target="_blank" rel="noopener" class="btn btn--outline btn--lg">
              <i data-lucide="map-pin" class="icon-sm"></i>
              Ver no Showroom Físico
            </a>
          </div>
        </div>
      </div>
    `;

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons({ root: modalBody });
      } catch (e) {}
    }

    carModal.classList.add('active');
    carModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
      gsap.fromTo('.modal__overlay', { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo('.modal__container', 
        { scale: 0.92, y: 30, opacity: 0 }, 
        { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
      );
    }
  }

  function closeModal() {
    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
      gsap.to('.modal__container', {
        scale: 0.95,
        y: 20,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          carModal.classList.remove('active');
          carModal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      });
      gsap.to('.modal__overlay', { opacity: 0, duration: 0.25 });
    } else {
      carModal.classList.remove('active');
      carModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('click', (e) => {
    const detailsBtn = e.target.closest('[data-action="details"]');
    if (detailsBtn) {
      const id = detailsBtn.dataset.id;
      openModal(id);
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && carModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 8. Menu Mobile Drawer
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-drawer__link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (menuClose) menuClose.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 9. Formulário de Avaliação de Usado (Trade-in)
  const tradeForm = document.getElementById('tradeForm');
  if (tradeForm) {
    tradeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const model = document.getElementById('carModel').value.trim();
      const year = document.getElementById('carYear').value.trim();
      const km = document.getElementById('carKm').value.trim() || 'Não informada';
      const phone = document.getElementById('clientPhone').value.trim();

      const message = `Olá equipe R8 Motors! Gostaria de uma avaliação para venda/troca do meu veículo:\n\n*Carro:* ${model}\n*Ano:* ${year}\n*Quilometragem:* ${km}\n*Meu Contato:* ${phone}\n\nPoderiam me enviar uma proposta?`;
      const whatsappUrl = `https://wa.me/551149753270?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener');
    });
  }

  // Navbar Scroll Background
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true });

  // 10. SUITE COMPLETA DE ANIMAÇÕES GSAP & SCROLLTRIGGER
  function initGSAPMotionSuite() {
    if (prefersReducedMotion || typeof gsap === 'undefined') return;

    try {
      // --- A. ORQUESTRAÇÃO DE ENTRADA DO HERO SECTION ---
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .fromTo('.hero__badge', 
          { y: -25, opacity: 0, scale: 0.92 }, 
          { y: 0, opacity: 1, scale: 1, duration: 0.65 }
        )
        .fromTo('.hero__title', 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.85, ease: 'power4.out' }, 
          '-=0.4'
        )
        .fromTo('.hero__subtitle', 
          { y: 25, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7 }, 
          '-=0.5'
        )
        .fromTo('.hero__actions .btn', 
          { y: 25, opacity: 0, scale: 0.95 }, 
          { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.6, ease: 'back.out(1.4)' }, 
          '-=0.4'
        )
        .fromTo('.hero__stats .stat-item', 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, 
          '-=0.3'
        );

      // Contadores Numéricos Animados no Hero
      const statValues = document.querySelectorAll('.stat-item__value');
      if (statValues.length >= 2) {
        const counter1 = { val: 0 };
        gsap.to(counter1, {
          val: 1800,
          duration: 2.2,
          ease: 'power2.out',
          delay: 0.2,
          onUpdate: () => {
            statValues[0].textContent = `+${Math.floor(counter1.val).toLocaleString('pt-BR')}`;
          }
        });

        const counter2 = { val: 0 };
        gsap.to(counter2, {
          val: 100,
          duration: 1.8,
          ease: 'power2.out',
          delay: 0.4,
          onUpdate: () => {
            statValues[1].textContent = `${Math.floor(counter2.val)}%`;
          }
        });
      }

      // Entrada Cinemática do Carro no Hero
      heroTl.fromTo('.hero__image-wrapper', 
        { scale: 1.1, opacity: 0, y: 35 }, 
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          onComplete: () => {
            // Efeito de Ignição dos Faróis (Double Flash LED)
            gsap.timeline()
              .to('.hero__headlights-glow', { opacity: 0.95, duration: 0.2, ease: 'power2.inOut' })
              .to('.hero__headlights-glow', { opacity: 0.2, duration: 0.15 })
              .to('.hero__headlights-glow', { opacity: 1, duration: 0.25 })
              .to('.hero__headlights-glow', { opacity: 0.5, duration: 0.8, ease: 'power2.out' });
          }
        }, 
        '-=1.2'
      );

      // Cards Flutuantes de Destaque no Hero
      heroTl.fromTo('.hero__card-floating', 
        { scale: 0.75, opacity: 0, y: 25 }, 
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 0.7, 
          ease: 'back.out(1.7)',
          onComplete: () => {
            gsap.to('.hero__card-floating--left', {
              y: -10,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
            gsap.to('.hero__card-floating--right', {
              y: -12,
              duration: 3.5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 0.4
            });
          }
        }, 
        '-=0.4'
      );

      // Mouse Parallax 3D sutil na imagem do Hero (Desktop)
      const heroVisual = document.querySelector('.hero__visual');
      const heroImgWrapper = document.querySelector('.hero__image-wrapper');
      if (heroVisual && heroImgWrapper && window.innerWidth > 992) {
        heroVisual.addEventListener('mousemove', (e) => {
          const rect = heroVisual.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(heroImgWrapper, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.6,
            ease: 'power1.out',
            transformPerspective: 1000,
          });
        });
        heroVisual.addEventListener('mouseleave', () => {
          gsap.to(heroImgWrapper, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.9,
            ease: 'power2.out',
          });
        });
      }

      if (typeof ScrollTrigger === 'undefined') return;

      // --- B. CABEÇALHOS DE SEÇÃO COM SCROLLTRIGGER ---
      const sectionHeaders = document.querySelectorAll('.section-header, .simulador-card__header');
      sectionHeaders.forEach((header) => {
        gsap.fromTo(header.children, 
          { y: 35, opacity: 0 }, 
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              once: true
            }
          }
        );
      });

      // --- C. SEÇÃO SIMULADOR DE FINANCIAMENTO ---
      gsap.fromTo('.simulador-card', 
        { y: 45, opacity: 0, scale: 0.97 }, 
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#simulador',
            start: 'top 80%',
            once: true
          }
        }
      );

      gsap.fromTo('.simulador-form', 
        { x: -35, opacity: 0 }, 
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.simulador-card__body',
            start: 'top 85%',
            once: true
          }
        }
      );

      gsap.fromTo('.simulador-summary', 
        { x: 35, opacity: 0, scale: 0.96 }, 
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.simulador-card__body',
            start: 'top 85%',
            once: true
          }
        }
      );

      // --- D. BANNERS DE PROCEDÊNCIA & GARANTIA ---
      const promoCards = document.querySelectorAll('.promo-card');
      if (promoCards.length > 0) {
        gsap.fromTo(promoCards, 
          { y: 45, opacity: 0, scale: 0.96 }, 
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#procedencia',
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // --- E. DIFERENCIAIS / PILARES R8 MOTORS ---
      const featureItems = document.querySelectorAll('.feature-item');
      if (featureItems.length > 0) {
        gsap.fromTo(featureItems, 
          { y: 35, opacity: 0 }, 
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.features-grid',
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      // --- F. AVALIAÇÃO / VENDA DE CARRO (TRADE-IN) ---
      const tradeBox = document.querySelector('.trade-box');
      if (tradeBox) {
        gsap.fromTo('.trade-box__text', 
          { x: -35, opacity: 0 }, 
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#avaliacao',
              start: 'top 80%',
              once: true
            }
          }
        );

        gsap.fromTo('.trade-box__steps .step-card', 
          { x: -20, opacity: 0 }, 
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.trade-box__steps',
              start: 'top 85%',
              once: true
            }
          }
        );

        gsap.fromTo('.trade-box__form-card', 
          { x: 35, opacity: 0, scale: 0.97 }, 
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#avaliacao',
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // --- G. LOCALIZAÇÃO & SHOWROOM ---
      const locationSection = document.getElementById('localizacao');
      if (locationSection) {
        gsap.fromTo('.location-card', 
          { x: -35, opacity: 0 }, 
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#localizacao',
              start: 'top 80%',
              once: true
            }
          }
        );

        gsap.fromTo('.location-map', 
          { y: 40, opacity: 0, scale: 0.96 }, 
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#localizacao',
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // --- H. BOTÃO FLUTUANTE DO WHATSAPP COM ENTRADA EM MOLA ---
      const whatsappFloating = document.querySelector('.whatsapp-floating');
      if (whatsappFloating) {
        gsap.set(whatsappFloating, { scale: 0, opacity: 0 });
        let waShown = false;
        window.addEventListener('scroll', () => {
          if (window.scrollY > 280 && !waShown) {
            waShown = true;
            gsap.to(whatsappFloating, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' });
          } else if (window.scrollY <= 280 && waShown) {
            waShown = false;
            gsap.to(whatsappFloating, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
          }
        }, { passive: true });
      }
    } catch (err) {
      console.warn('GSAP motion suite warning:', err);
    }
  }

  // 11. Função Global para links rápidos de categoria no footer
  window.filterBy = function(category) {
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  };
};

// Disparo garantido mesmo se o DOMContentLoaded já tiver ocorrido
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initR8App);
} else {
  initR8App();
}
