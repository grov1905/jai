import { useState, useEffect } from 'react';
import AuthModals from './AuthModals';
import { useAuthContext } from '@/context/AuthContext';

export default function Login() {
  const [showAuthModals, setShowAuthModals] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const { user, logout, isLoading: authLoading } = useAuthContext();

  // Debug: Verificar cambios en el estado del usuario
  useEffect(() => {
//    console.log("User state in Login component:", user);
  }, [user]);

  const handleAuthModalClose = () => {
    setShowAuthModals(false);
    setAuthMode('login');
  };

  return (
    <div className="absolute top-[10px] right-[10px] z-[100]">
      {authLoading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm text-gray-500">Cargando...</span>
        </div>
      ) : user ? (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs text-gray-600">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-700">
            Hola, {user.username}
          </span>
          <button 
            className="text-primary hover:underline ml-2 text-sm"
            onClick={logout}
            aria-label="Cerrar sesión"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <>
          <button 
            className="text-primary hover:underline text-sm"
            onClick={() => {
              setShowAuthModals(true);
              setAuthMode('login');
            }}
            aria-label="Iniciar sesión"
          >
            Iniciar sesión
          </button>

          {showAuthModals && (
            <AuthModals 
              initialMode={authMode}
              onClose={handleAuthModalClose}
            />
          )}
        </>
      )}
    </div>
  );
}
