import React from 'react';
import Router from 'next/router';
import { useFetchUser } from '../../utils/user';

/**
 * @name AuthLayer
 * @description This is the component wrapper used for pages that are only allowed if you are authenticated. If you access a private webpage, this wrapper checks if you are an authenticated user. If not, you are redirected to the home page.
 * @author @Cgunter1
 * @param {CardProps} props This is the object for the AuthLayer object props.
 * @param {JSX.Element} children This is the wrapped component that is the highest level component of the authenticated component.
 * @returns {JSX.Element}
 */
const AuthLayer = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { user, loading } = useFetchUser();

  if (!user && !loading) {
    Router.replace('/');
  }

  return user ? children : <></>;
};

export default AuthLayer;
