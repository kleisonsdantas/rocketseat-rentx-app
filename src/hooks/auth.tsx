import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  // eslint-disable-next-line no-unused-vars
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({} as AuthState);

  const signIn = useCallback(async ({ email, password }): Promise<void> => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    if (user && token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setData({ user, token });
    }
  }, []);

  const value = useMemo(() => ({
    user: data.user,
    signIn,
  }), [data, signIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
