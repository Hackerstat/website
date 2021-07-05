import React from 'react';
import { useFetchUser } from '../utils/user';
import { Button, Text } from './../../node_modules/@chakra-ui/react';
import AuthLayer from '../Components/AuthLayer';

/**
 * @REDO
 * @name Profile
 * @description This is the component that shows the current user's profile.
 * @author @Cgunter1
 * @returns {FunctionComponent}
 */
export default function Profile(): JSX.Element {
  const { user } = useFetchUser();

  return (
    <AuthLayer>
      <>
        <h1>🤸</h1>
        <p>Welcome to the Profile Page! Here is your profile information:</p>
        <p>{JSON.stringify(user)}</p>
        <Button>
          <Text>Hello</Text>
        </Button>
        <Button
          onClick={() => {
            fetch('/api/userinfo', {
              credentials: 'same-origin',
              method: 'POST',
              body: JSON.stringify({ username: 'louislombardoiv@gmail.co' }),
            })
              .then(async (res) => {
                console.log(await res.json());
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        >
          <Text>Bye</Text>
        </Button>
      </>
    </AuthLayer>
  );
}
