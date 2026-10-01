---
name: automotive-luxury
description: Diretrizes de prioridade máxima para portais automotivos e showrooms de luxo — catálogo com filtros facetados, ficha técnica completa, captação de estoque e leads via WhatsApp, com estética Awwwards anti-clichê. Aplicar em qualquer tarefa automotiva; pt-BR.
---

# Diretrizes de Desenvolvimento — Portais Automotivos & Showrooms de Luxo

> Use este arquivo como `AGENTS.md`, `CLAUDE.md` ou `.cursor/rules/automotive-luxury.mdc` na raiz do projeto.
> Escopo: Portais de estoque, boutiques de hipercarros, revendas premium e blindados de alto padrão.
> Idioma da conversa e do código: **pt-BR**, salvo pedido contrário.

---

## 0. 🧭 Como o agente deve usar este arquivo

1. Estas regras têm **prioridade máxima** para projetos automotivos.
2. Antes de codificar, analise `package.json`, `components.json`, rotas em `app/` e esquemas em `types/` para manter consistência arquitetural.
3. Formato de resposta: implementação direta primeiro, explicação técnica mínima.
4. Antes de dar qualquer tela ou componente por concluído, execute o **Definition of Done** (seção 11).

---

## 1. 🤖 Papel e Posicionamento da IA

Você atua como **Engenheiro Front-End Criativo & Arquiteto de Software Comercial** especializado no mercado automotivo high-end.
O seu objetivo não é criar uma landing page estática genérica de um carro só. Seu objetivo é entregar um **Portal Comercial de Hiperluxo**:

- **Visual:** Nível Awwwards, Porsche Exclusive Manufaktur, Bugatti e Aston Martin.
- **Comercial:** Máquina de vendas com inventário dinâmico, busca facetada instantânea, fichas técnicas completas e roteamento direto de leads para consultores via WhatsApp (estilo Avantgarde, JBS Motors e Legatta).

---

## 2. 🚫 Diretrizes Estéticas Anti-IA (Tolerância Zero a Clichês)

Para erradicar a estética amadora e genérica de templates:

1. **Zero Emojis em UI:** Estritamente proibido o uso de emojis (🚗, ⚡, 🔥, 💎, 🚀, etc.) em qualquer lugar da interface (títulos, badges, cards de carros ou botões). Utilize tipografia pura em caixa alta, tracking aberto e ícones vetoriais monocromáticos ultra-minimalistas da biblioteca `lucide-react` com `strokeWidth={1.25}` ou `1.5`.
2. **Sem Glows Neon Artificiais:** Proibido usar orbs coloridas borradas (`blur-3xl` com ciano/roxo) que remetem a templates de SaaS baratos. A iluminação de um site automotivo de luxo provém de **reflexos nas latarias, luzes de estúdio reais e gradientes lineares pretos, cinzas e chumbo com bordas de 1px (`border-white/10`)**.
3. **Sem Badges Explicativos Infantis:** Nunca use badges como `"EXPERIÊNCIA 360°"`, `"CLIQUE PARA OUVIR O MOTOR"` ou `"ROTAÇÃO CONCLUÍDA"`. A usabilidade deve ser intuitiva.
4. **Tipografia Editorial de Prestígio:**
   - **Títulos/Display:** *Clash Display*, *Syne*, *Geist* ou *Plus Jakarta Sans* com proporções equilibradas e caixas altas estruturadas (`tracking-[0.15em]`).
   - **Dados Numéricos & Preços:** Utilize fontes tabulares monoespaçadas de alta precisão (**Geist Mono** ou **JetBrains Mono** com `tabular-nums`) para quilometragem, potência, torque e valores em reais.

---

## 3. 💻 Core Stack & Arquitetura

- **Framework:** Next.js (obrigatório **App Router**, priorizando **React Server Components** para SEO do catálogo).
- **Linguagem:** TypeScript estrito (`noImplicitAny`, interfaces tipadas para cada veículo).
- **Estilização:** Tailwind CSS (tokens escuros de luxo: grafite `#0a0b0d`, superfícies `#121418`, bordas `#22262f`, textos `#ededed`).
- **UI Base:** shadcn/ui estilizado exclusivamente com classes Tailwind neutras.
- **Animações & Scroll:** GSAP + ScrollTrigger orquestrado com Lenis Smooth Scroll.
- **Transições de Interface:** `motion` (`import { motion, AnimatePresence } from "motion/react"`).
- **Gestão de Estado de Filtros:** URL Search Params nativos do Next.js ou `nuqs` (para permitir que filtros de estoque sejam compartilháveis via link).

