import React, { useState, useEffect } from 'react';
import useDebounce from 'react-use/lib/useDebounce';
import Axios from 'axios';
import { useToast, Input, Flex, InputGroup, InputRightElement, Box, Spinner, Text, Button } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { NextPage } from 'next';
import AuthLayer from '../../Components/AuthLayer';
import SettingsPage from '../../Components/SettingsPage';
import Loader from '../../Components/Loader';

const SETTINGS_USERNAME = '/api/settings/username';

/**
 * @name getCurrentUsername
 * @description It is a function that retrieves a HackerStat user's username.
 * @author @LouisIV
 * @returns {string}
 */
export const getCurrentUsername = async (): Promise<string> => {
  const result = await Axios.get(SETTINGS_USERNAME);
  return result.data?.username;
};

/**
 * @name UsernameSettingsPage
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
      const result = await Axios.post(SETTINGS_USERNAME, {
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
    const USERNAME_PICKER = '/api/usernamepicker';

    if (!newUsername) {
      return false;
    }

    try {
      setCheckingUsername(true);
      const result = await Axios.get(USERNAME_PICKER, {
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
    1000,
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
                <CheckIcon color="green.500" />
              ) : (
                <CloseIcon name="close" color="red.500" />
              )
            ) : null}
          </InputRightElement>
        </InputGroup>
        <Box minH="25px" maxW="100%">
          <Text fontSize="md" opacity={0.5}>
            {checkingUsername || username === currentUsername
              ? null
              : usernameAvailable
              ? 'This username is available!'
              : "It looks like that username isn't available"}
          </Text>
        </Box>
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
