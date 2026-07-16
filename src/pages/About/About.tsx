import { ShieldAlert, BookOpen, BrainCircuit, Globe, Wrench, Zap, Check } from 'lucide-react';

export default function About() {
  const pilares = [
    {
      title: 'Aprendizaje Veloz y Adaptativo',
      description: 'El mercado técnico y tecnológico cambia a diario. Nos caracteriza una curva de aprendizaje sumamente acelerada, lo que nos permite dominar nuevas herramientas, arquitecturas y metodologías en tiempo récord.',
      icon: BookOpen,
      color: 'from-sky-500 to-indigo-600',
    },
    {
      title: 'Mentalidad Todoterreno',
      description: 'No creemos en silos de especialización rígidos. Si un problema requiere soldar un circuito de hardware, balancear una carga eléctrica o depurar código fuente de un microservicio, lo afrontamos con la misma excelencia técnica.',
      icon: BrainCircuit,
      color: 'from-pink-500 to-purple-600',
    },
    {
      title: 'Resolución Integral de Retos',
      description: 'Entendemos que los sistemas actuales son híbridos. Un fallo de software puede provenir de un sensor de hardware dañado o un corte de energía eléctrica. Abordamos los problemas desde una perspectiva holística.',
      icon: ShieldAlert,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const capacidades = [
    { area: 'Software', detalle: 'React, TypeScript, Next.js, Node.js, PostgreSQL, APIs REST/GraphQL, Automatización Cloud, CI/CD.', icon: Globe, color: 'text-pink-400' },
    { area: 'Hardware', detalle: 'Reparación a nivel de componentes (placas base), microsoldadura, auditorías de hardware, ensamble optimizado.', icon: Wrench, color: 'text-sky-400' },
    { area: 'Electricidad y Redes', detalle: 'CCTV IP (videovigilancia), tableros eléctricos residenciales e industriales, redes estructuradas, sistemas UPS.', icon: Zap, color: 'text-amber-400' },
  ];

  return (
    <div className="min-h-screen py-16 bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-xs text-indigo-400 font-semibold tracking-wider uppercase mb-2">
            <BrainCircuit className="h-4 w-4" />
            <span>Sobre Nosotros: Solucionadores Globales</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
            Ingeniería Adaptable para Desafíos Modernos
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Somos un equipo multidisciplinar que no conoce fronteras técnicas. Nos desempeñamos con igual destreza y rigor tanto escribiendo software de alto rendimiento, como reparando hardware electrónico sensible o estructurando redes de energía eléctrica seguras.
          </p>
        </div>
      </section>

      {/* Filosofía de Adaptabilidad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Nuestra Filosofía</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            La hiperespecialización limita la innovación. Nosotros rompemos el molde para adaptarnos a tus requerimientos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilares.map((pilar, index) => (
            <div
              key={index}
              className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-indigo-500/5"
            >
              <div className={`inline-flex p-3 bg-gradient-to-tr ${pilar.color} rounded-xl text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <pilar.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {pilar.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {pilar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Áreas de Dominio Técnico */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">¿Por qué elegirnos?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              En lugar de contratar tres proveedores diferentes para resolver problemas de software, hardware y electricidad, en **Magno Tech** obtienes un único socio estratégico capaz de comprender las interdependencias técnicas globales de tus proyectos.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nuestra meta no es solo resolver el problema inmediato, sino diseñar y aplicar arquitecturas robustas que prevengan incidentes futuros, independientemente de si se originan en una línea de código o en un cortocircuito eléctrico.
            </p>
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-slate-350">
                <div className="p-1 bg-indigo-500/10 rounded border border-indigo-500/25 text-indigo-400">
                  <Check className="h-4 w-4" />
                </div>
                <span>Diagnósticos certeros sin suposiciones.</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-350">
                <div className="p-1 bg-indigo-500/10 rounded border border-indigo-500/25 text-indigo-400">
                  <Check className="h-4 w-4" />
                </div>
                <span>Ejecución limpia, limpia de bugs y riesgos.</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Nuestra Capacidad Operativa</h3>
            <div className="space-y-4">
              {capacidades.map((capacidad, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-slate-950/40 border border-slate-850 rounded-xl">
                  <div className={`p-2 rounded-lg bg-slate-900 ${capacidad.color}`}>
                    <capacidad.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{capacidad.area}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{capacidad.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
