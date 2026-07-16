import { Cpu, Zap, Activity, ShieldAlert, Check } from 'lucide-react';

export default function Instalaciones() {
  const servicios = [
    {
      title: 'Mantenimiento de Redes Eléctricas',
      description: 'Inspecciones periódicas, balanceo de cargas, termografía infrarroja para detectar puntos calientes y prevención de fallos críticos.',
      icon: Activity,
      color: 'from-yellow-400 to-amber-500',
    },
    {
      title: 'Instalaciones y Tableros Eléctricos',
      description: 'Diseño, montaje y cableado de tableros de distribución de energía, disyuntores térmicos y diferenciales, y canalizaciones profesionales.',
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Sistemas de Puesta a Tierra y UPS',
      description: 'Instalación de jabalinas de tierra física y sistemas de alimentación ininterrumpida (UPS) para proteger equipos informáticos contra picos de tensión.',
      icon: Cpu,
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-slate-950 text-slate-100 selection:bg-yellow-400 selection:text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 text-xs text-yellow-400 font-semibold tracking-wider uppercase mb-2">
            <Zap className="h-4 w-4" />
            <span>Infraestructura Eléctrica Segura</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-yellow-400 bg-clip-text text-transparent">
            Instalaciones y Mantenimiento Eléctrico Profesional
          </h1>
          <p className="text-lg text-slate-400">
            Aseguramos la continuidad operativa y la seguridad de tu hogar, oficina o taller. Cableado estructurado, tableros eléctricos y protección de equipos delicados.
          </p>
        </div>
      </section>

      {/* Grid de Servicios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-yellow-500/5"
            >
              <div className={`inline-flex p-3 bg-gradient-to-tr ${servicio.color} rounded-xl text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <servicio.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                {servicio.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {servicio.description}
              </p>
              <div className="w-full h-px bg-slate-800 my-4" />
              <span className="text-xs text-yellow-400 font-medium flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Cumplimiento de Normativa Eléctrica
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Alerta de Seguridad / Importancia */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-slate-900 border border-slate-850 rounded-3xl mt-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl" />
        <div className="relative space-y-4">
          <ShieldAlert className="h-10 w-10 text-yellow-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">¿Por qué proteger tu infraestructura eléctrica?</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Las variaciones de energía y los cortocircuitos son la principal causa de fallos irreversibles en dispositivos electrónicos de hardware (smartphones, PCs, servidores). Un sistema eléctrico optimizado y protegido alarga la vida útil de tus equipos.
          </p>
        </div>
      </section>
    </div>
  );
}