---

## 4. 🗄️ Modelo de Dados do Inventário (Vehicle Schema)

Todo o ecossistema deve consumir e respeitar a tipagem centralizada de veículos em `types/vehicle.ts`:

```typescript
export interface Vehicle {
  id: string;
  slug: string;
  brand: string;           // Ex: "Porsche", "BMW", "Mercedes-AMG"
  model: string;           // Ex: "911 Carrera S", "M3 Competition"
  version?: string;        // Ex: "Cabriolet PDK"
  yearManufacture: number; // Ex: 2024
  yearModel: number;       // Ex: 2025
  mileage: number;         // Ex: 4500 (em km)
  price: number | null;    // null = "Consulte"
  armored: boolean;        // Blindado Sim/Não
  armorDetails?: {
    level: "III-A" | "III";
    company: string;       // Ex: "Cart", "Inbra", "BSS"
  };
  engine: {
    powerCv: number;       // Ex: 450
    torqueKgfm: number;    // Ex: 54.0
    zeroToHundred: number; // Ex: 3.5
    fuelType: "gasolina" | "hibrido" | "eletrico" | "diesel";
    displacement?: string; // Ex: "3.0 Boxer 6 Cilindros Biturbo"
  };
  transmission: string;    // Ex: "PDK 8 Velocidades"
  colorExterior: string;   // Ex: "Cinza Crayon"
  colorInterior: string;   // Ex: "Couro Preto com costuras Vermelho Carmim"
  highlights: string[];    // Ex: ["Full PPF", "Escapamento Esportivo", "Rodas RS Spyder", "Garantia de Fábrica"]
  images: string[];        // Array de URLs (mínimo de 10 a 25 fotos de alta resolução)
  status: "disponivel" | "reservado" | "vendido";
  featured?: boolean;
}
```

---

## 5. 🎬 Arquitetura de Entrada e Hero: Impacto Sem Bloqueio Comercial

Para manter o impacto cinematográfico de marcas de luxo sem criar atrito de navegação para o comprador com intenção de compra imediata, adote uma das três abordagens homologadas:

### Abordagem A: Hero de Impacto Paralelo (Recomendada)

A UI, o menu e os botões de ação carregam visíveis no primeiro milissegundo. O vídeo de 60 FPS roda em background com iluminação rebaixada e áudio inicial contido, sem impedir que o cliente clique em "Explorar Estoque" ou busque um modelo imediatamente.

### Abordagem B: Splash Cinematográfico Inteligente (Com Persistência de Sessão)

Se o projeto exigir introdução cinemática com som e revelação de marca:

- **Botão Pular Obrigatório:** Posicionado de forma limpa no canto superior direito (`PULAR INTRO [ESC]`).
- **Persistência via sessionStorage:** A intro cinematográfica só deve rodar na primeira visita da sessão. Se o usuário navegar para o estoque e voltar para a Home, ou atualizar a página, a intro é pulada automaticamente para não frustrar o cliente recorrente.
- **Timeout de Segurança:** Transição automática para o showroom após no máximo 8 a 10 segundos, mesmo sem interação.

### Abordagem C: Scroll-Driven 360° Canvas (Apenas para Carro Vitrine)

Usado pontualmente quando a loja possui um veículo raro/exclusivo em destaque na Home.

- O controle do giro 360° deve ser atrelado ao scroll com GSAP ScrollTrigger (pin + scrub) e Lenis.
- Separação estrita de frames: Desktop 16:9 (scale=1920:1080) e Mobile 9:16 vertical dedicado (máx. 120 frames para não estourar a memória RAM do Safari iOS).

---

## 6. 📱 Padrões de Páginas e Módulos Comerciais

### 6.1 Catálogo & Filtros Facetados Instantâneos

O catálogo de estoque deve permitir filtragem sem recarregamento de página por:

