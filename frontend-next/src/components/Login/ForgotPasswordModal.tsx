import { useState } from 'react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<boolean>;
  error?: string | null;
  clearError: () => void;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

export default function ForgotPasswordModal({ 
  isOpen,
  onClose, 
  onSubmit,
  error,
  clearError,
  onSwitchToLogin
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    
    const success = await onSubmit(email);
    setIsLoading(false);
    
    if (success) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg text-center">
          <svg className="w-12 h-12 mx-auto mb-4 text-green-500" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          <h3 className="text-green-500 text-xl mb-2">¡Correo enviado!</h3>
          <p className="text-gray-600 mb-4">Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico.</p>
          <button
            onClick={onSwitchToLogin}
            className="w-full p-3 bg-primary text-white rounded font-medium hover:bg-primary/90"
          >
            Volver a inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-primary text-xl font-semibold m-0">Recuperar contraseña</h2>
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
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-primary text-sm font-medium mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full p-3 bg-primary text-white rounded font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'}`}
          >
            {isLoading ? 'Enviando...' : 'Enviar enlace'}
          </button>
        </form>
        
        <div className="mt-5 pt-5 border-t border-gray-200 text-sm text-center">
          <button 
            type="button"
            className="bg-transparent border-none text-primary font-medium cursor-pointer underline"
            onClick={onSwitchToLogin}
          >
            Volver a inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}