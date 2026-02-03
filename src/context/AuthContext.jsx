import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/me', {
                    headers: { 'Accept': 'application/json' },
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok && data.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Session check failed:', error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            setUser(data.user);
            return { success: true };
        } else {
            return { success: false, error: data.error };
        }
    };

    const signup = async (name, email, password) => {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            setUser(data.user);
            return { success: true };
        } else {
            return { success: false, error: data.error };
        }
    };

    const logout = async () => {
        await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
