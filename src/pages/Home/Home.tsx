import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code2, Cpu, Zap, ArrowRight, Play, Sliders,
  Shield, Camera, Wrench, Globe, ChevronLeft, ChevronRight, ChevronsDown,
} from 'lucide-react';

import logo4 from '../../assets/logo4.png';

// ─────────────────────────────────────────────────────────────
// HOOK — posición de mouse normalizada [-0.5, 0.5] en un elemento
// ─────────────────────────────────────────────────────────────
function useMouseInEl<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onMove = useCallback((e: React.MouseEvent<T>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mx.set((e.clientX - left - width / 2) / width);
    my.set((e.clientY - top - height / 2) / height);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);
  return { ref, mx, my, onMove, onLeave };
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE DE APARICIÓN MULTIDIRECCIONAL (SCATTERED)
// ─────────────────────────────────────────────────────────────
interface ScatterItemProps {
  active: boolean;
  xOffset?: number;
  yOffset?: number;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

function ScatterItem({ active, xOffset = 0, yOffset = 0, delay = 0, children, className = "" }: ScatterItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: yOffset, scale: 0.95 }}
      animate={active ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: xOffset, y: yOffset, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 90, damping: 14, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// LLUVIA DE CÓDIGO — tarjeta Software (azul cobalto)
// ─────────────────────────────────────────────────────────────
const CODE_SNIPPETS = [
  'const app = express();',
  'app.use(cors({ origin: "*" }));',
  'db.connect({ uri: process.env.DB });',
  'router.get("/api/v1/", handler);',
  'await deploy({ env: "prod" });',
  '<Landing page={Home} seo={true} />',
  'npm run build ✓ 42ms',
  'SELECT * FROM clients WHERE active=1',
  'git push origin main',
  'STATUS 200 OK — uptime 99.9%',
];

function MatrixRain() {
  const [cols, setCols] = useState<{ chars: string; x: number; speed: number; delay: number }[]>([]);
  useEffect(() => {
    setCols(Array.from({ length: 12 }, (_, i) => ({
      chars: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      x: (i / 12) * 100,
      speed: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {cols.map((col, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-[9px] text-accent/50 whitespace-nowrap leading-4"
          style={{ left: `${col.x}%` }}
          animate={{ y: ['-100%', '120%'] }}
          transition={{ duration: col.speed, delay: col.delay, repeat: Infinity, ease: 'linear' }}
        >
          {col.chars.split('').map((c, j) => (
            <div key={j} className="block" style={{ opacity: 0.3 + (j / col.chars.length) * 0.7 }}>
              {c}
            </div>
          ))}
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-5xl font-black text-accent drop-shadow-[0_0_20px_#1E40AF]">&lt;/&gt;</span>
      </motion.div>
    </div>
  );
}

function SoftwareCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative flex flex-col justify-between rounded-3xl border border-card-border bg-card p-7 h-[52vh] cursor-pointer overflow-hidden group shadow-sm"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div key="rain-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/95 z-0">
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} className="absolute inset-0 rounded-3xl border-2 border-accent/50 pointer-events-none z-20" />

      <div className="relative z-10 flex justify-between items-start">
        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-card-border bg-beige text-muted">Software</span>
        <Code2 className={`h-6 w-6 transition-colors duration-300 ${hovered ? 'text-white' : 'text-muted'}`} />
      </div>

      <div className="relative z-10 flex justify-center items-center flex-1">
        <motion.div animate={hovered ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          <div className="w-16 h-16 rounded-2xl bg-beige border border-card-border flex items-center justify-center">
            <Code2 className="h-8 w-8 text-muted" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10">
        <h3 className={`text-xl font-bold uppercase tracking-wide mb-1 transition-colors duration-300 ${hovered ? 'text-white' : 'text-ink'}`}>Software</h3>
        <p className={`text-[11px] leading-relaxed transition-colors duration-300 ${hovered ? 'text-gray-300' : 'text-muted'}`}>Landing pages, sistemas SaaS y e-commerce a medida.</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// TARJETA HARDWARE — parallax 3D + capas
// ─────────────────────────────────────────────────────────────
function HardwareCard() {
  const { ref, mx, my, onMove, onLeave } = useMouseInEl<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);

  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { damping: 20, stiffness: 130 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 130 });
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { damping: 18, stiffness: 120 });
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { damping: 18, stiffness: 120 });
  const fxX  = useSpring(useTransform(mx, [-0.5, 0.5], [10, -10]), { damping: 18, stiffness: 120 });
  const fxY  = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]),  { damping: 18, stiffness: 120 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { onLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative flex flex-col justify-between rounded-3xl border border-card-border bg-card p-7 h-[52vh] cursor-pointer overflow-hidden group [perspective:800px] shadow-sm"
    >
      <motion.div style={{ x: fxX, y: fxY }} className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none" />
      <AnimatePresence>
        {hovered && <motion.div key="glow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 rounded-3xl border-2 border-accent/40 pointer-events-none z-20" />}
      </AnimatePresence>

      <div className="relative z-10 flex justify-between items-start">
        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-card-border bg-beige text-muted">Hardware</span>
        <Cpu className={`h-6 w-6 transition-colors duration-300 ${hovered ? 'text-accent' : 'text-muted'}`} />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center [transform-style:preserve-3d]">
        <motion.div style={{ x: imgX, y: imgY, translateZ: hovered ? 28 : 0 }} className="relative">
          <img src={logo4} alt="Hardware" className="h-32 w-auto object-contain drop-shadow-2xl" style={{ filter: hovered ? 'drop-shadow(0 0 18px rgba(30,64,175,0.4))' : 'none' }} />
          <AnimatePresence>
            {hovered && (
              <>
                <motion.div key="c1" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="absolute -top-3 -right-3 w-6 h-6 rounded-md bg-beige border border-accent/40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-accent/70 animate-pulse" />
                </motion.div>
                <motion.div key="c2" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }} exit={{ opacity: 0, scale: 0 }} className="absolute -bottom-2 -left-3 w-5 h-5 rounded-md bg-beige border border-accent/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-sm bg-accent/50 animate-pulse" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="relative z-10">
        <h3 className={`text-xl font-bold uppercase tracking-wide mb-1 transition-colors duration-300 ${hovered ? 'text-accent' : 'text-ink'}`}>Hardware</h3>
        <p className="text-muted text-[11px] leading-relaxed">Reparaciones, repuestos y accesorios para tus dispositivos.</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// TARJETA ELECTRICIDAD — flicker + cámara sigue el mouse
// ─────────────────────────────────────────────────────────────
function ElectricidadCard() {
  const { ref, mx, my, onMove, onLeave } = useMouseInEl<HTMLDivElement>();
  const [phase, setPhase] = useState<'off' | 'flicker' | 'on'>('off');

  const camX = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { damping: 18, stiffness: 90 });
  const camY = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]),  { damping: 18, stiffness: 90 });

  const enter = () => { setPhase('flicker'); setTimeout(() => setPhase('on'), 800); };
  const leave = () => { setPhase('off'); onLeave(); };
  const FLICKER = [0, 0.7, 0.1, 0.9, 0, 0.6, 0.05, 1];

  return (
    <motion.div
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onMouseMove={onMove}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative flex flex-col justify-between rounded-3xl border border-card-border bg-card p-7 h-[52vh] cursor-pointer overflow-hidden group shadow-sm"
    >
      <motion.div animate={{ opacity: phase === 'off' ? 0.15 : 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-gray-200/50 pointer-events-none z-0" />
      {phase === 'flicker' && (
        <motion.div animate={{ opacity: FLICKER }} transition={{ duration: 0.8, times: [0, .12, .25, .38, .50, .63, .75, 1] }} className="absolute inset-0 bg-accent/5 pointer-events-none z-0" />
      )}
      {phase === 'on' && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.04, 0.10, 0.04] }} transition={{ duration: 2.8, repeat: Infinity }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.10),transparent_65%)] pointer-events-none z-0" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 rounded-3xl border-2 border-accent/40 pointer-events-none z-20" />
        </>
      )}

      <div className="relative z-10 flex justify-between items-start">
        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-card-border bg-beige text-muted">Electricidad</span>
        <motion.div animate={phase === 'on' ? { filter: ['drop-shadow(0 0 4px #1E40AF)', 'drop-shadow(0 0 12px #1E40AF)', 'drop-shadow(0 0 4px #1E40AF)'] } : {}} transition={{ duration: 2, repeat: Infinity }}>
          <Zap className={`h-6 w-6 transition-colors duration-300 ${phase !== 'off' ? 'text-accent' : 'text-muted'}`} />
        </motion.div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="relative">
          <img src={logo4} alt="Electricidad" className="h-32 w-auto object-contain transition-all duration-500" style={{ filter: phase === 'off' ? 'grayscale(40%) brightness(0.85)' : 'grayscale(0%) brightness(1) drop-shadow(0 0 16px rgba(30,64,175,0.3))' }} />
          <AnimatePresence>
            {phase === 'on' && (
              <motion.div key="cam" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} style={{ x: camX, y: camY }} className="absolute -top-6 -right-6 flex items-center gap-1">
                <div className="w-1.5 h-6 bg-gray-400 rounded-sm" />
                <div className="w-12 h-8 bg-gradient-to-r from-gray-200 to-gray-300 border border-gray-300 rounded-lg flex items-center justify-center relative">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                    <motion.div animate={{ scale: [0.7, 0.9, 0.7] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_#1E40AF]" />
                  </div>
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_4px_#1E40AF]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className={`text-xl font-bold uppercase tracking-wide mb-1 transition-colors duration-300 ${phase !== 'off' ? 'text-accent' : 'text-ink'}`}>Electricidad y CCTV</h3>
        <p className="text-muted text-[11px] leading-relaxed">Instalaciones eléctricas, cámaras de seguridad y cableado estructurado.</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PANEL 0 — HERO
// ─────────────────────────────────────────────────────────────
function HeroPanel({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(30,64,175,0.06),transparent)] pointer-events-none" />
      <div className="w-full max-w-6xl flex flex-col gap-7 relative z-10">
        <div className="text-center space-y-3">
          <ScatterItem active={active} yOffset={-60} delay={0.05}>
            <div className="inline-flex items-center gap-2 bg-card border border-card-border rounded-full px-4 py-1.5 text-[10px] font-bold text-accent uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Resolución Técnica 360°
            </div>
          </ScatterItem>
          <ScatterItem active={active} xOffset={-80} delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-extrabold text-ink uppercase tracking-tight leading-none">
              Magno <span className="text-accent">Tech</span>
            </h1>
          </ScatterItem>
          <ScatterItem active={active} xOffset={80} delay={0.15}>
            <p className="text-muted text-sm max-w-lg mx-auto">
              Software · Hardware · Electricidad — todo en un solo lugar.
            </p>
          </ScatterItem>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScatterItem active={active} xOffset={-120} delay={0.2}>
            <SoftwareCard />
          </ScatterItem>
          <ScatterItem active={active} yOffset={120} delay={0.25}>
            <HardwareCard />
          </ScatterItem>
          <ScatterItem active={active} xOffset={120} delay={0.3}>
            <ElectricidadCard />
          </ScatterItem>
        </div>
        <ScatterItem active={active} yOffset={50} delay={0.4} className="flex justify-center">
          <div className="flex flex-col items-center gap-1.5 text-muted text-[10px] uppercase tracking-widest font-semibold">
            <span>Scroll para explorar</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-accent"
            >
              <ChevronsDown className="h-5 w-5" />
            </motion.div>
          </div>
        </ScatterItem>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PANEL 1 — SOFTWARE
// ─────────────────────────────────────────────────────────────
const SW_SLIDES = [
  { num: '01', tag: 'Landing Pages',  title: 'Tu negocio en la web,\nimpecable',    body: 'Páginas de aterrizaje de alto impacto, rápidas y SEO-optimizadas.', badge: 'Desde $299',  link: '/software/web' },
  { num: '02', tag: 'Sistemas SaaS',  title: 'Automatiza tus\noperaciones',          body: 'Plataformas SaaS con paneles administrativos y APIs RESTful escalables.', badge: 'Cloud Ready', link: '/software/saas' },
  { num: '03', tag: 'E-Commerce',     title: 'Vende sin límites\nen línea',           body: 'Tiendas integradas con pasarelas de pago y dashboards en tiempo real.', badge: 'Multi-divisa', link: '/software/web' },
];

function SoftwarePanel({ active, scrollProgress }: { active: boolean; scrollProgress: number }) {
  const op0 = (p: number) => p < 0.28 ? 1 : p < 0.38 ? 1 - (p - 0.28) / 0.10 : 0;
  const op1 = (p: number) => p < 0.28 ? 0 : p < 0.38 ? (p - 0.28) / 0.10 : p < 0.62 ? 1 : p < 0.72 ? 1 - (p - 0.62) / 0.10 : 0;
  const op2 = (p: number) => p < 0.62 ? 0 : p < 0.72 ? (p - 0.62) / 0.10 : 1;

  const slideOpacities = [op0(scrollProgress), op1(scrollProgress), op2(scrollProgress)];
  const activeSlide = scrollProgress < 0.38 ? 0 : scrollProgress < 0.72 ? 1 : 2;

  const mockOp = scrollProgress < 0.12 ? scrollProgress / 0.12 : scrollProgress > 0.88 ? 1 - (scrollProgress - 0.88) / 0.12 : 1;

  const slideDirections = [
    { x: -80, y: 0 },
    { x: 0, y: 80 },
    { x: 80, y: 0 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

        <div className="relative h-[44vh] flex items-center">
          {SW_SLIDES.map((s, i) => {
            const isSlideActive = active && activeSlide === i;
            const dir = slideDirections[i];
            return (
              <div key={i} className="absolute inset-0 flex flex-col justify-center gap-5 text-left transition-opacity duration-300" style={{ opacity: slideOpacities[i], pointerEvents: isSlideActive ? 'auto' : 'none' }}>
                <ScatterItem active={isSlideActive} yOffset={-30} delay={0.05}>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-accent tracking-widest uppercase">{s.num}</span>
                    <div className="h-px w-8 bg-accent/30" />
                    <span className="text-[9px] font-bold text-muted uppercase tracking-widest">{s.tag}</span>
                  </div>
                </ScatterItem>
                <ScatterItem active={isSlideActive} xOffset={dir.x} yOffset={dir.y} delay={0.1}>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight uppercase whitespace-pre-line">{s.title}</h2>
                </ScatterItem>
                <ScatterItem active={isSlideActive} xOffset={-dir.x} yOffset={-dir.y} delay={0.15}>
                  <p className="text-sm text-muted leading-relaxed max-w-sm">{s.body}</p>
                </ScatterItem>
                <ScatterItem active={isSlideActive} yOffset={30} delay={0.2}>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">{s.badge}</span>
                    <Link to={s.link} className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-accent transition-colors group">
                      Ver más <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </ScatterItem>
              </div>
            );
          })}
        </div>

        {/* Mockup laptop */}
        <ScatterItem active={active} xOffset={150} className="flex justify-center items-center">
          <div className="relative w-full max-w-[360px]" style={{ opacity: mockOp }}>
            <div className="bg-white border border-card-border rounded-t-2xl aspect-[16/10] w-full overflow-hidden relative shadow-lg">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-b border-card-border">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="flex-1 bg-gray-100 rounded-full h-4 mx-2 flex items-center px-2">
                  <span className="text-[7px] text-muted font-mono truncate">
                    https://proservicephone.com/{SW_SLIDES[activeSlide].tag.toLowerCase().replace(' ', '-')}
                  </span>
                </div>
              </div>
              <div className="p-4 h-full bg-gradient-to-br from-gray-50 to-white flex flex-col gap-2">
                <div className="w-3/4 h-2.5 bg-gray-200 rounded animate-pulse" />
                <div className="w-1/2 h-2 bg-gray-100 rounded" />
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[0, 1, 2].map(j => (
                    <div key={j} className="aspect-square rounded-lg bg-gray-100 overflow-hidden border border-card-border">
                      <img src={logo4} alt="" className="w-full h-full object-cover object-center opacity-60" />
                    </div>
                  ))}
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="h-1.5 bg-gray-100 rounded w-full" />
                  <div className="h-1.5 bg-gray-100 rounded w-5/6" />
                </div>
                <div className="mt-auto flex gap-2">
                  <div className="h-6 w-20 bg-accent/80 rounded-lg" />
                  <div className="h-6 w-16 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="h-3 w-[108%] -ml-[4%] bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-xl border border-gray-300">
              <div className="mx-auto w-12 h-[2px] bg-gray-500 rounded-b" />
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-8 -right-6 w-20 h-20 drop-shadow-2xl">
              <img src={logo4} alt="" className="w-full h-full object-contain" />
            </motion.div>
          </div>
        </ScatterItem>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PANEL 2 — HARDWARE
// ─────────────────────────────────────────────────────────────
const HW_ITEMS = [
  { label: 'Cambio de pantalla',    sub: 'iPhone 14 Pro Max' },
  { label: 'Batería original',      sub: 'Samsung Galaxy S23' },
  { label: 'Cargador 65W GaN',      sub: 'Universal USB-C' },
  { label: 'Microsoldadura',        sub: 'Placa base dañada' },
  { label: 'Cámara principal',      sub: 'Pixel 7 – Sensor Sony' },
  { label: 'Cristal trasero láser', sub: 'iPhone 13 – Grado A+' },
];

const ScreenCrack = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-gray-400" viewBox="0 0 100 100" preserveAspectRatio="none">
    <circle cx="40" cy="38" r="1.5" fill="#6B7280" />
    <path d="M 40 38 L 3 10"  strokeWidth="1" />
    <path d="M 40 38 L 90 5"  strokeWidth="1.2" />
    <path d="M 40 38 L 96 65" strokeWidth="0.8" />
    <path d="M 40 38 L 28 96" strokeWidth="1.1" />
    <path d="M 40 38 L 5 80"  strokeWidth="0.9" />
    <path d="M 40 38 L 70 90" strokeWidth="0.9" />
    <path d="M 30 28 A 14 14 0 0 1 54 30 A 14 14 0 0 1 46 48 A 14 14 0 0 1 28 43 Z" fill="none" strokeWidth="0.6" strokeDasharray="3 2" />
  </svg>
);

function BeforeAfterSlider({ pos, setPos }: { pos: number; setPos: (v: number) => void }) {
  return (
    <div className="relative w-full max-w-[180px] aspect-[9/18] mx-auto rounded-[28px] border-[5px] border-gray-300 overflow-hidden select-none shadow-xl">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-gray-400 rounded-full z-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white flex flex-col items-center justify-center gap-3 p-4">
        <span className="text-[8px] font-bold text-green-600 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full uppercase">Reparado ✓</span>
        <img src={logo4} alt="" className="h-20 w-auto object-contain drop-shadow-xl" />
        <div className="w-full bg-gray-200 h-1 rounded-full"><div className="bg-green-500 h-full w-full animate-pulse rounded-full" /></div>
        <span className="text-[7px] text-muted font-mono">Pantalla nueva — Grado A+</span>
      </div>
      <div style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }} className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-100 flex flex-col items-center justify-center gap-3 p-4 z-10">
        <span className="text-[8px] font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full uppercase">Dañado</span>
        <div className="relative h-20 flex items-center">
          <img src={logo4} alt="" className="h-20 w-auto object-contain opacity-50 grayscale" />
          <ScreenCrack />
        </div>
        <div className="w-full bg-gray-300 h-1 rounded-full"><div className="bg-red-400 h-full w-1/4 rounded-full" /></div>
        <span className="text-[7px] text-muted font-mono">Cristal dañado — táctil falla</span>
      </div>
      <div style={{ left: `${pos}%` }} className="absolute inset-y-0 w-[2px] bg-accent shadow-[0_0_10px_#1E40AF] z-20 pointer-events-none" />
      <div style={{ left: `${pos}%` }} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-accent border-2 border-white flex items-center justify-center z-20 pointer-events-none shadow-lg">
        <Sliders className="h-3 w-3 text-white" />
      </div>
      <input type="range" min="0" max="100" value={pos} onChange={e => setPos(+e.target.value)} className="absolute inset-0 opacity-0 cursor-ew-resize z-40" />
    </div>
  );
}

function HwCarousel() {
  const [idx, setIdx] = useState(0);
  const total = HW_ITEMS.length;
  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  useEffect(() => {
    const t = setInterval(next, 2800);
    return () => clearInterval(t);
  }, []);

  const visible = [0, 1, 2].map(o => HW_ITEMS[(idx + o) % total]);

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-3 gap-2 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.div key={`${idx}-${i}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, delay: i * 0.05 }}
              className="bg-beige border border-card-border rounded-2xl p-3 flex flex-col items-center gap-2 text-center group hover:border-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white overflow-hidden flex items-center justify-center border border-card-border">
                <img src={logo4} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-ink leading-tight">{item.label}</p>
                <p className="text-[7px] text-muted mt-0.5">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        <button onClick={prev} className="w-6 h-6 rounded-full bg-white hover:bg-accent/10 border border-card-border flex items-center justify-center transition-colors"><ChevronLeft className="h-3 w-3 text-muted" /></button>
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-accent' : 'bg-gray-300'}`} />
        ))}
        <button onClick={next} className="w-6 h-6 rounded-full bg-white hover:bg-accent/10 border border-card-border flex items-center justify-center transition-colors"><ChevronRight className="h-3 w-3 text-muted" /></button>
      </div>
    </div>
  );
}

