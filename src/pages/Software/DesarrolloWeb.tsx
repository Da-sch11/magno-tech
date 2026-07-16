import { LayoutGrid, Globe, Smartphone, Gauge, Check } from 'lucide-react';

export default function DesarrolloWeb() {
  const caracteristicas = [
    {
      title: 'Páginas Web Corporativas',
      description: 'Sitios web profesionales que proyectan credibilidad, optimizados para SEO y con diseños modernos que capturan leads.',
      icon: Globe,
      color: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Tiendas Online (E-commerce)',
      description: 'Plataformas de venta robustas con pasarelas de pago integradas, carrito de compras avanzado y gestor de inventario intuitivo.',
      icon: LayoutGrid,
      color: 'from-purple-500 to-indigo-600',
    },
    {
      title: 'Velocidad y Performance Extrema',
      description: 'Código limpio y estructurado que garantiza tiempos de carga ultrarrápidos, logrando una excelente experiencia de usuario.',
      icon: Gauge,
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-pink-500/10 border border-pink-500/30 rounded-full px-4 py-1.5 text-xs text-pink-400 font-semibold tracking-wider uppercase mb-2">
            <Globe className="h-4 w-4" />
            <span>Desarrollo Web de Siguiente Generación</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-pink-400 bg-clip-text text-transparent">
            Sitios Web a la Medida de tu Negocio
          </h1>
          <p className="text-lg text-slate-400">
            Diseñamos y desarrollamos soluciones web interactivas, responsivas y optimizadas para motores de búsqueda. Potenciamos tu presencia digital de forma sólida.
          </p>
        </div>
      </section>

      {/* Grid de Características */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caracteristicas.map((item, index) => (
            <div
              key={index}
              className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-pink-500/5"
            >
              <div className={`inline-flex p-3 bg-gradient-to-tr ${item.color} rounded-xl text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="w-full h-px bg-slate-800 my-4" />
              <span className="text-xs text-pink-400 font-medium flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> 100% Responsivo e Interactivo
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Filosofía de Desarrollo */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-slate-900 border border-slate-850 rounded-3xl mt-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl" />
        <div className="relative space-y-4">
          <Smartphone className="h-10 w-10 text-pink-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Enfoque Mobile-First</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Más del 60% del tráfico web proviene de dispositivos móviles. Nuestras soluciones web se conciben y estructuran desde cero para ofrecer una navegación impecable en smartphones y tablets, garantizando un rendimiento óptimo de hardware.
          </p>
        </div>
      </section>
    </div>
  );
}
