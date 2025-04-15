import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, AuthResponse, AuthError } from '@/types/auth';

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<AuthError | null>(null);

  const fetchUserData = async (token: string): Promise<User | null> => {
    try {
      const response = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/private/me/`,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );

      const normalizedUser: User = {
        id: response.data.id,
        username: response.data.username || '',
        email: response.data.email || '',
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        avatar_url: response.data.avatar_url || null,
        biografia: response.data.biografia || null,
        estado: response.data.estado || 'activo',
        is_staff: response.data.is_staff || false,
        is_superuser: response.data.is_superuser || false,
        last_login: response.data.last_login || new Date().toISOString(),
        date_joined: response.data.date_joined || new Date().toISOString(),
        phone: response.data.phone || null,
        company: response.data.company || null
      };

      setUser(normalizedUser);
      return normalizedUser;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      
      let status: number | undefined;
      let details: string | Record<string, unknown> | undefined;

      if (axios.isAxiosError(error)) {
        status = error.response?.status;
        details = error.response?.data;
      }

      setAuthError({
        message: 'Error al cargar datos del usuario',
        status,
        details: details 
          ? typeof details === 'string' 
            ? details 
            : JSON.stringify(details)
          : undefined
      });
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await fetchUserData(token);
        if (!userData) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      } catch (error) {
        console.error('Error inicializando autenticación:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    try {
      setIsLoading(true);
      setAuthError(null);

      const loginResponse = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/private/login/`,
        credentials,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
          validateStatus: (status) => status === 200
        }
      );

      localStorage.setItem('access_token', loginResponse.data.access);
      localStorage.setItem('refresh_token', loginResponse.data.refresh);

      const userData = await fetchUserData(loginResponse.data.access);
      if (!userData) return false;

      setUser(userData);
      return true;
    } catch (error) {
      let message = 'Error de conexión';
      let status: number | undefined;
      let details: string | undefined;

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.detail || 
                 (error.response?.status === 401 ? 'Credenciales incorrectas' : 'Error en el servidor');
        status = error.response?.status;
        details = typeof error.response?.data === 'object' 
          ? JSON.stringify(error.response.data)
          : error.response?.data;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setAuthError({ 
        message,
        status,
        details
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      setAuthError(null);
  
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/private/usuarios/`,
        userData,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );
  
      return true;
    } catch (error) {
      let message = 'Error en el registro';
      let status: number | undefined;
      let details: string | undefined;

      if (axios.isAxiosError(error)) {
        status = error.response?.status;
        const responseData = error.response?.data;

        if (typeof responseData === 'object' && responseData !== null) {
          const fieldErrors = Object.entries(responseData)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
          
          details = fieldErrors;
          message = fieldErrors || message;
        } else {
          message = typeof responseData === 'string' 
            ? responseData 
            : message;
        }
      }

      setAuthError({
        message,
        status,
        details
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setAuthError(null);
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setAuthError(null);

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/private/forgot-password/`,
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        }
      );

      return true;
    } catch (error) {
      let message = 'Error al solicitar recuperación';
      let status: number | undefined;
      let details: string | undefined;

      if (axios.isAxiosError(error)) {
        message = typeof error.response?.data?.detail === 'string'
          ? error.response.data.detail
          : message;
        status = error.response?.status;
        details = typeof error.response?.data === 'object'
          ? JSON.stringify(error.response.data)
          : error.response?.data;
      }

      setAuthError({
        message,
        status,
        details
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    user, 
    isLoading,
    authError,
    login, 
    register,
    logout,
    clearError: () => setAuthError(null),
    forgotPassword
  };
}