function HardwarePanel({ active }: { active: boolean }) {
  const [sliderPos, setSliderPos] = useState(50);
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="w-full max-w-6xl flex flex-col gap-5">
        <div className="text-left">
          <ScatterItem active={active} yOffset={-40} delay={0.05}>
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">02 / Hardware</span>
          </ScatterItem>
          <ScatterItem active={active} xOffset={-80} delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink uppercase mt-1">El Laboratorio de <span className="text-accent">Reparaciones</span></h2>
          </ScatterItem>
          <ScatterItem active={active} xOffset={80} delay={0.15}>
            <p className="text-sm text-muted mt-1.5 max-w-lg">Microsoldaduras SMD, cambios de pantalla y repuestos Grado A+.</p>
          </ScatterItem>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[54vh]">

          {/* Video */}
          <ScatterItem active={active} xOffset={-120} delay={0.2} className="lg:col-span-5 h-full">
            <div className="bg-card border border-card-border rounded-3xl p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-accent/25 transition-all duration-300 h-full shadow-sm">
              <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#1E40AF_0.8px,transparent_0.8px)] bg-[size:14px_14px] pointer-events-none" />
              <div>
                <span className="text-[8px] font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">Timelapse · Reparación</span>
                <h3 className="text-base font-bold text-ink mt-2 uppercase">Soldadura y Microelectrónica</h3>
                <p className="text-[10px] text-muted mt-0.5">Placa base, pistas y cambio de ICs.</p>
              </div>
              <div className="flex-1 rounded-2xl bg-gray-50 border border-card-border relative overflow-hidden flex items-center justify-center group/v cursor-pointer min-h-[120px]">
                <img src={logo4} alt="" className="absolute inset-0 w-full h-full object-contain opacity-10 scale-125 blur-sm" />
                <div className="absolute inset-0 bg-white/40" />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="relative">
                    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 border border-accent rounded-full" />
                    <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="absolute inset-[-8px] border border-accent/30 rounded-full" />
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover/v:scale-110 transition-transform shadow-lg shadow-accent/20">
                      <Play className="h-5 w-5 text-white fill-white translate-x-0.5" />
                    </div>
                  </div>
                  <span className="text-[9px] text-muted font-mono">Ver proceso completo</span>
                </div>
                <span className="absolute bottom-2 right-2 text-[7px] font-mono text-muted bg-white/80 px-2 py-0.5 rounded border border-card-border">02:34 · HD</span>
              </div>
            </div>
          </ScatterItem>

          {/* Slider */}
          <ScatterItem active={active} yOffset={120} delay={0.25} className="lg:col-span-3 h-full">
            <div className="bg-card border border-card-border rounded-3xl p-5 flex flex-col gap-3 group hover:border-accent/25 transition-all duration-300 h-full shadow-sm">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-wider text-muted bg-gray-100 border border-card-border px-2.5 py-1 rounded-full">Antes → Después</span>
                <h3 className="text-base font-bold text-ink mt-2 uppercase">Arrastra</h3>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <BeforeAfterSlider pos={sliderPos} setPos={setSliderPos} />
              </div>
            </div>
          </ScatterItem>

          {/* Carrusel */}
          <ScatterItem active={active} xOffset={120} delay={0.3} className="lg:col-span-4 h-full">
            <div className="bg-card border border-card-border rounded-3xl p-5 flex flex-col gap-3 group hover:border-accent/25 transition-all duration-300 h-full justify-between shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-muted bg-gray-100 border border-card-border px-2.5 py-1 rounded-full">Accesorios · Stock</span>
                  <h3 className="text-base font-bold text-ink mt-2 uppercase">Repuestos Grado A+</h3>
                </div>
                <Wrench className="h-4 w-4 text-muted group-hover:text-accent transition-colors mt-1" />
              </div>
              <div className="flex-grow flex flex-col justify-center py-2"><HwCarousel /></div>
              <Link to="/hardware/repuestos" className="w-full flex items-center justify-center gap-2 bg-beige border border-card-border hover:border-accent/30 text-ink text-[10px] font-bold py-2.5 rounded-xl transition-all">
                Ver catálogo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </ScatterItem>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PANEL 3 — ELECTRICIDAD
// ─────────────────────────────────────────────────────────────
const ELEC_ITEMS = [
  { icon: Camera,  title: 'Cámaras IP 4K',          desc: 'Vigilancia 24/7 con visión nocturna y detección IA.' },
  { icon: Zap,     title: 'Tableros Eléctricos',     desc: 'Instalación y mantenimiento normado SEC.' },
  { icon: Shield,  title: 'Control de Acceso',       desc: 'Biometría, tarjetas RFID y cerraduras magnéticas.' },
  { icon: Globe,   title: 'Cableado Estructurado',   desc: 'Redes Cat 6A/7 para oficinas y hogares.' },
  { icon: Wrench,  title: 'Mantenimiento Eléctrico', desc: 'Diagnóstico y reparación de instalaciones.' },
  { icon: Camera,  title: 'DVR / NVR',               desc: 'Sistemas de grabación local y en la nube.' },
];
const ALL_ELEC = [...ELEC_ITEMS, ...ELEC_ITEMS, ...ELEC_ITEMS];

function ElecPhotoCarousel() {
  const [idx, setIdx] = useState(0);
  const PHOTOS = [
    { label: 'Panel eléctrico residencial' },
    { label: 'Cámara CCTV instalada' },
    { label: 'Cableado ordenado categoría 6' },
    { label: 'Tablero industrial trifásico' },
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % PHOTOS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-card-border aspect-video bg-white shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5 }} className="absolute inset-0">
          <img src={logo4} alt="" className="w-full h-full object-contain bg-gray-50 p-4" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white uppercase tracking-wider">{PHOTOS[idx].label}</span>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-2 right-3 flex gap-1">
        {PHOTOS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-accent' : 'bg-white/60'}`} />
        ))}
      </div>
    </div>
  );
}

