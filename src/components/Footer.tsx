import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import logo5 from '../assets/logo5.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-gray-800 text-gray-400 py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna Marca */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 overflow-hidden flex items-center justify-center rounded-lg bg-white/10 border border-white/10 p-1">
                <img src={logo5} alt="Logo Magno Tech" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Magno Tech
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Soluciones integrales de hardware, electricidad, redes y desarrollo de software a medida.
            </p>
          </div>

          {/* Columna Hardware */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Hardware</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/hardware/reparaciones" className="hover:text-accent-light transition-colors">Servicio Técnico</Link></li>
              <li><Link to="/hardware/tienda" className="hover:text-accent-light transition-colors">Tienda de Equipos</Link></li>
              <li><Link to="/hardware/repuestos" className="hover:text-accent-light transition-colors">Catálogo de Repuestos</Link></li>
            </ul>
          </div>

          {/* Columna Otros Servicios */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Otros Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/electricidad/camaras" className="hover:text-accent-light transition-colors">Cámaras de Seguridad</Link></li>
              <li><Link to="/electricidad/instalaciones" className="hover:text-accent-light transition-colors">Instalaciones Eléctricas</Link></li>
              <li><Link to="/software/web" className="hover:text-accent-light transition-colors">Desarrollo Web</Link></li>
              <li><Link to="/software/saas" className="hover:text-accent-light transition-colors">Software a Medida (SaaS)</Link></li>
            </ul>
          </div>

          {/* Columna Contacto */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-accent-light" />
              <span>soporte@magno-tech.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-accent-light" />
              <span>Soporte Global / Remoto y Presencial</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {currentYear} Magno Tech. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
