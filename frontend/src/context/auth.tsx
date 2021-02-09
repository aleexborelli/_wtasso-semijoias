import React, { createContext, useCallback, useState } from 'react';
import ICredentiasl from '../interfaces/credentials';
import api from '../services/api';

interface IUser {
  id: string;
  nome: string;
  email: string;
  active: string;
  created_at: Date | string;
  updated_at: Date | string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface IAuthContextState {
  user: IUser;
  signIn(credentials: ICredentiasl): Promise<void>;
}

export const AuthContext = createContext<IAuthContextState>(
  {} as IAuthContextState,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('SemiJoiasToken');
    const user = localStorage.getItem('SemiJoiasUser');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async (credentials: ICredentiasl) => {
    const response = await api.post('/sessions', credentials);

    const { token, user } = response.data;

    localStorage.setItem('SemiJoiasToken', token);
    localStorage.setItem('SemiJoiasUser', JSON.stringify(user));

    setData({
      token,
      user,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};