function ElectricityPanel({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 w-full space-y-7">
        <div className="text-center px-6 space-y-2">
          <ScatterItem active={active} yOffset={-50} delay={0.05}>
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">03 / Electricidad & CCTV</span>
          </ScatterItem>
          <ScatterItem active={active} xOffset={-80} delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink uppercase">Infraestructura que <span className="text-accent">Protege</span></h2>
          </ScatterItem>
          <ScatterItem active={active} xOffset={80} delay={0.15}>
            <p className="text-sm text-muted max-w-md mx-auto">Instalaciones eléctricas normadas y sistemas de videovigilancia para tu hogar o empresa.</p>
          </ScatterItem>
        </div>

        <ScatterItem active={active} yOffset={80} delay={0.2} className="px-6 flex justify-center">
          <ElecPhotoCarousel />
        </ScatterItem>

        <ScatterItem active={active} xOffset={-150} delay={0.25}>
          <div className="relative overflow-hidden border-t border-b border-card-border py-3 bg-white/60 select-none">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-beige to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-beige to-transparent z-10 pointer-events-none" />
            <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
              {ALL_ELEC.map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05, borderColor: 'rgba(30,64,175,0.35)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-[220px] flex-shrink-0 bg-card border border-card-border rounded-2xl p-4 flex flex-col gap-3 text-left group cursor-pointer hover:shadow-md animate-none">
                  <div className="w-8 h-8 rounded-xl bg-beige border border-card-border flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent/30 transition-all">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-ink uppercase group-hover:text-accent transition-colors tracking-wider">{item.title}</h3>
                    <p className="text-[9px] text-muted mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScatterItem>

        <ScatterItem active={active} xOffset={150} delay={0.3} className="flex justify-center gap-4 px-6">
          <Link to="/electricidad/camaras" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shadow-accent/15">
            Ver cámaras <Camera className="h-4 w-4" />
          </Link>
          <Link to="/electricidad/instalaciones" className="inline-flex items-center gap-2 bg-white border border-card-border hover:border-accent/30 text-ink font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm">
            Instalaciones <Zap className="h-4 w-4" />
          </Link>
        </ScatterItem>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTROLADOR PRINCIPAL — crossfade + blur cinematográfico
// ─────────────────────────────────────────────────────────────
const PANEL_SCROLL_HEIGHTS = [1.5, 2.5, 2.0, 1.8];
const TOTAL_HEIGHT = PANEL_SCROLL_HEIGHTS.reduce((a, b) => a + b, 0);

const panelStart = (idx: number) =>
  PANEL_SCROLL_HEIGHTS.slice(0, idx).reduce((a, b) => a + b, 0) / TOTAL_HEIGHT;
const panelEnd   = (idx: number) => panelStart(idx) + PANEL_SCROLL_HEIGHTS[idx] / TOTAL_HEIGHT;

function panelOpacity(progress: number, idx: number): number {
  const start = panelStart(idx);
  const end   = panelEnd(idx);
  const fadeLen = 0.04;

  const fadeInEnd   = start + fadeLen;
  const fadeOutStart = end - fadeLen;

  if (idx === 0) {
    if (progress < fadeOutStart) return 1;
    if (progress < end) return 1 - (progress - fadeOutStart) / fadeLen;
    return 0;
  }

  if (idx === 3) {
    if (progress < start) return 0;
    if (progress < fadeInEnd) return (progress - start) / fadeLen;
    return 1;
  }

  if (progress < start) return 0;
  if (progress < fadeInEnd) return (progress - start) / fadeLen;
  if (progress < fadeOutStart) return 1;
  if (progress < end) return 1 - (progress - fadeOutStart) / fadeLen;
  return 0;
}

function localProgress(progress: number, idx: number): number {
  const start = panelStart(idx);
  const end   = panelEnd(idx);
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] });

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', v => setProgress(v));
  }, [scrollYProgress]);

  const op = [0, 1, 2, 3].map(i => panelOpacity(progress, i));
  const lp = [0, 1, 2, 3].map(i => localProgress(progress, i));

  const blurs = op.map(o => (1 - o) * 18);

  const activeIdx = op.indexOf(Math.max(...op));
  const isPanelActive = (idx: number) => activeIdx === idx && op[idx] > 0.15;

  return (
    <div
      ref={wrapperRef}
      className="relative bg-beige text-ink selection:bg-accent selection:text-white"
      style={{ height: `${TOTAL_HEIGHT * 100}vh` }}
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden bg-beige">

        <div
          className="absolute inset-0 transition-all duration-750 ease-out"
          style={{
            opacity: op[0],
            filter: `blur(${blurs[0]}px)`,
            pointerEvents: op[0] > 0.1 ? 'auto' : 'none',
            willChange: 'opacity, filter',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <HeroPanel active={isPanelActive(0)} />
        </div>

        <div
          className="absolute inset-0 transition-all duration-750 ease-out"
          style={{
            opacity: op[1],
            filter: `blur(${blurs[1]}px)`,
            pointerEvents: op[1] > 0.1 ? 'auto' : 'none',
            willChange: 'opacity, filter',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <SoftwarePanel active={isPanelActive(1)} scrollProgress={lp[1]} />
        </div>

        <div
          className="absolute inset-0 transition-all duration-750 ease-out"
          style={{
            opacity: op[2],
            filter: `blur(${blurs[2]}px)`,
            pointerEvents: op[2] > 0.1 ? 'auto' : 'none',
            willChange: 'opacity, filter',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <HardwarePanel active={isPanelActive(2)} />
        </div>

        <div
          className="absolute inset-0 transition-all duration-750 ease-out"
          style={{
            opacity: op[3],
            filter: `blur(${blurs[3]}px)`,
            pointerEvents: op[3] > 0.1 ? 'auto' : 'none',
            willChange: 'opacity, filter',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <ElectricityPanel active={isPanelActive(3)} />
        </div>

        {/* Indicador de progreso lateral */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-50">
          {['Hero', 'Software', 'Hardware', 'Electricidad'].map((label, i) => (
            <div key={i} className="flex items-center gap-2 group cursor-default">
              <span className={`text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${op[i] > 0.5 ? 'text-accent opacity-100' : 'text-muted opacity-0 group-hover:opacity-100'}`}>
                {label}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${op[i] > 0.5 ? 'bg-accent scale-125 shadow-[0_0_6px_#1E40AF]' : 'bg-gray-300'}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
