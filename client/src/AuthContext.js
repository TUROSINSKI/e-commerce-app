// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            const userString = localStorage.getItem('user');
            if (userString) {
                const user = JSON.parse(userString);
                setUserData(user);
                setIsLoggedIn(true);
            }
        }
    }, [])


    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setUserData(user);
            setIsLoggedIn(true);
        }

    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        setUserData(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
