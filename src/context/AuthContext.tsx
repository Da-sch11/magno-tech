import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  alias: string;
  cedula: string;
  rol: 'cliente' | 'empleado' | 'admin';
  activo: boolean;
  fecha_creacion: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  cargando: boolean;
  login: (correo: string, contrasena: string) => Promise<void>;
  registrar: (nombre: string, apellido: string, correo: string, alias: string, cedula: string, contrasena: string) => Promise<void>;
  verificarCorreo: (correo: string, codigo: string) => Promise<void>;
  solicitarRecuperacion: (correo: string) => Promise<void>;
  restablecerContrasena: (correo: string, codigo: string, nuevaContrasena: string) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  modalMode: 'login' | 'register' | 'forgot' | 'verify_otp' | 'reset_password';
  abrirAuthModal: (modo?: 'login' | 'register' | 'forgot' | 'verify_otp' | 'reset_password') => void;
  cerrarAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:8000';

const obtenerMensajeError = (errorData: any, fallback: string): string => {
  if (!errorData || !errorData.detail) return fallback;
  if (typeof errorData.detail === 'string') return errorData.detail;
  if (Array.isArray(errorData.detail)) {
    return errorData.detail.map((err: any) => err.msg || JSON.stringify(err)).join(', ');
  }
  return JSON.stringify(errorData.detail);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'register' | 'forgot' | 'verify_otp' | 'reset_password'>('login');

  const abrirAuthModal = (modo: 'login' | 'register' | 'forgot' | 'verify_otp' | 'reset_password' = 'login') => {
    setModalMode(modo);
    setIsAuthModalOpen(true);
  };

  const cerrarAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Inicialización: cargar token desde localStorage
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('auth_token');
    if (tokenGuardado) {
      setToken(tokenGuardado);
      cargarPerfil(tokenGuardado);
    } else {
      setCargando(false);
    }
  }, []);

  const cargarPerfil = async (tokenAcceso: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenAcceso}`,
        },
      });

      if (response.ok) {
        const datosUsuario = await response.json();
        setUsuario(datosUsuario);
      } else {
        // Token inválido o expirado
        logout();
      }
    } catch (error) {
      console.error('Error al cargar el perfil de usuario:', error);
      logout();
    } finally {
      setCargando(false);
    }
  };

  const login = async (correo: string, contrasena: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(obtenerMensajeError(errorData, 'Credenciales incorrectas'));
      }

      const { access_token } = await response.json();
      localStorage.setItem('auth_token', access_token);
      setToken(access_token);
      await cargarPerfil(access_token);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const registrar = async (nombre: string, apellido: string, correo: string, alias: string, cedula: string, contrasena: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          alias,
          cedula,
          contrasena,
          rol: 'cliente', // Forzamos rol cliente
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(obtenerMensajeError(errorData, 'No se pudo completar el registro'));
      }
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const verificarCorreo = async (correo: string, codigo: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verificar-correo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, codigo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(obtenerMensajeError(errorData, 'Error al verificar el código'));
      }
    } catch (error) {
      console.error('Error en verificar correo:', error);
      throw error;
    }
  };

  const solicitarRecuperacion = async (correo: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/solicitar-recuperacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(obtenerMensajeError(errorData, 'Error al solicitar el código'));
      }
    } catch (error) {
      console.error('Error en solicitar recuperación:', error);
      throw error;
    }
  };

  const restablecerContrasena = async (correo: string, codigo: string, nuevaContrasena: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/restablecer-contrasena`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, codigo, nueva_contrasena: nuevaContrasena }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(obtenerMensajeError(errorData, 'Error al restablecer la contraseña'));
      }
    } catch (error) {
      console.error('Error en restablecer contraseña:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUsuario(null);
    setCargando(false);
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      token, 
      cargando, 
      login, 
      registrar, 
      verificarCorreo,
      solicitarRecuperacion,
      restablecerContrasena,
      logout,
      isAuthModalOpen,
      modalMode,
      abrirAuthModal,
      cerrarAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
