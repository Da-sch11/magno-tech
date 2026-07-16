import { Wrench, Laptop, Smartphone, CheckCircle, ShieldCheck, Clock } from 'lucide-react';

export default function Reparaciones() {
  const servicios = [
    {
      title: 'Reparación de Smartphones',
      description: 'Cambio de pantallas, baterías, conectores de carga, microsoldadura y recuperación por daño de agua.',
      icon: Smartphone,
      color: 'from-sky-500 to-blue-600',
    },
    {
      title: 'Soporte Técnico de PCs y Laptops',
      description: 'Mantenimiento preventivo, cambio de pasta térmica, reparación de placas, reinstalación de sistemas operativos y optimización de rendimiento.',
      icon: Laptop,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'Diagnóstico Avanzado',
      description: 'Pruebas exhaustivas de hardware para localizar fallas complejas y presupuesto honesto garantizado sin coste inicial de revisión.',
      icon: Wrench,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-500/30 rounded-full px-4 py-1.5 text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">
            <Wrench className="h-4 w-4" />
            <span>Servicio Técnico Profesional</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text text-transparent">
            Reparaciones de Hardware de Alta Precisión
          </h1>
          <p className="text-lg text-slate-400">
            Diagnóstico, mantenimiento y reparación experta de smartphones, ordenadores y dispositivos electrónicos. Devolvemos la vida a tu tecnología con garantía escrita.
          </p>
        </div>
      </section>

      {/* Grid de Servicios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-sky-500/5"
            >
              <div className={`inline-flex p-3 bg-gradient-to-tr ${servicio.color} rounded-xl text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <servicio.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                {servicio.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {servicio.description}
              </p>
              <div className="w-full h-px bg-slate-800 my-4" />
              <span className="text-xs text-sky-400 font-medium flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5" /> Servicio Premium
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Características del Servicio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-slate-900 rounded-full border border-slate-800 text-sky-400">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-semibold text-white">Garantía Asegurada</h4>
            <p className="text-slate-400 text-sm max-w-xs">
              Todas nuestras reparaciones cuentan con garantía ante cualquier desperfecto en los componentes reemplazados.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-slate-900 rounded-full border border-slate-800 text-indigo-400">
              <Clock className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-semibold text-white">Servicio Rápido</h4>
            <p className="text-slate-400 text-sm max-w-xs">
              Entendemos lo importante que es tu equipo. Ofrecemos diagnósticos y soluciones en tiempo récord sin sacrificar calidad.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-slate-900 rounded-full border border-slate-800 text-emerald-400">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-semibold text-white">Componentes Certificados</h4>
            <p className="text-slate-400 text-sm max-w-xs">
              Utilizamos repuestos originales o de calidad OEM Grado A+ para asegurar el rendimiento a largo plazo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
