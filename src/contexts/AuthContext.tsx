
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  restaurant_id: string;
  restaurant_name: string;
  restaurant_slug: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, restaurantName: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  subscribed: boolean;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  // Mock data - replace with Supabase when connected
  const mockUsers = [
    {
      id: '1',
      email: 'admin@restaurante.com',
      password: '123456',
      restaurant_id: '1',
      restaurant_name: 'Restaurante Demo',
      restaurant_slug: 'restaurante-demo'
    }
  ];

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mesa_facil_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setSubscribed(true); // Mock subscription
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    if (!mockUser) {
      throw new Error('Credenciais inválidas');
    }
    
    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword);
    localStorage.setItem('mesa_facil_user', JSON.stringify(userWithoutPassword));
    setSubscribed(true);
  };

  const register = async (email: string, password: string, restaurantName: string) => {
    const restaurantSlug = restaurantName.toLowerCase().replace(/\s+/g, '-');
    const newUser = {
      id: Date.now().toString(),
      email,
      restaurant_id: Date.now().toString(),
      restaurant_name: restaurantName,
      restaurant_slug: restaurantSlug
    };
    
    setUser(newUser);
    localStorage.setItem('mesa_facil_user', JSON.stringify(newUser));
    setSubscribed(false); // New users need to subscribe
  };

  const logout = () => {
    setUser(null);
    setSubscribed(false);
    localStorage.removeItem('mesa_facil_user');
  };

  const checkSubscription = async () => {
    // Mock subscription check - replace with Stripe integration
    setSubscribed(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      subscribed,
      checkSubscription
    }}>
      {children}
    </AuthContext.Provider>
  );
};
