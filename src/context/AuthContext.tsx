import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, usersApi } from '../services/api';

const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web') return localStorage.getItem(key);
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') return localStorage.setItem(key, value);
    return AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (Platform.OS === 'web') return localStorage.removeItem(key);
    return AsyncStorage.removeItem(key);
  },
};

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
        await storage.removeItem('accessToken');
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
      try {
        const token = await storage.getItem('accessToken');
        if (!token) { setLoading(false); return; }
        const me = await Promise.race([
          fetchMe(),
          new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000))
        ]);
        setUser(me);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    await storage.removeItem('accessToken');
    setUser(null);
    const res = await authApi.login({ email, password });
    await storage.setItem('accessToken', res.data.accessToken);
    const me = await fetchMe();
    setUser(me);
  };

  const register = async (email: string, username: string, password: string) => {
    await storage.removeItem('accessToken');
    setUser(null);
    const res = await authApi.register({ email, username, password });
    await storage.setItem('accessToken', res.data.accessToken);
    const me = await fetchMe();
    setUser(me);
  };

  const logout = async () => {
    try { await authApi.logout(); } catch {}
    await storage.removeItem('accessToken');
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