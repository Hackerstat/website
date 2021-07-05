import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import {
  Flex,
  Input,
  FormLabel,
  FormControl,
  Heading,
  Button,
  Stack,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TwitterCard from '../../../../Components/Dashboard/Twitter';
import AuthLayer from '../../../../Components/AuthLayer';
import { goodToast, badToast } from '../../../../utils/constants';
import Axios from 'axios';

/**
 * @name AddTwitterIntegrationPage
 * @description It is the component that displays a user's Twitter integration and adds a user's Twitter integration to their HackerStat Profile.
 * @author @LouisIV @Cgunter
 * @returns {FunctionComponent}
 */
const AddTwitterIntegrationPage: FunctionComponent = () => {
  useEffect(() => {
    Axios.get('/api/twitter/getUsername')
      .then((res) => setUsername(res.data?.username))
      .catch((e) => console.error(e));
  }, []);

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [twitterName, setTwitterName] = useState<string>('');
  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const toast = useToast();

  /**
   * @name setTwitterUsername
   * @description It is the function that checks if the Twitter username input is empty or not.
   * @author @Cgunter1
   * @param {string} username It is the HackerStat user's given Twitter username.
   * @returns {void}
   */
  const setTwitterUsername = async (username: string) => {
    try {
      if (!username) {
        setFetchError('Required');
        return;
      }

      setTwitterName(username);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @name addTwitterToAccount
   * @description It is the function that sets the Twitter username to the user's HackerStat account.
   * @author @Cgunter1
   * @param {string} username It is the HackerStat user's given Twitter username.
   * @returns {void}
   */
  const addTwitterToAccount = async (username: string) => {
    try {
      await Axios.post('/api/integration', {
        integrationType: 'twitter',
        settings: { username: username },
      });
      toast(goodToast as unknown);
    } catch (e) {
      toast(badToast as unknown);
    }
  };

  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <Flex mb={4}>
        <FontAwesomeIcon icon={faTwitter} size={'3x'} />
        <Heading ml={3}>Twitter</Heading>
      </Flex>
      <Stack spacing={3}>
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>Twitter Username</FormLabel>
          <Input value={username} placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={fetchingHackerFile}
          onClick={() => {
            setFetchingHackerFile(true);
            try {
              setTwitterUsername(username);
            } catch (err) {
              console.log(err);
            } finally {
              setFetchingHackerFile(false);
            }
          }}
        >
          Get Tweets
        </Button>
        <Flex w="100%" justifyContent="center">
          {twitterName && <TwitterCard screenName={username} />}
        </Flex>
        <Button
          isDisabled={fetchingHackerFile || !username}
          onClick={() => {
            addTwitterToAccount(username);
          }}
        >
          Add Twitter
        </Button>
      </Stack>
    </Flex>
  );
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <AuthLayer>
        <SettingsPage>{mounted ? <AddTwitterIntegrationPage /> : <Loader />}</SettingsPage>
      </AuthLayer>
    </>
  );
};

export default IntegrationsPage;
