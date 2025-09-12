import React, { createContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/helpers';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setUser({});
    }
    setLoading(false);
  }, [token]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    setTokenState(jwtToken);
  };

  const logout = () => {
    setUser(null);
    removeToken();
    setTokenState(null);
  };



  return (
  <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
