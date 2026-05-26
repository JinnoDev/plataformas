import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { authApi, usersApi } from '../services/api';
interface User {
  _id: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  followersCount: number;
  followingCount: number;
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async (): Promise<User | null> => {
    try {
      const res = await usersApi.getMe();
      return res.data;
    } catch (err: any) {
      if (err?.response?.status === 401) {
        await AsyncStorage.removeItem('accessToken');
      }
      return null;
    }
  };

  const refreshUser = async () => {
    const me = await fetchMe();
    setUser(me);
  };

  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) { setLoading(false); return; }
      const me = await fetchMe();
      setUser(me);
      setLoading(false);
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    await AsyncStorage.removeItem('accessToken');
    setUser(null);
    const res = await authApi.login({ email, password });
    await AsyncStorage.setItem('accessToken', res.data.accessToken);
    const me = await fetchMe();
    setUser(me);
  };

  const register = async (email: string, username: string, password: string) => {
    await AsyncStorage.removeItem('accessToken');
    setUser(null);
    const res = await authApi.register({ email, username, password });
    await AsyncStorage.setItem('accessToken', res.data.accessToken);
    const me = await fetchMe();
    setUser(me);
  };

  const logout = async () => {
    try { await authApi.logout(); } catch {}
    await AsyncStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export type { User };
