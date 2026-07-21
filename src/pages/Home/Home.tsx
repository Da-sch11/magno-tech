import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Zap, ArrowRight, Wrench, Code2, Home as HomeIcon } from 'lucide-react';
import logo5 from '../../assets/logo5.png';
import imgCelular from '../../assets/celular.jpg';
import imgDesarrollo from '../../assets/desarrollo.jpg';
import imgElectri from '../../assets/electri.jpg';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
type Category = 'celulares' | 'software' | 'electricidad';

// ─────────────────────────────────────────────────────────────
// CINEMATIC BACKGROUNDS - SVGs that define the ambience
// ─────────────────────────────────────────────────────────────
function CelularesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Full real photo — no dark bg */}
      <img
        src={imgCelular}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Soft dark gradient only on left side to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      {/* Bottom fade for dock */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Moving data stream streaks */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          animate={{ x: ['-10%', '110%'], opacity: [0, 0.6, 0] }}
          transition={{ duration: 6 + i * 1.2, delay: i * 0.8, repeat: Infinity, ease: 'linear' }}
          style={{ top: `${20 + i * 11}%` }}
          className="absolute w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      ))}
    </div>
  );
}

function SoftwareBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Full real photo — no dark bg */}
      <img
        src={imgDesarrollo}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Soft dark gradient only on left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      {/* Bottom fade for dock */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Floating code particles on top */}
      {['{}','</>','=>','&&','//','[]'].map((text, i) => (
        <motion.div key={i}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4 + i * 0.7, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ left: `${6 + i * 15}%`, top: `${12 + (i % 3) * 24}%` }}
          className="absolute font-mono text-sm text-blue-200 select-none font-bold drop-shadow-md"
        >
          {text}
        </motion.div>
      ))}

      {/* Pulse line */}
      <motion.div
        animate={{ x: ['-5%', '105%'], opacity: [0, 0.7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-0 w-40 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"
      />
    </div>
  );
}

function ElectricidadBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Full real photo — no dark bg */}
      <img
        src={imgElectri}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Soft dark gradient only on left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      {/* Bottom fade for dock */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Lightning bolt particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 3 + i * 0.8, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 20}%` }}
          className="absolute text-cyan-200 text-base drop-shadow-md"
        >
          ⚡
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DEVICE MOCKUPS (positioned on the RIGHT)
// ─────────────────────────────────────────────────────────────
function CelularesDevice() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-3xl scale-125 pointer-events-none" />

      {/* Phone Shell */}
      <div className="relative w-[200px] h-[400px] bg-neutral-950 border-[5px] border-neutral-800 rounded-[46px] shadow-2xl p-2.5 flex flex-col overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-[22px] bg-black rounded-full z-30 flex items-center justify-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-800">
            <div className="w-1.5 h-1.5 m-auto mt-0.5 rounded-full bg-blue-900 opacity-60" />
          </div>
        </div>

        {/* Screen */}
        <div className="flex-grow rounded-[36px] relative overflow-hidden flex flex-col items-end justify-end border border-neutral-900/50">
          {/* celular.jpg fills the screen */}
          <img
            src={imgCelular}
            alt="Reparación Celular"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Scanning Line */}
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.9)] z-10 pointer-events-none"
          />

          {/* Corner tech brackets */}
          <div className="absolute top-6 left-4 w-5 h-5 border-t border-l border-cyan-400/50 z-10 pointer-events-none" />
          <div className="absolute top-6 right-4 w-5 h-5 border-t border-r border-cyan-400/50 z-10 pointer-events-none" />

          {/* Status bar at bottom */}
          <div className="relative z-10 w-full px-4 py-4 flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping block" />
              <span className="text-[8px] font-mono text-cyan-300 font-bold tracking-widest uppercase">Screen Repaired</span>
            </div>
            <span className="text-[7px] font-mono text-neutral-400">Touch OK · Glass Grade A+</span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="mx-auto mt-2 w-20 h-1 rounded-full bg-neutral-700" />
      </div>
    </div>
  );
}

function SoftwareDevice() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow Halo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-44 bg-blue-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* Laptop Lid (screen) */}
      <div className="relative w-[340px] h-[215px] bg-neutral-950 border-4 border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Window controls bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900/90 border-b border-neutral-800 flex-shrink-0 z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <div className="flex-1 bg-neutral-800 rounded h-4 mx-2 flex items-center px-2">
            <span className="text-[7px] text-neutral-500 font-mono truncate">magnotech.dev</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[6px] text-green-400 font-mono font-bold">LIVE</span>
          </div>
        </div>

        {/* Screen body — desarrollo.jpg as background */}
        <div className="flex-grow relative overflow-hidden">
          <img
            src={imgDesarrollo}
            alt="Desarrollo de Software"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Code overlay tint */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Floating code lines overlay */}
          <div className="absolute inset-0 p-3 font-mono text-[7px] text-blue-300/70 space-y-0.5 overflow-hidden z-10">
            <p className="text-neutral-500">{`// Magno Tech Dev`}</p>
            <p><span className="text-pink-400">import</span> <span className="text-white">{`{ motion }`}</span> <span className="text-pink-400">from</span> <span className="text-yellow-400">'framer-motion'</span>;</p>
            <p><span className="text-purple-400">const</span> <span className="text-yellow-300">MagnoApp</span> = () <span className="text-pink-400">=&gt;</span> {'{'}</p>
            <p>&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-cyan-400">&lt;MagnoTechPage /&gt;</span>;</p>
            <p>{'}'};</p>
          </div>
        </div>
      </div>

      {/* Base / hinge */}
      <div className="w-[360px] h-2.5 bg-neutral-800 border-t border-neutral-700 rounded-b-xl" />
      <div className="w-[380px] h-2 bg-neutral-700 rounded-b-full mx-auto shadow mt-0.5" />
    </div>
  );
}

