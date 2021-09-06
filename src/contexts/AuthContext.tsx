import React, { createContext, useCallback, useEffect, useState } from 'react';
import Api from '../services/api';

import User from '../domains/User';
import { SignInCredentials } from '../dtos/SignInCredentials';

interface AuthState {
  token: string;
  user: User;
}

export interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MaisCidadao:token');
    const user = localStorage.getItem('@MaisCidadao:user');

    if (token && user) {
      Api.setAuthorizationToken(token);

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  useEffect(() => {
    /* const token = localStorage.getItem('@MaisCidadao:token');

    if (token) {
      Api.post('verify_token', { token }).catch(() => {
        setData({} as AuthState);
      });
    } */
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await Api.post('sessions', { email, password });

    const { token, user } = response.data as AuthState;

    localStorage.setItem('@MaisCidadao:token', token);
    localStorage.setItem('@MaisCidadao:user', JSON.stringify(user));

    Api.setAuthorizationToken(token);
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@MaisCidadao:token');
    localStorage.removeItem('@MaisCidadao:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
      localStorage.setItem('@MaisCidadao:user', JSON.stringify(user));
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
