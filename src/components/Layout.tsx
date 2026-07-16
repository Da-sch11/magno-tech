import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { isAuthModalOpen, cerrarAuthModal, modalMode } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-beige text-ink selection:bg-accent selection:text-white">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={cerrarAuthModal} initialMode={modalMode} key={modalMode} />
    </div>
  );
}