function ElectricidadDevice() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl scale-150 pointer-events-none" />

      {/* Smart House container with real image */}
      <div className="relative w-[280px] h-[300px] rounded-3xl overflow-hidden border-2 border-cyan-500/20 shadow-2xl">
        {/* Real electri.jpg image */}
        <img
          src={imgElectri}
          alt="Casa Inteligente"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Neon circuit overlay on top */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 300" fill="none">
          {/* Corner tech brackets */}
          <path d="M 10 30 L 10 10 L 30 10" stroke="rgba(6,182,212,0.6)" strokeWidth="2" />
          <path d="M 250 10 L 270 10 L 270 30" stroke="rgba(6,182,212,0.6)" strokeWidth="2" />
          <path d="M 10 270 L 10 290 L 30 290" stroke="rgba(6,182,212,0.6)" strokeWidth="2" />
          <path d="M 250 290 L 270 290 L 270 270" stroke="rgba(6,182,212,0.6)" strokeWidth="2" />
          {/* Energy connection lines */}
          <path d="M 0 200 L 50 200 L 60 180" stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeDasharray="5 3" />
          <path d="M 280 200 L 230 200 L 220 180" stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeDasharray="5 3" />
        </svg>

        {/* Logo5 top-center badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-black/50 border border-cyan-500/40 backdrop-blur-md p-2 flex items-center justify-center shadow-lg shadow-cyan-500/20 z-10">
          <img src={logo5} alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]" />
        </div>

        {/* Smart Home status chips at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse block" />
            <span className="text-[8px] font-mono text-cyan-300 font-bold tracking-widest uppercase">Smart Home Online</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[7px] bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded-full font-mono">SOLAR ✓</span>
            <span className="text-[7px] bg-blue-500/20 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full font-mono">CCTV ✓</span>
          </div>
        </div>

        {/* Pulsing scan frame */}
        <motion.div
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-3 rounded-2xl border border-cyan-400/25 pointer-events-none z-10"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// INFO PANEL (shown on the LEFT)
// ─────────────────────────────────────────────────────────────
const categoryInfo = {
  celulares: {
    tag: '01 / Celulares',
    title: 'Reparación\nExperta',
    subtitle: 'Diagnóstico técnico + reparaciones de pantalla, glass, batería y microelectrónica.',
    feats: ['Cambio de Pantalla', 'Batería Original', 'Glass Trasero', 'Microsoldadura'],
    link: '/hardware/reparaciones',
    cta: 'Conoce las Reparaciones',
    accentColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-400/10 border-cyan-500/25 text-cyan-400',
    ctaGradient: 'from-cyan-600 to-blue-600 shadow-cyan-500/20',
    tagColor: 'text-cyan-500',
    icon: Wrench,
  },
  software: {
    tag: '02 / Desarrollo de Software',
    title: 'Tu Negocio\nDigital',
    subtitle: 'Sistemas web a medida, SaaS escalables y experiencias digitales de alto impacto.',
    feats: ['Landing Pages', 'SaaS Platforms', 'E-Commerce', 'API RESTful'],
    link: '/software/web',
    cta: 'Ver Proyectos Web',
    accentColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/10 border-blue-500/25 text-blue-400',
    ctaGradient: 'from-blue-600 to-indigo-600 shadow-blue-500/20',
    tagColor: 'text-blue-500',
    icon: Code2,
  },
  electricidad: {
    tag: '03 / Electricidad & CCTV',
    title: 'Hogares\nInteligentes',
    subtitle: 'Instalaciones eléctricas normadas, videovigilancia 4K y domótica para tu hogar.',
    feats: ['Tableros SEC', 'CCTV 4K IA', 'Domótica Smart', 'Cableado Cat6A'],
    link: '/electricidad/instalaciones',
    cta: 'Ver Instalaciones',
    accentColor: 'text-sky-400',
    badgeBg: 'bg-sky-400/10 border-sky-500/25 text-sky-400',
    ctaGradient: 'from-cyan-600 to-sky-600 shadow-sky-500/20',
    tagColor: 'text-sky-400',
    icon: HomeIcon,
  },
};

