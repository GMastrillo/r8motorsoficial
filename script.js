/**
 * R8 MOTORS OFICIAL - SCRIPTS DE INTERATIVIDADE & MOTION
 * Inclui: Lenis Smooth Scroll, GSAP, Filtros de Estoque em Tempo Real,
 * Simulador de Financiamento Sem Entrada e Integração Dinâmica com WhatsApp.
 */

const initR8App = () => {
  // 1. Inicializar Ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Smooth Scroll com Lenis (respeitando prefers-reduced-motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenisInstance = null;

  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrar com GSAP ScrollTrigger se disponível
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // 3. Orquestração da Entrada Cinemática (Curtain Reveal)
  const curtain = document.getElementById('cinematicCurtain');
  if (curtain) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      curtain.remove();
    } else {
      let dismissed = false;
      const dismissCurtain = () => {
        if (dismissed) return;
        dismissed = true;
        curtain.classList.add('cinematic-curtain--opening');
        setTimeout(() => {
          if (curtain && curtain.parentNode) {
            curtain.remove();
          }
        }, 750);
      };

      // Abre automaticamente após o efeito de ignição (950ms)
      setTimeout(dismissCurtain, 950);

      // Clique ou tecla ESC para dispensar instantaneamente
      curtain.addEventListener('click', dismissCurtain);
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') dismissCurtain();
      });
    }
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });

  // 4. Catálogo de Estoque Dinâmico (Seminovos e Veículos Periciados da Loja)
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

  function renderInventory() {
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

    if (window.lucide) {
      window.lucide.createIcons({ root: stockGrid });
    }
  }

  renderInventory();

  // Filtros por Categoria
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      renderInventory();
    });
  });

  // Busca em Tempo Real com Debounce Leve
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value.trim();
        renderInventory();
      }, 150);
    });
  }

  // 5. Simulador Interativo de Financiamento Sem Entrada
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

  // 6. Modal de Detalhes do Veículo
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

    if (window.lucide) {
      window.lucide.createIcons({ root: modalBody });
    }

    carModal.classList.add('active');
    carModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    carModal.classList.remove('active');
    carModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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

  // 7. Menu Mobile Drawer
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

  // 8. Formulário de Avaliação de Usado (Trade-in)
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

  // 9. Função Global para links rápidos de categoria no footer
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
