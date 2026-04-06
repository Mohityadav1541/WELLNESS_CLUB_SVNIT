import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/api';
import { toast } from 'sonner';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'admin' | 'superadmin';
    admissionNumber?: string;
    whatsappNumber?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: any) => Promise<any>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load user from local storage or fetch profile
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }

            setIsLoading(false);
        };

        loadUser();
    }, []);

    const login = async (userData: any) => {
        try {
            setIsLoading(true);
            const res = await api.post('/auth/login', userData);

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setToken(token);
            setUser(user);
            setIsAuthenticated(true);

            toast.success('Login successful!');
            return res.data;
        } catch (error: any) {
            console.error('Login error:', error);
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: any) => {
        try {
            setIsLoading(true);
            const res = await api.post('/auth/register', userData);

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setToken(token);
            setUser(user);
            setIsAuthenticated(true);

            toast.success('Registration successful!');
        } catch (error: any) {
            console.error('Registration error:', error);
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                isLoading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
