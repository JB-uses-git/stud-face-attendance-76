import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, mockUsers } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('attendanceUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser) {
        let expectedPassword = '';
        switch (foundUser.role) {
          case 'teacher':
            expectedPassword = 'teacher@markme';
            break;
          case 'student':
            expectedPassword = 'student@markme';
            break;
          case 'admin':
            expectedPassword = 'admin@markme';
            break;
        }
        
        if (password === expectedPassword) {
          setUser(foundUser);
          localStorage.setItem('attendanceUser', JSON.stringify(foundUser));
          toast({
            title: "Login successful!",
            description: `Welcome back, ${foundUser.name}`,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('attendanceUser');
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};