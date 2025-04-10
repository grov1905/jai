import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  // No necesita `login` como prop
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Define `login` internamente
  const login = async (credentials) => {
    try {
      const result = await api.login(credentials);
      if (result.access) {
//        console.log("access ", result.access);
        localStorage.setItem('authToken', result.access);
        setAuthToken(result.access);
        navigate('/admin');  // Redirige después del login
      }
      return result;
    } catch (error) {
      return { success: false, message: "Error en el servidor" };
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken) {
        try {
          const user = await api.getCurrentUser(authToken);
          setCurrentUser(user);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [authToken]);

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setCurrentUser(null);
  };

  const value = {
    authToken,
    currentUser,
    login,  // Función definida arriba
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);