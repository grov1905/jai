import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<boolean>;
  error?: string | null;
  clearError: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgot: () => void;
  isLoading: boolean;
}

export default function LoginModal({ 
  isOpen,
  onClose, 
  onLogin,
  error,
  clearError,
  onSwitchToRegister,
  onSwitchToForgot,
  isLoading
}: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingLocal(true);
    clearError();
    setLoginSuccess(false);
    
    try {
      const success = await onLogin(username, password);
      if (success) {
        setLoginSuccess(true);
        setTimeout(() => window.location.reload(), 500);
      }
    } finally {
      setIsLoadingLocal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-primary text-xl font-semibold m-0">Iniciar sesión</h2>
          <button 
            className="bg-transparent border-none text-gray-600 text-xl cursor-pointer transition-colors hover:text-red-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded mb-5 text-sm">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {loginSuccess && (
          <div className="flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded mb-5 text-sm animate-fadeIn">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
            </svg>
            <span>¡Login exitoso! Redirigiendo...</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-primary text-sm font-medium mb-2">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="password" className="block text-primary text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || isLoadingLocal}
            className={`w-full p-3 bg-primary text-white rounded font-medium ${
              (isLoading || isLoadingLocal) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
            }`}
          >
            {(isLoading || isLoadingLocal) ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        
        <div className="mt-5 pt-5 border-t border-gray-200 text-sm text-center">
          <div className="flex flex-col items-center gap-3">
            <button 
              type="button"
              className="bg-transparent border-none text-gray-600 text-xs cursor-pointer transition-colors hover:text-primary hover:underline"
              onClick={onSwitchToForgot}
            >
              ¿Olvidaste tu contraseña?
            </button>
            <span>¿No tienes cuenta? </span>
            <button 
              type="button"
              className="bg-transparent border-none text-primary font-medium cursor-pointer underline text-sm"
              onClick={onSwitchToRegister}
            >
              Regístrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}