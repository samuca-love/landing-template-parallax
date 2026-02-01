// Next.js (App Router) single-page landing template with clean design + smooth animations
// Drop this file at: app/page.tsx
// Requires: tailwindcss + framer-motion

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import Image from "next/image";


// --- small utilities ---
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

function useMouseParallax(intensity = 18) {
  // Apple-ish: subtle, springy, never too strong.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.9 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy; // -1..1
      mx.set(dx * intensity);
      my.set(dy * intensity);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [intensity, mx, my]);

  return { x: sx, y: sy };
}

// --- UI atoms ---
function Button({
  children,
  variant = 'primary',
  href,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
}) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/0';
  const styles =
    variant === 'primary'
      ? 'bg-white text-zinc-950 hover:scale-[1.02] active:scale-[0.98] focus:ring-white/50'
      : 'bg-white/10 text-white hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98] focus:ring-white/30';

  const Comp: any = href ? 'a' : 'button';
  return (
    <Comp href={href} className={`${base} ${styles}`}>
      {children}
    </Comp>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

// --- main page ---
// --- EXTRA CONVERSION SECTIONS (added) ---
function WhoFor() {
  const items = [
    'Produtores de e‑book, curso e mentoria',
    'Gestores de tráfego que precisam de LP rápida',
    'Agências que querem template reutilizável',
    'Dev / no‑code que quer base premium pronta',
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
      <h2 className="text-2xl font-semibold md:text-3xl">Para quem é este template</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((t) => (
          <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">{t}</div>
        ))}
      </div>
    </section>
  );
}

function WhoNotFor() {
  const items = [
    'Quem não quer editar nenhum texto',
    'Quem procura site institucional complexo',
    'Quem não vai usar produto digital',
    'Quem espera resultado sem oferta clara',
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <h2 className="text-2xl font-semibold md:text-3xl">Para quem não é</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((t) => (
          <div key={t} className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 text-sm text-white/60">{t}</div>
        ))}
      </div>
    </section>
  );
}

function Deliverables() {
  const items = [
    'Template completo Next.js + Tailwind + Motion',
    'Hero com parallax e microinterações',
    'Blocos de conversão prontos',
    'Seção de preço e oferta',
    'FAQ estruturado',
    'Layout responsivo',
    'Versão tema claro (bônus)',
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
      <h2 className="text-2xl font-semibold md:text-3xl">O que você recebe</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">{t}</div>
        ))}
      </div>
    </section>
  );
}

