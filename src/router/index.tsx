import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home/Home';

// Páginas del área Hardware
import Reparaciones from '../pages/Hardware/Reparaciones';
import Tienda from '../pages/Hardware/Tienda';
import Repuestos from '../pages/Hardware/Repuestos';

// Páginas del área Electricidad
import Camaras from '../pages/Electricity/Camaras';
import Instalaciones from '../pages/Electricity/Instalaciones';

// Páginas del área Software
import DesarrolloWeb from '../pages/Software/DesarrolloWeb';
import SaaS from '../pages/Software/SaaS';

// Página Sobre Nosotros
import About from '../pages/About/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Rutas del área Hardware
      {
        path: 'hardware/reparaciones',
        element: <Reparaciones />,
      },
      {
        path: 'hardware/tienda',
        element: <Tienda />,
      },
      {
        path: 'hardware/repuestos',
        element: <Repuestos />,
      },
      // Rutas del área Electricidad
      {
        path: 'electricidad/camaras',
        element: <Camaras />,
      },
      {
        path: 'electricidad/instalaciones',
        element: <Instalaciones />,
      },
      // Rutas del área Software
      {
        path: 'software/web',
        element: <DesarrolloWeb />,
      },
      {
        path: 'software/saas',
        element: <SaaS />,
      },
      // Ruta Sobre Nosotros
      {
        path: 'sobre-nosotros',
        element: <About />,
      },
      // Redireccionar cualquier ruta no válida al inicio
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
