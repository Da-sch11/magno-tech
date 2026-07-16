import { LayoutGrid, Cpu, Smartphone, HelpCircle, HardDrive } from 'lucide-react';

export default function Repuestos() {
  const repuestos = [
    {
      name: 'Pantallas OLED Originales / OEM',
      description: 'Paneles de repuesto de alta fidelidad de color y respuesta táctil para iPhone, Samsung y Xiaomi.',
      compatibility: 'Multi-marca',
      status: 'En stock',
      icon: Smartphone,
      color: 'from-sky-500 to-blue-600',
    },
    {
      name: 'Baterías de Alta Capacidad',
      description: 'Celda química certificada de larga duración con microchip controlador de carga original.',
      compatibility: 'Dispositivos Móviles y Laptops',
      status: 'En stock',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'Unidades SSD y Módulos RAM',
      description: 'Componentes de almacenamiento y memoria de marcas líderes para repotenciar Laptops y PCs.',
      compatibility: 'Sistemas Informáticos',
      status: 'En stock',
      icon: HardDrive,
      color: 'from-pink-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span>Repuestos y Componentes Originales</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
            Catálogo de Componentes Certificados
          </h1>
          <p className="text-lg text-slate-400">
            Suministramos repuestos de calidad premium para servicios técnicos y entusiastas del hardware. Pantallas, baterías y componentes electrónicos testeados en laboratorio.
          </p>
        </div>
      </section>

      {/* Grid de Repuestos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {repuestos.map((repuesto, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-emerald-500/5 group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-850 text-emerald-300 rounded-full">
                    {repuesto.compatibility}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    {repuesto.status}
                  </span>
                </div>

                <div className="w-full h-40 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-center mb-6 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${repuesto.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  <repuesto.icon className="h-14 w-14 text-slate-500 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {repuesto.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {repuesto.description}
                </p>
              </div>

              <div>
                <div className="w-full h-px bg-slate-800 my-4" />
                <button className="w-full py-2.5 rounded-lg border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 hover:bg-emerald-500/5 transition-all text-xs font-semibold">
                  Consultar Disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preguntas / FAQ Rápido */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900/50">
        <div className="text-center mb-10">
          <HelpCircle className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-white">¿Tienes alguna duda sobre la compatibilidad?</h3>
          <p className="text-slate-400 text-xs">Consulta técnica gratuita con nuestros especialistas de hardware.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-white mb-2">¿Ofrecen garantía en los repuestos?</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sí, todos nuestros repuestos tienen garantía de funcionamiento directo. Deben ser instalados por personal calificado para mantener la validez.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-white mb-2">¿Hacen envíos de repuestos?</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Realizamos envíos a nivel nacional con empaque de alta seguridad antiestática y a prueba de impactos para garantizar que lleguen intactos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
