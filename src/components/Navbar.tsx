import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Cpu, Wrench, Shield, Database, LayoutGrid, LogOut, User as UserIcon } from 'lucide-react';
import logo5 from '../assets/logo5.png';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { usuario, logout, abrirAuthModal } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-accent bg-accent/5 border-b-2 border-accent'
        : 'text-ink-light hover:text-ink hover:bg-gray-100'
    }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isHome 
        ? 'bg-black/50 border-white/10 text-white' 
        : 'bg-beige/85 border-card-border text-ink'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeAll} className="flex items-center space-x-2 group">
              <div className="w-10 h-10 overflow-hidden flex items-center justify-center rounded-lg bg-white border border-card-border p-1 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <img src={logo5} alt="Logo Magno Tech" className="w-full h-full object-contain" />
              </div>
              <span className={`font-extrabold text-xl tracking-tight ${isHome ? 'text-white' : 'text-ink'}`}>
                Magno <span className="text-accent">Tech</span>
              </span>
            </Link>
          </div>

          {/* Menú de Escritorio - Oculto en Home */}
          {!isHome && (
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" className={navLinkClass}>
                Inicio
              </NavLink>

              {/* Dropdown Hardware */}
              <div className="relative group/dropdown">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-ink-light hover:text-ink hover:bg-gray-100 transition-all duration-300">
                  <span>Hardware</span>
                  <ChevronDown className="h-4 w-4 transform group-hover/dropdown:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute left-0 mt-1 w-52 rounded-lg shadow-xl bg-white border border-card-border py-1 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 transform translate-y-2 group-hover/dropdown:translate-y-0">
                  <Link to="/hardware/reparaciones" className="flex items-center space-x-2 px-4 py-2 text-sm text-muted hover:text-accent hover:bg-accent/5 transition-colors">
                    <Wrench className="h-4 w-4 text-accent" />
                    <span>Reparaciones</span>
                  </Link>
                  <Link to="/hardware/tienda" className="flex items-center space-x-2 px-4 py-2 text-sm text-muted hover:text-accent hover:bg-accent/5 transition-colors">
                    <Cpu className="h-4 w-4 text-accent-light" />
                    <span>Tienda de Equipos</span>
                  </Link>
                  <Link to="/hardware/repuestos" className="flex items-center space-x-2 px-4 py-2 text-sm text-muted hover:text-accent hover:bg-accent/5 transition-colors">
                    <LayoutGrid className="h-4 w-4 text-accent" />
                    <span>Repuestos</span>
                  </Link>
                </div>
              </div>

              {/* Dropdown Electricidad */}
              <div className="relative group/dropdown">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-ink-light hover:text-ink hover:bg-gray-100 transition-all duration-300">
                  <span>Electricidad</span>
                  <ChevronDown className="h-4 w-4 transform group-hover/dropdown:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute left-0 mt-1 w-52 rounded-lg shadow-xl bg-white border border-card-border py-1 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 transform translate-y-2 group-hover/dropdown:translate-y-0">
                  <Link to="/electricidad/camaras" className="flex items-center space-x-2 px-4 py-2 text-sm text-muted hover:text-accent hover:bg-accent/5 transition-colors">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>Videovigilancia</span>
                  </Link>
                  <Link to="/electricidad/instalaciones" className="flex items-center space-x-2 px-4 py-2 text-sm text-muted hover:text-accent hover:bg-accent/5 transition-colors">
                    <Cpu className="h-4 w-4 text-accent-light" />
                    <span>Instalaciones</span>
                  </Link>
                </div>
              </div>

              {/* Dropdown Software */}
              <div className="relative group/dropdown">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-ink-light hover:text-ink hover:bg-gray-100 transition-all duration-300">
                  <span>Software</span>
                  <ChevronDown className="h-4 w-4 transform group-hover/dropdown:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute left-0 mt-1 w-52 rounded-lg shadow-xl bg-white border border-card-border py-1 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 transform translate-y-2 group-hover/dropdown:translate-y-0">
                  <Link to="/software/web" className="flex items-center space-x-2 px-4 py-2 text-sm text-muted hover:text-accent hover:bg-accent/5 transition-colors">
                    <LayoutGrid className="h-4 w-4 text-accent" />
                    <span>Desarrollo Web</span>
                  </Link>
                  <Link to="/software/saas" className="flex items-center space-x-2 px-4 py-2 text-sm text-muted hover:text-accent hover:bg-accent/5 transition-colors">
                    <Database className="h-4 w-4 text-accent-light" />
                    <span>Software a Medida (SaaS)</span>
                  </Link>
                </div>
              </div>

              <NavLink to="/sobre-nosotros" className={navLinkClass}>
                Sobre Nosotros
              </NavLink>
            </div>
          )}

          {/* Sección de Autenticación - Visible en todos los tamaños en Home, o md:flex en otras páginas */}
          <div className={`${isHome ? 'flex' : 'hidden md:flex'} items-center ml-4 space-x-2`}>
            {usuario ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors shadow-sm focus:outline-none ${
                    isHome 
                      ? 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800' 
                      : 'bg-white border-card-border text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <UserIcon className="h-4 w-4 text-accent" />
                  <span>{usuario.nombre}</span>
                  <ChevronDown className={`h-3 w-3 transform transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUserDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserDropdownOpen(false)} />
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border py-1.5 z-50 transform origin-top-right transition-all ${
                      isHome 
                        ? 'bg-neutral-900 border-neutral-800 text-neutral-200' 
                        : 'bg-white border-card-border text-slate-700'
                    }`}>
                      <div className={`px-4 py-2 border-b text-xs ${isHome ? 'border-neutral-800' : 'border-card-border'}`}>
                        <p className={`font-bold ${isHome ? 'text-white' : 'text-slate-800'}`}>{usuario.nombre} {usuario.apellido}</p>
                        <p className="text-slate-400 font-medium truncate">{usuario.correo}</p>
                        <span className="inline-block bg-accent/10 text-accent font-bold px-1.5 py-0.5 rounded text-[10px] mt-1.5 uppercase tracking-wider">
                          {usuario.rol}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 transition-colors text-left font-semibold ${
                          isHome ? 'hover:bg-neutral-800' : 'hover:bg-red-50'
                        }`}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => abrirAuthModal('login')}
                className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none"
              >
                Iniciar Sesión
              </button>
            )}
          </div>

          {/* Botón Menú Móvil - Oculto en Home */}
          {!isHome && (
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-ink hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Abrir menú de navegación</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menú Móvil desplegable - Oculto en Home */}
      {isOpen && !isHome && (
        <div className="md:hidden bg-white border-b border-card-border px-2 pt-2 pb-4 space-y-1" id="mobile-menu">
          <Link to="/" onClick={closeAll} className="block px-3 py-2 rounded-md text-base font-medium text-ink-light hover:text-ink hover:bg-gray-50">
            Inicio
          </Link>

          {/* Hardware Móvil */}
          <div className="space-y-1">
            <button onClick={() => toggleDropdown('hardware')} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-ink-light hover:text-ink hover:bg-gray-50">
              <span>Hardware</span>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${activeDropdown === 'hardware' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'hardware' && (
              <div className="pl-6 space-y-1">
                <Link to="/hardware/reparaciones" onClick={closeAll} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted hover:text-accent hover:bg-accent/5"><Wrench className="h-4 w-4" /><span>Reparaciones</span></Link>
                <Link to="/hardware/tienda" onClick={closeAll} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted hover:text-accent hover:bg-accent/5"><Cpu className="h-4 w-4" /><span>Tienda de Equipos</span></Link>
                <Link to="/hardware/repuestos" onClick={closeAll} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted hover:text-accent hover:bg-accent/5"><LayoutGrid className="h-4 w-4" /><span>Repuestos</span></Link>
              </div>
            )}
          </div>

          {/* Electricidad Móvil */}
          <div className="space-y-1">
            <button onClick={() => toggleDropdown('electricity')} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-ink-light hover:text-ink hover:bg-gray-50">
              <span>Electricidad</span>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${activeDropdown === 'electricity' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'electricity' && (
              <div className="pl-6 space-y-1">
                <Link to="/electricidad/camaras" onClick={closeAll} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted hover:text-accent hover:bg-accent/5"><Shield className="h-4 w-4" /><span>Videovigilancia</span></Link>
                <Link to="/electricidad/instalaciones" onClick={closeAll} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted hover:text-accent hover:bg-accent/5"><Cpu className="h-4 w-4" /><span>Instalaciones</span></Link>
              </div>
            )}
          </div>

          {/* Software Móvil */}
          <div className="space-y-1">
            <button onClick={() => toggleDropdown('software')} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-ink-light hover:text-ink hover:bg-gray-50">
              <span>Software</span>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${activeDropdown === 'software' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'software' && (
              <div className="pl-6 space-y-1">
                <Link to="/software/web" onClick={closeAll} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted hover:text-accent hover:bg-accent/5"><LayoutGrid className="h-4 w-4" /><span>Desarrollo Web</span></Link>
                <Link to="/software/saas" onClick={closeAll} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted hover:text-accent hover:bg-accent/5"><Database className="h-4 w-4" /><span>Software a Medida (SaaS)</span></Link>
              </div>
            )}
          </div>

          <Link to="/sobre-nosotros" onClick={closeAll} className="block px-3 py-2 rounded-md text-base font-medium text-ink-light hover:text-ink hover:bg-gray-50">
            Sobre Nosotros
          </Link>

          {/* Sección de Autenticación Móvil */}
          <div className="border-t border-card-border pt-4 mt-4 px-3">
            {usuario ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{usuario.nombre} {usuario.apellido}</p>
                    <p className="text-xs text-slate-400 font-medium truncate max-w-[180px]">{usuario.correo}</p>
                    <span className="inline-block bg-accent/10 text-accent font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                      {usuario.rol}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    closeAll();
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-bold text-sm transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  closeAll();
                  abrirAuthModal('login');
                }}
                className="w-full bg-accent hover:bg-accent-light text-white py-2 rounded-lg font-bold text-sm shadow-md transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
