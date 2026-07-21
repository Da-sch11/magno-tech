import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { isAuthModalOpen, cerrarAuthModal, modalMode } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`flex flex-col min-h-screen selection:bg-accent selection:text-white transition-colors duration-300 ${
      isHome ? 'bg-[#08090d] text-white' : 'bg-beige text-ink'
    }`}>
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      {!isHome && <Footer />}
      <AuthModal isOpen={isAuthModalOpen} onClose={cerrarAuthModal} initialMode={modalMode} key={modalMode} />
    </div>
  );
}
