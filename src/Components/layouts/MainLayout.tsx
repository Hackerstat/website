import React, { FunctionComponent } from 'react';
import { ReactNode } from 'react';
import Navbar from '../NavBar';
import { UserProvider, useFetchUser } from '../../utils/user';

export const MainLayout: FunctionComponent = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useFetchUser();
  return (
    <UserProvider value={{ user, loading }}>
      <Navbar />
      {children}
    </UserProvider>
  );
};
