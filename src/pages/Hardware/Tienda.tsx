import { Cpu, Smartphone, Monitor, ShoppingCart, Heart, Shield } from 'lucide-react';

export default function Tienda() {
  const productos = [
    {
      name: 'iPhone 15 Pro - Reacondicionado Premium',
      description: 'Estado 10/10, batería nueva, 256GB. Certificado por nuestros técnicos.',
      price: '$899.00',
      category: 'Smartphones',
      icon: Smartphone,
      color: 'from-amber-500 to-red-600',
    },
    {
      name: 'Setup Gaming custom "Antigravity"',
      description: 'AMD Ryzen 7, RTX 4070, 32GB RAM DDR5, 1TB NVMe. Ensamblado y optimizado.',
      price: '$1,499.00',
      category: 'Computadores',
      icon: Cpu,
      color: 'from-sky-500 to-indigo-600',
    },
    {
      name: 'Monitor Pro Art 27" 4K',
      description: 'Ideal para creadores de contenido, calibración de color precisa, IPS.',
      price: '$349.00',
      category: 'Accesorios',
      icon: Monitor,
      color: 'from-pink-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-xs text-indigo-400 font-semibold tracking-wider uppercase mb-2">
            <Cpu className="h-4 w-4" />
            <span>Tienda de Equipos de Alto Rendimiento</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            Adquiere Equipos con Calidad Garantizada
          </h1>
          <p className="text-lg text-slate-400">
            Explora nuestra selección de teléfonos, ordenadores de alto rendimiento y periféricos. Todos los equipos son minuciosamente auditados por nuestro equipo técnico.
          </p>
        </div>
      </section>

      {/* Grid de Productos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productos.map((producto, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div>
                {/* Categoría y Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-indigo-300 rounded-full">
                    {producto.category}
                  </span>
                  <button className="text-slate-400 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                {/* Contenedor del Icono / Imagen Dummy */}
                <div className="w-full h-48 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-center mb-6 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${producto.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  <producto.icon className="h-16 w-16 text-slate-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {producto.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {producto.description}
                </p>
              </div>

              <div>
                <div className="w-full h-px bg-slate-800 my-4" />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-black text-white">{producto.price}</span>
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promociones / Confianza */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-slate-900 border border-slate-800 rounded-3xl mt-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="relative space-y-4">
          <Shield className="h-10 w-10 text-indigo-400 mx-auto" />
          <h3 className="text-2xl font-bold text-white">Garantía Certificada de Magno Tech</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            ¿Buscas un equipo adaptado a tus necesidades? Ofrecemos 12 meses de garantía en todos nuestros equipos reacondicionados y soporte postventa permanente.
          </p>
        </div>
      </section>
    </div>
  );
}