function InstallSteps() {
  const steps = [
    'Baixe o template',
    'Rode npm install',
    'Rode npm run dev',
    'Troque textos e cores',
    'Cole seu link de checkout',
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
      <h2 className="text-2xl font-semibold md:text-3xl">Instalação em 5 minutos</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs text-white/50">Passo {i + 1}</div>
            <div className="mt-2 text-sm text-white/85">{s}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoBlock() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 md:pt-28">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <h2 className="text-2xl font-semibold md:text-3xl">Veja o template em ação</h2>
        <p className="mt-2 text-sm text-white/70">Substitua pelo seu vídeo demo ou VSL.</p>
        <div className="mt-6 aspect-video w-full rounded-2xl border border-white/10 bg-black/40 grid place-items-center text-white/40 text-sm">
          Embed de vídeo aqui
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const scrollY = useScrollY();
  const { x: mx, y: my } = useMouseParallax(14);
  // Navbar fade on scroll (mobile)
const { scrollY: scrollYMotion } = useScroll();
const navOpacity = useTransform(scrollYMotion, [0, 120], [1, 0]);
const navY = useTransform(scrollYMotion, [0, 120], [0, -40]);


  // Scroll parallax transforms
  const heroShift = Math.min(scrollY * 0.35, 48);
  const glowShift = Math.min(scrollY * 0.18, 30);

  // Sticky mobile CTA appears after a bit of scrolling
  const showStickyCta = scrollY > 220;

  // Glass card parallax
  const cardX = useTransform(mx, (v) => v * 0.8);
  const cardY = useTransform(my, (v) => v * 0.8);

  // Background blobs parallax
  const blob1X = useTransform(mx, (v) => v * 1.2);
  const blob1Y = useTransform(my, (v) => v * 0.8);
  const blob2X = useTransform(mx, (v) => v * -0.9);
  const blob2Y = useTransform(my, (v) => v * -0.7);

  const features = useMemo(
    () => [
      {
        title: 'Design clean e premium',
        desc: 'Tipografia forte, espaçamento generoso e foco no produto. Tudo no estilo “menos é mais”.',
      },
      {
        title: 'Animações suaves',
        desc: 'Microinterações e parallax discreto, sem “frenesi”. O usuário sente, mas não se distrai.',
      },
      {
        title: 'Alta conversão',
        desc: 'Seções prontas para prova social, oferta, FAQ e CTA — com hierarquia visual clara.',
      },
      {
        title: 'Fácil de personalizar',
        desc: 'Troque cores, textos e blocos rapidamente. Estrutura preparada para múltiplos produtos.',
      },
    ],
    []
  );

  const faq = useMemo(
    () => [
      {
        q: 'Isso funciona para qualquer produto digital?',
        a: 'Sim. Você só substitui o conteúdo: promessa, benefícios, bônus, preço e depoimentos.',
      },
      {
        q: 'Dá para usar com checkout externo?',
        a: 'Perfeito. O botão de CTA pode apontar para Hotmart, Kiwify, Eduzz ou checkout próprio.',
      },
      {
        q: 'Como eu coloco vídeos e depoimentos?',
        a: 'Troque os cards de prova social por embeds (YouTube/Vimeo) ou prints em grid.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white/20">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          style={{ x: blob1X, y: blob1Y, translateY: glowShift }}
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y, translateY: -glowShift }}
          className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.75))]" />
      </div>

      {/* Navbar */}
      {/* Navbar */}
<motion.header
  style={{ opacity: navOpacity, y: navY }}
  className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/60 backdrop-blur-xl md:opacity-100 md:translate-y-0"
>
  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">


    {/* Logo + marca */}
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-white/10 p-1 backdrop-blur">
        <Image
          src="/logo.png"
          alt="Landing Template"
          width={100}
          height={100}
          className="rounded-lg"
        />
      </div>

      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight">
          Landing Template
        </div>
        <div className="text-xs text-white/60">
          Produtos digitais
        </div>
      </div>
    </div>

    {/* Navegação */}
    <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
      <a className="hover:text-white" href="#beneficios">Benefícios</a>
      <a className="hover:text-white" href="#prova">Prova social</a>
      <a className="hover:text-white" href="#faq">FAQ</a>
    </nav>

    {/* CTAs */}
    <div className="flex items-center gap-3">
      <Button variant="secondary" href="#preco">
        Ver oferta
      </Button>

      <Button href="https://pay.hotmart.com/K104202042G">
        Comprar
      </Button>
    </div>

  </div>
