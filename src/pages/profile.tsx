import React from 'react';
import { useFetchUser } from '../utils/user';
import { Button, Text } from './../../node_modules/@chakra-ui/core';
import Router from 'next/router';

export default function Profile() {
  const { user, loading } = useFetchUser();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user && !loading) {
    Router.replace('/');
  }

  return (
    <>
      <h1>🤸</h1>
      <p>Welcome to the Profile Page! Here is your profile information:</p>
      <p>{JSON.stringify(user)}</p>
      {/* <Button
        onClick={() => {
          fetch('/api/integration', {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify({ integrationType: 'github', username: 'cgunter1' }),
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      > */}
      {/* <Text>Hello</Text>
      </Button> */}
    </>
  );
}
