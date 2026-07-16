import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle, RefreshCw, Key, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot' | 'verify_otp' | 'reset_password';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, registrar, verificarCorreo, solicitarRecuperacion, restablecerContrasena } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'verify_otp' | 'reset_password'>(initialMode);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [alias, setAlias] = useState('');
  const [cedula, setCedula] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [codigoOtp, setCodigoOtp] = useState('');
  
  // Captcha
  const [captchaCodigo, setCaptchaCodigo] = useState('');
  const [captchaIngresado, setCaptchaIngresado] = useState('');
  
  // Seguridad y Temporizadores
  const [verContrasena, setVerContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exitoMsg, setExitoMsg] = useState<string | null>(null);
  
  // Temporizador para bloqueo temporal
  const [segundosBloqueo, setSegundosBloqueo] = useState(0);
  const [segundosBloqueoOtp, setSegundosBloqueoOtp] = useState(0);

  // Validación de fuerza de contraseña en tiempo real
  const passwordValidation = {
    minLength: contrasena.length >= 6,
    hasUpper: /[A-Z]/.test(contrasena),
    hasLower: /[a-z]/.test(contrasena),
    hasNumber: /\d/.test(contrasena),
  };
  const isPasswordValid = passwordValidation.minLength && passwordValidation.hasUpper && passwordValidation.hasLower && passwordValidation.hasNumber;

  // Sincronizar modo y generar captcha al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      generarCaptcha();
    }
  }, [isOpen, initialMode]);

  // Generar captcha al cambiar de pestaña
  useEffect(() => {
    if (isOpen) {
      generarCaptcha();
    }
  }, [mode]);

  // Manejo del contador del bloqueo temporal de login
  useEffect(() => {
    if (segundosBloqueo > 0) {
      const timer = setTimeout(() => {
        setSegundosBloqueo(segundosBloqueo - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [segundosBloqueo]);

  // Manejo del contador del bloqueo temporal de OTP
  useEffect(() => {
    if (segundosBloqueoOtp > 0) {
      const timer = setTimeout(() => {
        setSegundosBloqueoOtp(segundosBloqueoOtp - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [segundosBloqueoOtp]);

  const generarCaptcha = () => {
    // Excluye la 'l', la 'o', la 'O' y el '0' (cero)
    const caracteres = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let resultado = '';
    for (let i = 0; i < 6; i++) {
      resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    setCaptchaCodigo(resultado);
    setCaptchaIngresado('');
  };

  const validarCedulaEcuatoriana = (numCedula: string): boolean => {
    numCedula = numCedula.trim();
    if (numCedula.length !== 10 || !/^\d+$/.test(numCedula)) return false;
    
    const provincia = parseInt(numCedula.substring(0, 2), 10);
    if (provincia < 1 || (provincia > 24 && provincia !== 30)) return false;
    
    const tercerDigito = parseInt(numCedula.charAt(2), 10);
    if (tercerDigito >= 6) return false;
    
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < 9; i++) {
      let val = parseInt(numCedula.charAt(i), 10) * coeficientes[i];
      if (val > 9) val -= 9;
      suma += val;
    }
    
    const digitoVerificador = parseInt(numCedula.charAt(9), 10);
    const residuo = suma % 10;
    const resultado = residuo === 0 ? 0 : 10 - residuo;
    
    return resultado === digitoVerificador;
  };

  const resetForm = () => {
    setNombre('');
    setApellido('');
    setCorreo('');
    setAlias('');
    setCedula('');
    setContrasena('');
    setConfirmarContrasena('');
    setCodigoOtp('');
    setError(null);
    setExitoMsg(null);
    setVerContrasena(false);
    setSegundosBloqueo(0);
    setSegundosBloqueoOtp(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const cambiarModo = (nuevoModo: 'login' | 'register' | 'forgot' | 'verify_otp' | 'reset_password') => {
    setError(null);
    setExitoMsg(null);
    setMode(nuevoModo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // 1. Validar Captcha si estamos en login o registro
    if (mode === 'login' || mode === 'register') {
      if (captchaIngresado.trim().toLowerCase() !== captchaCodigo.toLowerCase()) {
        setError('El código captcha no coincide.');
        generarCaptcha();
        return;
      }
    }

    setCargando(true);

    try {
      if (mode === 'login') {
        if (!correo || !contrasena) {
          throw new Error('Por favor completa todos los campos.');
        }
        await login(correo, contrasena);
        handleClose();
      } 
      else if (mode === 'register') {
        if (!nombre || !apellido || !correo || !alias || !cedula || !contrasena) {
          throw new Error('Por favor completa todos los campos.');
        }
        if (!validarCedulaEcuatoriana(cedula)) {
          throw new Error('La cédula ingresada no es una cédula ecuatoriana válida.');
        }
        if (!isPasswordValid) {
          throw new Error('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.');
        }
        if (contrasena !== confirmarContrasena) {
          throw new Error('Las contraseñas no coinciden.');
        }
        
        await registrar(nombre, apellido, correo, alias, cedula, contrasena);
        setExitoMsg('Usuario registrado exitosamente. Introduce el código OTP enviado a tu correo.');
        
        // Mantener el correo en el estado e ir a verificar OTP
        setMode('verify_otp');
      } 
      else if (mode === 'verify_otp') {
        if (!codigoOtp || !correo) {
          throw new Error('Código o correo inválido.');
        }
        await verificarCorreo(correo, codigoOtp);
        setExitoMsg('Cuenta activada con éxito. Inicia sesión ahora.');
        setCodigoOtp('');
        setMode('login');
      } 
      else if (mode === 'forgot') {
        if (!correo) {
          throw new Error('Por favor ingresa tu correo electrónico.');
        }
        await solicitarRecuperacion(correo);
        setExitoMsg('Código de recuperación enviado. Introdúcelo a continuación junto con tu nueva contraseña.');
        setMode('reset_password');
      } 
      else if (mode === 'reset_password') {
        if (!correo || !codigoOtp || !contrasena) {
          throw new Error('Completa todos los campos obligatorios.');
        }
        if (!isPasswordValid) {
          throw new Error('La nueva contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.');
        }
        await restablecerContrasena(correo, codigoOtp, contrasena);
        setExitoMsg('Contraseña restablecida y cuenta desbloqueada exitosamente. Inicia sesión.');
        setCodigoOtp('');
        setContrasena('');
        setMode('login');
      }
    } catch (err: any) {
      const msg = err.message || '';
      
      // Capturar segundos del bloqueo temporal si el backend los devuelve
      if (msg.includes('bloqueado temporalmente') || msg.includes('Demasiados intentos fallidos')) {
        if (msg.includes('OTP')) {
          const matches = msg.match(/\d+/);
          if (matches && matches[0]) {
            setSegundosBloqueoOtp(parseInt(matches[0], 10));
          } else {
            setSegundosBloqueoOtp(5);
          }
        } else {
          const matches = msg.match(/\d+/);
          if (matches && matches[0]) {
            setSegundosBloqueo(parseInt(matches[0], 10));
          } else {
            setSegundosBloqueo(10); // Valor por defecto si no se puede extraer
          }
        }
      }
      
      setError(msg || 'Ocurrió un error inesperado. Inténtalo de nuevo.');
      if (mode === 'login' || mode === 'register') {
        generarCaptcha();
      }
    } finally {
      setCargando(false);
    }
  };

  const modalVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring' as const, damping: 25, stiffness: 350 }
    },
    exit: { y: 20, opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div 
            className="relative w-full max-w-md overflow-hidden bg-white/95 border border-slate-100 shadow-2xl rounded-2xl p-6 md:p-8 backdrop-blur-lg flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {/* Botón cerrar */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Encabezado */}
            <div className="text-center mb-5">
              <span className="font-extrabold text-2xl tracking-tight text-slate-800">
                Magno <span className="text-accent">Tech</span>
              </span>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                {mode === 'login' && 'Inicia sesión con tu correo o alias.'}
                {mode === 'register' && 'Crea tu cuenta de cliente.'}
                {mode === 'verify_otp' && 'Valida tu correo electrónico.'}
                {mode === 'forgot' && 'Solicita el código de recuperación.'}
                {mode === 'reset_password' && 'Establece tu nueva contraseña.'}
              </p>
            </div>

            {/* Alertas */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 bg-red-50 text-red-700 p-3 rounded-lg text-xs font-semibold mb-4 border border-red-100"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {exitoMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 bg-emerald-50 text-emerald-800 p-3 rounded-lg text-xs font-semibold mb-4 border border-emerald-100"
              >
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{exitoMsg}</span>
              </motion.div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-3.5 flex-1">
              
              {/* Formulario de Login / Registro / Recuperación */}
              {mode === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nombre</label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          required
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          placeholder="Ej. Juan"
                          className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-accent hover:border-slate-300 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Apellido</label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          required
                          value={apellido}
                          onChange={(e) => setApellido(e.target.value)}
                          placeholder="Ej. Pérez"
                          className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-accent hover:border-slate-300 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Alias (Username)</label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          required
                          value={alias}
                          onChange={(e) => setAlias(e.target.value.replace(/\s+/g, '').toLowerCase())}
                          placeholder="alias_unico"
                          className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-accent hover:border-slate-300 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Cédula Ecuatoriana</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          required
                          maxLength={10}
                          value={cedula}
                          onChange={(e) => setCedula(e.target.value.replace(/\D/g, ''))}
                          placeholder="17xxxxxxxx"
                          className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-accent hover:border-slate-300 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {(mode === 'login' || mode === 'register' || mode === 'forgot' || mode === 'reset_password' || mode === 'verify_otp') && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    {mode === 'login' ? 'Correo Electrónico o Alias' : 'Correo Electrónico'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type={mode === 'login' ? 'text' : 'email'} 
                      required
                      disabled={mode === 'reset_password' || (mode === 'verify_otp' && correo !== '')}
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder={mode === 'login' ? 'correo@ejemplo.com o alias' : 'correo@ejemplo.com'}
                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-accent hover:border-slate-300 transition-colors disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {(mode === 'verify_otp' || mode === 'reset_password') && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Código OTP de 6 dígitos</label>
                  <div className="relative">
                    <Key className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      value={codigoOtp}
                      onChange={(e) => setCodigoOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className="w-full pl-8 pr-2 py-1.5 text-xs font-bold tracking-widest text-center border border-slate-200 rounded-lg focus:outline-none focus:border-accent hover:border-slate-300 transition-colors"
                    />
                  </div>
                </div>
              )}

              {(mode === 'login' || mode === 'register' || mode === 'reset_password') && (
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">
                      {mode === 'reset_password' ? 'Nueva Contraseña' : 'Contraseña'}
                    </label>
                    {mode === 'login' && (
                      <button 
                        type="button"
                        onClick={() => cambiarModo('forgot')}
                        className="text-[10px] font-bold text-accent hover:underline focus:outline-none"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type={verContrasena ? 'text' : 'password'} 
                      required
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-8 pr-9 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-accent hover:border-slate-300 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setVerContrasena(!verContrasena)}
                      className="absolute right-2.5 top-2 p-0.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {verContrasena ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  {(mode === 'register' || mode === 'reset_password') && contrasena.length > 0 && (
                    <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div className="flex items-center space-x-1">
                        <span className={passwordValidation.minLength ? 'text-emerald-500 font-bold' : 'text-slate-300'}>
                          {passwordValidation.minLength ? '✓' : '○'}
                        </span>
                        <span className={passwordValidation.minLength ? 'text-slate-700 font-medium' : 'text-slate-400'}>
                          Mín. 6 caracteres
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={passwordValidation.hasUpper ? 'text-emerald-500 font-bold' : 'text-slate-300'}>
                          {passwordValidation.hasUpper ? '✓' : '○'}
                        </span>
                        <span className={passwordValidation.hasUpper ? 'text-slate-700 font-medium' : 'text-slate-400'}>
                          Una mayúscula
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={passwordValidation.hasLower ? 'text-emerald-500 font-bold' : 'text-slate-300'}>
                          {passwordValidation.hasLower ? '✓' : '○'}
                        </span>
                        <span className={passwordValidation.hasLower ? 'text-slate-700 font-medium' : 'text-slate-400'}>
                          Una minúscula
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={passwordValidation.hasNumber ? 'text-emerald-500 font-bold' : 'text-slate-300'}>
                          {passwordValidation.hasNumber ? '✓' : '○'}
                        </span>
                        <span className={passwordValidation.hasNumber ? 'text-slate-700 font-medium' : 'text-slate-400'}>
                          Un número
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type={verContrasena ? 'text' : 'password'} 
                      required
                      value={confirmarContrasena}
                      onChange={(e) => setConfirmarContrasena(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-8 pr-9 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-accent hover:border-slate-300 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Captcha de Seguridad */}
              {(mode === 'login' || mode === 'register') && (
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Validación Captcha</label>
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-200/70 px-3 py-1.5 rounded font-mono font-bold tracking-widest text-sm text-slate-600 select-none border border-slate-300 line-through decoration-slate-400 italic skew-x-6 cursor-not-allowed">
                      {captchaCodigo}
                    </div>
                    <button 
                      type="button" 
                      onClick={generarCaptcha}
                      className="flex items-center space-x-1 text-[10px] font-bold text-accent hover:underline focus:outline-none"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Cambiar</span>
                    </button>
                  </div>
                  <input 
                    type="text" 
                    required
                    value={captchaIngresado}
                    onChange={(e) => setCaptchaIngresado(e.target.value)}
                    placeholder="Digita el código captcha"
                    className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:border-accent"
                  />
                </div>
              )}

              {/* Botón enviar */}
              <button
                type="submit"
                disabled={cargando || segundosBloqueo > 0 || (segundosBloqueoOtp > 0 && (mode === 'verify_otp' || mode === 'reset_password'))}
                className="w-full mt-4 bg-accent hover:bg-accent-light text-white py-2 px-4 rounded-xl font-bold text-sm transition-colors duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none shadow-md shadow-accent/25"
              >
                {cargando ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : segundosBloqueo > 0 ? (
                  <span>Reintentar en {segundosBloqueo}s</span>
                ) : segundosBloqueoOtp > 0 && (mode === 'verify_otp' || mode === 'reset_password') ? (
                  <span>Reintentar en {segundosBloqueoOtp}s</span>
                ) : (
                  <span>
                    {mode === 'login' && 'Iniciar Sesión'}
                    {mode === 'register' && 'Registrarse'}
                    {mode === 'verify_otp' && 'Verificar Cuenta'}
                    {mode === 'forgot' && 'Enviar Código'}
                    {mode === 'reset_password' && 'Cambiar Contraseña'}
                  </span>
                )}
              </button>
            </form>

            {/* Pie de modal: Alternar modo */}
            <div className="border-t border-slate-100 mt-5 pt-3.5 text-center flex flex-col gap-2">
              {mode === 'login' ? (
                <p className="text-xs text-slate-500 font-medium">
                  ¿No tienes una cuenta aún?{' '}
                  <button 
                    onClick={() => cambiarModo('register')}
                    className="font-bold text-accent hover:underline focus:outline-none"
                  >
                    Regístrate
                  </button>
                </p>
              ) : mode === 'verify_otp' ? (
                <p className="text-xs text-slate-500 font-medium">
                  ¿Deseas intentar de nuevo el registro?{' '}
                  <button 
                    onClick={() => cambiarModo('register')}
                    className="font-bold text-accent hover:underline focus:outline-none"
                  >
                    Volver al Registro
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-500 font-medium">
                  ¿Ya tienes una cuenta o deseas volver?{' '}
                  <button 
                    onClick={() => cambiarModo('login')}
                    className="font-bold text-accent hover:underline focus:outline-none"
                  >
                    Inicia Sesión
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
