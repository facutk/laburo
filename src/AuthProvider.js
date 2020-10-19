import React, { useState } from 'react';

import AuthContext from './AuthContext';

const AuthProvider = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      });
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