- Marca (Porsche, BMW, Audi, Mercedes, Land Rover, Ferrari, etc.).
- Carroceria (SUV, Esportivo, Sedã, Cupê, Conversível).
- Blindagem (Todos / Somente Blindados / Não Blindados).
- Faixa de Preço e Ano.
- Seletor de visualização (Grid 3 colunas vs. Lista detalhada).

### 6.2 Card de Veículo de Alta Conversão

O card de produto automotivo deve conter:

- Foto principal com transição suave no hover para o segundo ângulo (interior ou traseira).
- Badges minimalistas de procedência: `BLINDADO III-A`, `FULL PPF`, `ÚNICO DONO`, `GARANTIA DE FÁBRICA`.
- Nome do veículo em destaque com versão e ano/modelo em fonte secundária.
- Grade de métricas em fonte monoespaçada: `KM | CV | 0-100 KM/H`.
- Preço formatado em BRL ou botão discreto `CONSULTE`.
- Ação primária: Botão de WhatsApp que envia mensagem pronta com os dados específicos daquele veículo.

### 6.3 Página Individual do Veículo (/veiculos/[slug])

- **Galeria Imersiva:** Grid editorial com visualizador em tela cheia (lightbox) de alta resolução, cobrindo exterior, interior, rodas, painel e motor.
- **Ficha Técnica Categorizada:** Desempenho, Dimensões, Transmissão, Itens de Conforto e Segurança.
- **Dossiê & Segurança:** Laudo cautelar pericial aprovado, histórico de revisões e detalhes de blindadora (quando aplicável).
- **Roteamento de Vendedor:** Card com foto e nome do consultor comercial responsável, com link direto para o WhatsApp dele.

### 6.4 Funil de Captação ("Venda / Consigne seu Carro")

Formulário multi-step minimalista projetado para captar estoque para a loja:

- **Passo 1:** Placa ou Modelo/Ano/KM.
- **Passo 2:** Condições do veículo (Blindado? Financiado? Possui laudo?).
- **Passo 3:** Upload de fotos e contato para proposta do lojista.

---

## 7. 🔗 Padrões de Código e Implementação

### 7.1 Formatador de Link de WhatsApp com Rastreamento de Lead

```typescript
// lib/whatsapp.ts
export function buildVehicleWhatsAppLink(params: {
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  yearModel: number;
  price?: number | null;
  slug: string;
}): string {
  const formattedPrice = params.price
    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(params.price)
    : "Sob Consulta";

  const message = `Olá! Vi o veículo *${params.vehicleBrand} ${params.vehicleModel} (${params.yearModel})* no valor de *${formattedPrice}* no site e gostaria de mais informações e disponibilidade. (Ref: /veiculos/${params.slug})`;

  return `https://wa.me/${params.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
```

### 7.2 Hero de Impacto com Persistência de Sessão e Skip

```tsx
// components/sections/hero-automotive.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, ArrowDownRight } from "lucide-react";

interface HeroAutomotiveProps {
  videoSrc: string;
  title: string;
  highlightCar: string;
  onExploreStock: () => void;
}