// ─────────────────────────────────────────────────────────────
// CATEGORY BACKGROUNDS Map
// ─────────────────────────────────────────────────────────────
const BG_GRADIENT: Record<Category, string> = {
  celulares:    'from-blue-950/60 via-[#08090d] to-[#08090d]',
  software:     'from-indigo-950/50 via-[#08090d] to-[#08090d]',
  electricidad: 'from-cyan-950/50 via-[#08090d] to-[#08090d]',
};

// ─────────────────────────────────────────────────────────────
// MAIN HOME COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('celulares');

  const menuItems = [
    { id: 'celulares'    as Category, label: 'Celulares',               shortLabel: 'Celulares',  icon: Smartphone },
    { id: 'software'     as Category, label: 'Desarrollo de Software',  shortLabel: 'Software',   icon: Laptop },
    { id: 'electricidad' as Category, label: 'Electricidad',            shortLabel: 'Eléctrica',  icon: Zap },
  ];

  const info = categoryInfo[activeCategory];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-black text-white flex flex-col overflow-hidden font-sans">
      {/* ── FULL IMAGE BACKGROUND ── */}
      <AnimatePresence mode="wait">
        <motion.div key={`bg-${activeCategory}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {activeCategory === 'celulares'    && <CelularesBackground />}
          {activeCategory === 'software'     && <SoftwareBackground />}
          {activeCategory === 'electricidad' && <ElectricidadBackground />}
        </motion.div>
      </AnimatePresence>

      {/* ── MAIN CONTENT: Left info + Right device ── */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-6 md:px-12 lg:px-20 py-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── LEFT PANEL — Info ── */}
          <div className="flex-1 flex flex-col gap-6 text-left order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div key={`info-${activeCategory}`}
                initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col gap-5"
              >
                {/* Category Tag */}
                <div className={`inline-flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-widest ${info.tagColor}`}>
                  <info.icon className="w-3.5 h-3.5" />
                  <span>{info.tag}</span>
                </div>

                {/* Title */}
                <h1
                  className="text-4xl md:text-5xl xl:text-6xl font-black uppercase leading-[1.05] tracking-tight text-white whitespace-pre-line"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.8)' }}
                >
                  {info.title}
                  <span className={`block ${info.accentColor}`}
                    style={{ textShadow: activeCategory === 'celulares'
                      ? '0 0 20px rgba(6,182,212,0.8), 0 0 50px rgba(6,182,212,0.4), 0 2px 16px rgba(0,0,0,0.9)'
                      : activeCategory === 'software'
                      ? '0 0 20px rgba(59,130,246,0.8), 0 0 50px rgba(59,130,246,0.4), 0 2px 16px rgba(0,0,0,0.9)'
                      : '0 0 20px rgba(56,189,248,0.8), 0 0 50px rgba(56,189,248,0.4), 0 2px 16px rgba(0,0,0,0.9)' }}
                  >
                    Magno Tech
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  className="text-neutral-200 text-sm md:text-base leading-relaxed max-w-sm"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
                >
                  {info.subtitle}
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2">
                  {info.feats.map((feat) => (
                    <span key={feat} className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${info.badgeBg}`}>
                      {feat}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA — "Conoce más Servicios" */}
            <AnimatePresence mode="wait">
              <motion.div key={`cta-${activeCategory}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row items-start gap-3 mt-2"
              >
                {/* Primary CTA */}
                <Link to={info.link}
                  className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r ${info.ctaGradient} text-white font-bold text-sm shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none`}
                >
                  <span>{info.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary "Conoce más Servicios" */}
                <Link to="/sobre-nosotros"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-neutral-900/60 backdrop-blur-sm border border-white/10 text-neutral-300 hover:text-white hover:border-white/25 font-semibold text-sm transition-all duration-300 focus:outline-none active:scale-[0.98]"
                >
                  <span>Sobre Nosotros</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT PANEL — Device Mockup ── */}
          <div className="flex-shrink-0 flex items-center justify-center order-1 lg:order-2 relative">
            <AnimatePresence mode="wait">
              <motion.div key={`device-${activeCategory}`}
                initial={{ opacity: 0, scale: 0.88, x: 60, filter: 'blur(14px)' }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.92, x: 40, filter: 'blur(10px)' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
              >
                {activeCategory === 'celulares'    && <CelularesDevice />}
                {activeCategory === 'software'     && <SoftwareDevice />}
                {activeCategory === 'electricidad' && <ElectricidadDevice />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── BOTTOM DOCK NAVIGATION ── */}
      <div className="relative z-20 w-full flex justify-center pb-8 pt-2">
        <div className="bg-neutral-950/70 backdrop-blur-2xl border border-white/10 px-2 py-2 rounded-3xl flex items-center gap-1.5 shadow-2xl shadow-black/60">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className="relative px-4 sm:px-5 py-3 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold transition-all duration-300 focus:outline-none cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-dock-pill"
                    className={`absolute inset-0 rounded-2xl -z-10 ${
                      item.id === 'celulares'    ? 'bg-gradient-to-r from-cyan-600/70 to-blue-700/70 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                      : item.id === 'software'  ? 'bg-gradient-to-r from-blue-700/70 to-indigo-700/70 shadow-[0_0_20px_rgba(59,130,246,0.35)]'
                      : 'bg-gradient-to-r from-cyan-700/70 to-sky-600/70 shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive
                    ? item.id === 'celulares' ? 'text-cyan-300'
                      : item.id === 'software' ? 'text-blue-300'
                      : 'text-sky-300'
                    : 'text-neutral-500'
                }`} />
                <span className={`hidden sm:inline transition-colors ${isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>
                  {item.label}
                </span>
                <span className={`sm:hidden transition-colors ${isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
