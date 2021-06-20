import React, { useState, useEffect } from 'react';
import useDebounce from 'react-use/lib/useDebounce';
import Axios from 'axios';
import {
  useToast,
  Input,
  Flex,
  InputGroup,
  InputRightElement,
  Icon,
  Spinner,
  FormHelperText,
  Button,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import AuthLayer from '../../Components/AuthLayer';
import SettingsPage from '../../Components/SettingsPage';
import Loader from '../../Components/Loader';
// import { getCurrentUsername } from '../../utils';

/**
 * @name getCurrentUsername
 * @description It is a function that retrieves a HackerStat user's username.
 * @author @LouisIV
 * @returns {string}
 */
export const getCurrentUsername = async (): Promise<string> => {
  const result = await Axios.get('/api/settings/username');
  return result.data?.username;
};

/**
 * @name username
 * @description This is a component that displays a user's username and gives the ability to edit the user's username.
 * @author @LouisIV
 * @returns {FunctionComponent}
 */
const UsernameSettingsPage = () => {
  const [currentUsername, setCurrentUsername] = useState<string>();
  const [username, setUsername] = useState<string>();

  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);
  const [settingUsername, setSettingUsername] = useState<boolean>(false);

  // Get the current username
  useEffect(() => {
    getCurrentUsername()
      .then((fetchedUsername) => {
        setCurrentUsername(fetchedUsername);
        setUsername(fetchedUsername);
      })
      .catch((err) => console.error(err));
  }, []);

  const toast = useToast();

  /**
   * @name updateUsername
   * @description It is a function that sets a username for a user's HackerStat Profile.
   * @author @LouisIV
   * @param {string} newUsername It is a username given by the HackerStat user to update their username.
   * @returns {boolean}
   */
  const updateUsername = async (newUsername: string): Promise<boolean> => {
    if (!newUsername) {
      return false;
    }

    try {
      setSettingUsername(true);
      const result = await Axios.post('/api/settings/username', {
        newUsername: newUsername,
      });
      toast({
        status: 'success',
        title: 'Changed Username',
        description: 'Your username was updated',
      });

      return result?.data?.result || false;
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error',
        description: 'Something went changing your username',
      });
      console.error(err);
      return false;
    } finally {
      setSettingUsername(false);
    }
  };

  /**
   * @name checkUsername
   * @description It is a function that checks if a username is already taken by another HackerStat user.
   * @author @LouisIV
   * @param {string} newUsername It is a username given by the HackerStat user to check the availability of their username.
   * @returns {boolean}
   */
  const checkUsername = async (newUsername: string): Promise<boolean> => {
    if (!newUsername) {
      return false;
    }

    try {
      setCheckingUsername(true);
      const result = await Axios.get('/api/usernamepicker', {
        params: {
          newUsername: newUsername,
        },
      });
      return result?.data?.result || false;
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error',
        description: 'Something went wrong checking if that username was available',
      });
      return false;
    } finally {
      setCheckingUsername(false);
    }
  };

  const [debounceState, cancel] = useDebounce(
    () => {
      if (!username) {
        return;
      }

      checkUsername(username).then((value) => {
        setUsernameAvailable(value);
      });
    },
    2000,
    [username],
  );

  return (
    <AuthLayer>
      <Flex flexDirection={'column'} width={'100%'}>
        <InputGroup>
          <Input
            placeholder={'username'}
            defaultValue={currentUsername}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputRightElement>
            {checkingUsername ? (
              <Spinner />
            ) : username !== currentUsername ? (
              usernameAvailable ? (
                <Icon name="check" color="green.500" />
              ) : (
                <Icon name="close" color="red.500" />
              )
            ) : null}
          </InputRightElement>
        </InputGroup>
        <FormHelperText>
          {checkingUsername || username === currentUsername
            ? null
            : usernameAvailable
            ? `${username} is available!`
            : "It looks like that username isn't available"}
        </FormHelperText>
        <Button
          mt={3}
          isDisabled={checkingUsername || !usernameAvailable}
          isLoading={checkingUsername || settingUsername}
          onClick={() => {
            updateUsername(username);
          }}
        >
          Change Username
        </Button>
      </Flex>
    </AuthLayer>
  );
};

const UsernamePickerPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <SettingsPage>{mounted ? <UsernameSettingsPage /> : <Loader />}</SettingsPage>;
};

export default UsernamePickerPage;
