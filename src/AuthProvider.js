import React, { useState, useEffect } from 'react';

import { Splash } from './components';
import AuthContext from './AuthContext';

const AuthProvider = ({
  children
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/user/profile")
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const authenticate = async ({ email, password }) => {
    return fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email, password
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        setIsAuthenticated(true);
      })
  }

  const signout = async () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout
      }}
    >
      {
        isLoading
          ? <Splash />
          : children
      }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