</motion.header>

      {/* Hero */}
    <main className="relative">
        <section className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Tag>Template</Tag>
                <Tag>Parallax suave</Tag>
                <Tag>Conversão</Tag>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl"
              >
                Sua melhor landing page —
                <span className="text-white/70"> clean, rápida e premium.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
              >
                Um template moderno para vender produtos digitais com aparência de software “top de linha”.
                Inclui seções prontas, CTA forte e animações no estilo Apple (sem exagero).
              </motion.p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="https://pay.hotmart.com/K104202042G">Quero essa estrutura</Button>
                <Button variant="secondary" href="#beneficios">Explorar</Button>
                <div className="text-xs text-white/50">Sem dependências pesadas • Performance-first</div>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
                {[
                  { k: '98', v: 'Lighthouse' },
                  { k: '2.1s', v: 'Carregamento' },
                  { k: '3x', v: 'CTA visível' },
                ].map((m) => (
                  <div key={m.v} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold">{m.k}</div>
                    <div className="text-xs text-white/60">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
<motion.div
  style={{ translateY: heroShift }}
  className="relative isolate z-0 overflow-hidden rounded-3xl pb-28 md:pb-0"
  aria-hidden
>
  <motion.div
    style={{ x: cardX, y: cardY }}
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
  >
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold">Dashboard Preview</div>
      <div className="flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
      </div>
    </div>

    {/* Conteúdo */}
    <div className="mt-5 grid gap-4">

      {/* Conversão */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
        <div className="text-xs text-white/60">Conversão</div>
        <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '76%' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-2 rounded-full bg-white"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
          <div className="text-xs text-white/60">Tráfego</div>
          <div className="mt-2 text-xl font-semibold">+32%</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
          <div className="text-xs text-white/60">ROI</div>
          <div className="mt-2 text-xl font-semibold">2.8x</div>
        </div>
      </div>

      {/* Depoimentos */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
        <div className="text-xs text-white/60">Depoimentos</div>
        <div className="mt-3 grid gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/15" />
              <div className="h-3 w-full rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>

    </div>
  </motion.div>

  {/* Glow corrigido */}
  <div className="absolute -inset-8 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.20),transparent_55%)] blur-2xl" />
</motion.div>

          </div>
        </section>

        {/* Features */}
        <section id="beneficios" className="mx-auto max-w-6xl px-6 pt-01 md:pt-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">Benefícios que importam</h2>
              <p className="mt-2 max-w-2xl text-white/70">
                Estrutura enxuta, estética premium e performance. Você foca na oferta; o template faz o resto.
              </p>
            </div>
            <div className="hidden md:block text-sm text-white/60">Troque tudo em minutos</div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-base font-semibold">{f.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <section id="prova" className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold md:text-3xl">Prova social pronta</h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  Substitua por prints, vídeos ou depoimentos reais. O layout já está “redondo”.
                </p>
              </div>
              <div className="text-sm text-white/60">★★★ ★★ (4.9/5)</div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-zinc-950/30 p-6">
                  <div className="text-sm font-semibold">Cliente {i}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    “A página ficou com cara de produto grande. A taxa de cliques subiu e o checkout ficou mais fluido.”
                  </p>
                  <div className="mt-4 text-xs text-white/50">Resultado em 7 dias</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video demo */}
        <section id="demo" className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">Veja o template em ação</h2>
              <p className="mt-2 max-w-xl text-white/70">
                Coloque aqui um vídeo curto (30–60s) mostrando a página, o parallax e a edição no VS Code.
                Vídeos vendem — e ajudam o cliente a visualizar o resultado.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="https://pay.hotmart.com/K104202042G">Quero comprar por R$ 50</Button>
                <Button variant="secondary" href="#instalacao">Como instalar</Button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-lg">
                {[
                  { k: 'Next.js', v: 'App Router' },
                  { k: 'Tailwind', v: 'Clean UI' },
                  { k: 'Motion', v: 'Parallax' },
                ].map((m) => (
                  <div key={m.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">{m.k}</div>
                    <div className="text-xs text-white/60">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/40">
                {/*
                  OPÇÃO 1 (YouTube):
                  - Substitua VIDEO_ID
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title="Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />

                  OPÇÃO 2 (Vimeo):
                  <iframe className="h-full w-full" src="https://player.vimeo.com/video/VIDEO_ID" allow="autoplay; fullscreen; picture-in-picture" />
                */}
                <div className="grid h-full w-full place-items-center text-center px-6">
                  <div>
                    <div className="text-sm font-semibold">Área do vídeo (demo)</div>
                    <div className="mt-2 text-xs text-white/60">
                      Cole um iframe do YouTube/Vimeo aqui
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-white/50">
                Dica: grave um tour rápido mostrando as seções + como trocar textos e o link do checkout.
              </div>
            </div>
          </div>
        </section>

        {/* What you get + audience */}
        <section id="conteudo" className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold md:text-3xl">O que você recebe</h2>
              <p className="mt-2 text-white/70">
                Tudo pronto para você publicar sua landing page hoje.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  'Projeto completo em Next.js (App Router)',
                  'Design clean + parallax suave e microinterações',
                  'Seções: Hero, Benefícios, Prova Social, FAQ e Oferta',
                  'Componentes reutilizáveis (botões, tags, cards)',
                  'Estrutura fácil de personalizar e reaproveitar',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white" />
                    <div className="text-sm text-white/75">{t}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-semibold">Para quem é</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    'Infoprodutores (ebook, curso, mentoria)',
                    'Gestores de tráfego que querem LP premium',
                    'Freelas/Agências que vendem páginas',
                    'Quem quer um layout “cara de software”',
                  ].map((t) => (
                    <div key={t} className="text-sm text-white/75">• {t}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-semibold">Para quem não é</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    'Quem quer “arrastar e soltar” (sem código)',
                    'Quem busca uma página pesada cheia de efeitos',
                    'Quem não vai trocar textos/imagens do template',
                  ].map((t) => (
                    <div key={t} className="text-sm text-white/75">• {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section id="instalacao" className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold md:text-3xl">Instalação em 5 minutos</h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  É literalmente baixar, instalar dependências e rodar.
                </p>
              </div>
              <Button variant="secondary" href="https://pay.hotmart.com/K104202042G">Ver preço</Button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-zinc-950/30 p-6">
                <div className="text-sm font-semibold">1) Instale e rode</div>
                <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/80">
{`npm install
npm run dev`}
                </pre>
                <div className="mt-3 text-xs text-white/60">Abra: http://localhost:3000</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-zinc-950/30 p-6">
                <div className="text-sm font-semibold">2) Edite o conteúdo</div>
                <div className="mt-3 text-sm text-white/75">
                  Troque textos em <span className="text-white">app/page.tsx</span> e aponte o botão
                  <span className="text-white"> Comprar agora</span> para seu checkout.
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/80">
                  Dica: use Ctrl+F e procure por “R$” e “Comprar agora”.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="preco" className="mx-auto max-w-6xl px-6 pt-20 md:pt-28 pb-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">Oferta clara e direta</h2>
              <p className="mt-2 max-w-xl text-white/70">
                Você pode transformar esta seção em “plano único”, “bônus” e “garantia”.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  'Seções essenciais: promessa, benefícios, prova, FAQ, CTA',
                  'Animações suaves (Framer Motion)',
                  'Layout responsivo e tipografia premium',
                  'Base pronta para SEO e performance',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white" />
                    <div className="text-sm text-white/75">{t}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-sm text-white/60">Acesso imediato</div>
                  <div className="mt-2 text-4xl font-semibold">R$ 49,99</div>
                </div>
                <Tag>Garantia 7 dias</Tag>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-white/75">
                <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4">
                  Bônus: versão alternativa com tema claro + seção de vídeo.
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-4">
                  Atualizações: melhorias no layout e componentes.
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="https://pay.hotmart.com/K104202042G">Comprar agora</Button>
                <Button variant="secondary" href="#faq">Tirar dúvidas</Button>
                <div className="text-center text-xs text-white/50">Pagamento seguro • Checkout externo</div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" className="mt-16">
            <h2 className="text-2xl font-semibold md:text-3xl">FAQ</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faq.map((item) => (
                <div key={item.q} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="font-semibold">{item.q}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-white/60">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-white/10 p-1 backdrop-blur">
                  <Image
                    src="/logo.png"
                    alt="Landing Template"
                    width={28}
                    height={28}
                    className="rounded-lg"
                  />
                </div>
                <span>© {new Date().getFullYear()} Landing Template</span>
              </div>
              <div className="flex gap-4">
                <a className="hover:text-white" href="#">Termos</a>
                <a className="hover:text-white" href="#">Privacidade</a>
                <a className="hover:text-white" href="#">Contato</a>
              </div>
              </div>
            </footer>
            </section>
                    {/* Sticky mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={showStickyCta ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-0 right-0 z-[60] md:hidden"
        >
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between gap-3 p-3">
                <div className="min-w-0">
                  <div className="text-xs text-white/60">Template Landing Page</div>
                  <div className="truncate text-sm font-semibold">Parallax suave • Clean • Next.js</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold">
                    R$ 49,99
                  </div>
                  <Button href="https://pay.hotmart.com/K104202042G">Comprar</Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

