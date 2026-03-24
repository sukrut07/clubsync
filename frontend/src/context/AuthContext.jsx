import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('clubsync_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        // Token is optional for simple login initially
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                logout();
            }
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const { data } = await authAPI.login({ email, password });
            setUser(data);
            if (data.token) {
                setToken(data.token);
                localStorage.setItem('clubsync_token', data.token);
            }
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const signup = async (userData) => {
        try {
            const { data } = await authAPI.register(userData);
            setUser(data);
            if (data.token) {
                setToken(data.token);
                localStorage.setItem('clubsync_token', data.token);
            }
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('clubsync_token');
        localStorage.removeItem('user');
    };

    const isAdmin = user?.role === 'admin';
    const isMember = user?.role === 'member';
    const isStudent = user?.role === 'student' || (!isAdmin && !isMember);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            signup,
            logout,
            isAdmin,
            isMember,
            isStudent
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export default AuthContext;
