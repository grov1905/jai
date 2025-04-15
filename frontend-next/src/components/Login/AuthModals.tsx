import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import useAuth from '@/hooks/useAuth';

interface AuthModalsProps {
  initialMode?: 'login' | 'register' | 'forgot';
  onClose: () => void;
  globalLoading?: boolean;
}

export default function AuthModals({ 
  initialMode = 'login', 
  onClose,
  globalLoading = false
}: AuthModalsProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const { 
    login,
    register,
    authError,
    clearError,
    isLoading,
    forgotPassword
  } = useAuth();

  const combinedIsLoading = globalLoading || isLoading;

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const success = await login({ username, password });
      if (success) {
        onClose();
      }
      return success;
    } catch {
      return false;
    }
  };

  const handleRegister = async (formData: {
    username: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const success = await register(formData);
      if (success) {
        setMode('login');
      }
      return success;
    } catch {
      return false;
    }
  };

  const handleForgotPassword = async (email: string): Promise<boolean> => {
    try {
      return await forgotPassword(email);
    } catch {
      return false;
    }
  };

  return (
    <>
      {mode === 'login' && (
        <LoginModal
          isOpen={true}
          onClose={onClose}
          onLogin={handleLogin}
          error={authError?.message}
          clearError={clearError}
          onSwitchToRegister={() => {
            clearError();
            setMode('register');
          }}
          onSwitchToForgot={() => {
            clearError();
            setMode('forgot');
          }}
          isLoading={combinedIsLoading}
        />
      )}

      {mode === 'register' && (
        <RegisterModal
          isOpen={true}
          onClose={onClose}
          onRegister={handleRegister}
          error={authError?.message}
          clearError={clearError}
          onSwitchToLogin={() => {
            clearError();
            setMode('login');
          }}
          isLoading={combinedIsLoading}
        />
      )}

      {mode === 'forgot' && (
        <ForgotPasswordModal
          isOpen={true}
          onClose={onClose}
          onSubmit={handleForgotPassword}
          error={authError?.message}
          clearError={clearError}
          onSwitchToLogin={() => {
            clearError();
            setMode('login');
          }}
          isLoading={combinedIsLoading}
        />
      )}
    </>
  );
}