import React from 'react';
import Router from 'next/router';
import { useFetchUser } from '../../utils/user';

const AuthLayer = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { user, loading } = useFetchUser();

  if (!user && !loading) {
    Router.replace('/');
  }

  return user ? children : <></>;
};

export default AuthLayer;
