/* eslint-disable no-underscore-dangle */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import api from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/model/User';

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
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
  signOut: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({} as User);

  const signIn = useCallback(async ({ email, password }): Promise<void> => {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { user, token } = response.data;

      if (user && token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        const userCollection = database.get<ModelUser>('users');

        await database.write(async () => {
          await userCollection.create((newUser) => {
            newUser.user_id = user.id;
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.driver_license = user.driver_license;
            newUser.avatar = user.avatar;
            newUser.token = token;
          });
        });

        setData({ ...user, token });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);

        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error: any) {
      throw new Error(error);
    }
  }, [data.id]);

  const updateUser = useCallback(async (user: User) => {
    try {
      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);

        await userSelected.update((userData) => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }, []);

  const loadUserData = useCallback(async () => {
    const userCollection = database.get<ModelUser>('users');
    const response = await userCollection.query().fetch();

    if (response.length > 0) {
      const userData = response[0]._raw as unknown as User;
      api.defaults.headers.common.authorization = `Bearer ${userData.token}`;

      setData(userData);
    }
  }, []);

  const value = useMemo(() => ({
    user: data,
    signIn,
    signOut,
    updateUser,
  }), [data, signIn, signOut, updateUser]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

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
