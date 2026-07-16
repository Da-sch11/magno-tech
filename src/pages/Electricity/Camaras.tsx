import { Shield, Eye, Video, HardDrive, BellRing, Check } from 'lucide-react';

export default function Camaras() {
  const caracteristicas = [
    {
      title: 'Monitoreo en Tiempo Real',
      description: 'Accede a tus cámaras desde tu teléfono móvil o tablet en cualquier parte del mundo de forma segura y encriptada.',
      icon: Eye,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Cámaras Ultra HD (4K)',
      description: 'Equipos con visión nocturna infrarroja inteligente, detección de movimiento mediante IA y resistencia a la intemperie (IP67).',
      icon: Video,
      color: 'from-yellow-500 to-amber-600',
    },
    {
      title: 'Grabación Continua y Almacenamiento',
      description: 'Configuración de grabadores NVR de alta fiabilidad y almacenamiento seguro local y en la nube para resguardar grabaciones.',
      icon: HardDrive,
      color: 'from-red-500 to-amber-600',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-2">
            <Shield className="h-4 w-4" />
            <span>Seguridad y Vigilancia Electrónica</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-amber-400 bg-clip-text text-transparent">
            Instalación de Sistemas de Videovigilancia
          </h1>
          <p className="text-lg text-slate-400">
            Diseñamos e instalamos circuitos cerrados de televisión (CCTV) con tecnología IP de vanguardia para proteger lo que más te importa. Seguridad confiable las 24 horas.
          </p>
        </div>
      </section>

      {/* Grid de Soluciones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caracteristicas.map((item, index) => (
            <div
              key={index}
              className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-amber-500/5"
            >
              <div className={`inline-flex p-3 bg-gradient-to-tr ${item.color} rounded-xl text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="w-full h-px bg-slate-800 my-4" />
              <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Tecnología de Vanguardia
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Secciones Informativas */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-900 border border-slate-800 rounded-3xl mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center space-x-2 text-amber-400">
              <BellRing className="h-6 w-6" />
              <h3 className="text-xl font-bold text-white">Alertas Inteligentes ante Intrusiones</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Configuramos los grabadores para que recibas notificaciones automáticas y alertas en tiempo real en tu teléfono cuando se detecte movimiento en perímetros restringidos fuera de horario laboral.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-sm">
              Solicitar Cotización Personalizada
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
