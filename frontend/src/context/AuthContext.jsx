import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for existing token
  useEffect(() => {
    const token = localStorage.getItem('farmhelper-token');
    const userData = localStorage.getItem('farmhelper-user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem('farmhelper-token');
        localStorage.removeItem('farmhelper-user');
      }
    }
    setLoading(false);
  }, []);

  const saveAuth = (data) => {
    localStorage.setItem('farmhelper-token', data.token);
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      avatar: data.avatar || null,
    };
    localStorage.setItem('farmhelper-user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    saveAuth(response.data);
    return response.data;
  };

  const signup = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    saveAuth(response.data);
    return response.data;
  };

  const googleLogin = async (credential) => {
    const response = await api.post('/auth/google', { credential });
    saveAuth(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('farmhelper-token');
    localStorage.removeItem('farmhelper-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