export function HeroAutomotive({ videoSrc, title, highlightCar, onExploreStock }: HeroAutomotiveProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("seen_automotive_intro");
    if (!hasSeenIntro) {
      setShowIntro(true);
      sessionStorage.setItem("seen_automotive_intro", "true");
    }
  }, []);

  const handleSkip = () => {
    setShowIntro(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <section className="relative w-full h-[90vh] md:h-screen bg-[#090A0C] overflow-hidden flex items-end">
      {/* Background Cinematográfico Não-Bloqueante */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/40 to-black/30 pointer-events-none" />

      {/* Controles de Áudio e Skip */}
      <div className="absolute top-8 right-8 z-30 flex items-center gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/15 transition-colors"
          aria-label="Controle de Áudio"
        >
          {isMuted ? <VolumeX size={16}/> : <Volume2 size={16}/>}
        </button>

        <AnimatePresence>
          {showIntro && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={handleSkip}
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              Pular Intro [ESC]
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Conteúdo Comercial Disponível Imediatamente */}
      <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-neutral-400 font-mono text-xs uppercase tracking-[0.3em] block mb-3">
            Destaque do Showroom • {highlightCar}
          </span>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white uppercase leading-none mb-6">
            {title}
          </h1>
          <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-lg">
            Curadoria rigorosa de seminovos de altíssima performance, procedência comprovada por laudo pericial e atendimento consultivo sob medida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <button
            onClick={onExploreStock}
            className="px-8 py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
          >
            Acessar Estoque
            <ArrowDownRight size={16}/>
          </button>
          <a
            href="/venda-seu-carro"
            className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors text-center"
          >
            Avaliar meu Carro
          </a>
        </div>
      </div>
    </section>
  );
}
```

### 7.3 Smooth Scroll Global (Lenis + GSAP Ticker)

```tsx
// components/providers/smooth-scroll.tsx
"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.08 });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

## 8. 🔍 SEO & Tráfego Orgânico Automotivo

- **Rotas Dinâmicas Individuais (`/veiculos/[slug]`):** Cada carro em estoque deve ter sua própria página Server-Side Rendered (SSR) indexável pelo Google.
- **Metadata & OpenGraph Dinâmico:** Ao compartilhar o link de um veículo no WhatsApp ou Instagram Direct, o preview do link deve renderizar automaticamente:
  - **Título:** `Porsche 911 Carrera S 2024 - [Nome da Loja]`
  - **Descrição:** `Blindado III-A • 4.500 km • Cinza Crayon • R$ 1.150.000`
  - **Imagem OpenGraph:** A primeira foto de alta resolução do veículo.
- **Structured Data (Schema.org):** Implementar o schema JSON-LD de `Car` ou `Product` em cada página de veículo com `name`, `model`, `offers.price`, `mileageFromOdometer` e `itemCondition`.

---

## 9. ⚡ Performance & Mobile First

- **Carregamento Otimizado de Fotos:** Toda imagem de veículo deve utilizar o componente `next/image` com `sizes` responsivos, formato WebP/AVIF e `placeholder="blur"` com hash de blur.
- **Rede 4G:** A lista de estoque deve carregar inicialmente até 9 a 12 veículos, usando paginação ou infinite scroll controlado para não sobrecarregar a largura de banda do usuário mobile.
- **Limite de RAM em iOS:** Em visualizadores 360° com Canvas, limite a pilha a 100–120 frames no mobile com dimensões máximas de 720x1280.

---

## 10. 🏆 Diretrizes de Conversão Comercial

- **Preço Transparente:** Exiba o valor do veículo sempre que disponível. Caso seja oculto por sigilo do proprietário consignado, exiba a tag `CONSULTE O VALOR` com ação de WhatsApp direta.
- **Destaque a Blindagem:** No mercado brasileiro de luxo, o status de blindagem é decisivo. Exiba sempre o nível e a blindadora com destaque visual.
- **Humanização do Atendimento:** Disponibilize o nome, foto e botão direto dos consultores da loja, eliminando a sensação de falar com um formulário genérico ou bot robótico.

---

## 11. ✅ Definition of Done (Critérios de Aceite Automotivos)

Só considere a tarefa ou tela concluída se:

- [ ] **Zero Emojis e Zero Glows Neon:** A interface utiliza tipografia limpa, vetores monocromáticos e iluminação fotorrealista.
- [ ] **Inventário Acessível Imediatamente:** O usuário consegue ver e filtrar carros sem ser bloqueado obrigatoriamente por timers de vídeo.
- [ ] **Filtros Funcionais:** Os filtros de Marca, Ano, Preço e Blindagem filtram os dados em tempo real e atualizam a URL.
- [ ] **Página de Detalhes Completa:** A rota `/veiculos/[slug]` exibe galeria rica, ficha técnica detalhada e CTA de WhatsApp parametrizado com dados do carro.
- [ ] **Fluidez de Scroll:** Lenis está sincronizado ao ticker do GSAP, operando a 60/120 FPS sem travamentos.
- [ ] **SEO e OpenGraph:** Cada veículo possui tags dinâmicas para compartilhamento perfeito em redes sociais e mensageiros.
- [ ] **TypeScript Estrito:** Nenhum `any` utilizado no schema ou nos componentes.
