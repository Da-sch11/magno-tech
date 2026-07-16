import { Database, Shield, Server, Terminal, Layers, Check } from 'lucide-react';

export default function SaaS() {
  const servicios = [
    {
      title: 'Plataformas SaaS a Medida',
      description: 'Arquitectura de software multitenant con suscripciones, roles de usuario, paneles de control y escalabilidad en la nube.',
      icon: Layers,
      color: 'from-purple-500 to-indigo-600',
    },
    {
      title: 'APIs y Bases de Datos Robustas',
      description: 'Diseño de servicios REST/GraphQL de alto rendimiento y modelado de datos relacionales y no relacionales optimizados.',
      icon: Database,
      color: 'from-indigo-500 to-sky-600',
    },
    {
      title: 'Integraciones e Infraestructura',
      description: 'Despliegues continuos (CI/CD) en la nube (AWS, Vercel, GCP) con monitoreo de rendimiento, alta disponibilidad y seguridad.',
      icon: Server,
      color: 'from-pink-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-xs text-purple-400 font-semibold tracking-wider uppercase mb-2">
            <Terminal className="h-4 w-4" />
            <span>Desarrollo de Sistemas y Aplicaciones Cloud</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            Software a Medida para Escalar tus Procesos
          </h1>
          <p className="text-lg text-slate-400">
            Automatizamos e integramos tus operaciones mediante aplicaciones de software exclusivas. Diseñamos plataformas web seguras, mantenibles y altamente escalables.
          </p>
        </div>
      </section>

      {/* Grid de Soluciones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-purple-500/5"
            >
              <div className={`inline-flex p-3 bg-gradient-to-tr ${servicio.color} rounded-xl text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <servicio.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {servicio.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {servicio.description}
              </p>
              <div className="w-full h-px bg-slate-800 my-4" />
              <span className="text-xs text-purple-400 font-medium flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Arquitectura Cloud Escalable
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Seguridad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-slate-900 border border-slate-850 rounded-3xl mt-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl" />
        <div className="relative space-y-4">
          <Shield className="h-10 w-10 text-purple-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Seguridad y Respaldo Garantizado</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Nuestros desarrollos cumplen con estrictas normas de seguridad, incluyendo encriptación de datos en reposo y en tránsito, autenticación JWT/OAuth, auditoría de código regular e infraestructura protegida ante inyecciones e intrusiones externas.
          </p>
        </div>
      </section>
    </div>
  );
}
