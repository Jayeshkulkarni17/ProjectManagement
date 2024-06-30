import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext with a default value
const AuthContext = createContext(undefined);

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(() => JSON.parse(localStorage.getItem("isAuthenticated") || 'false'));
    const [token, setToken] = useState(() => localStorage.getItem("token") || '');

    useEffect(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const handleLoginAuth = () => {
        setAuthenticated(true);
        setToken("sdfsf");
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem("token", "sdfsf");
    };
    
    const handleLogoutAuth = () => {
        setAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, handleLoginAuth, handleLogoutAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Define and export the useAuth hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
