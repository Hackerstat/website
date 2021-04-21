import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, Input, FormLabel, FormControl, Heading, Button, Stack, FormErrorMessage } from '@chakra-ui/core';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TwitterCard from '../../../../Components/Dashboard/Twitter';
import Axios from 'axios';

const AddTwitterIntegrationPage: FunctionComponent = () => {
  useEffect(() => {
    Axios.get('/api/twitter/getUsername').then((res) => setUsername(res.data?.username));
  }, []);

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [twitterName, setTwitterName] = useState<string>('');
  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);

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

  const addTwitterToAccount = async (username: string) => {
    await Axios.post('/api/integration', {
      integrationType: 'twitter',
      settings: { username: username },
    });
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
        {twitterName && <TwitterCard screenName={username} />}
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
      <SettingsPage>{mounted ? <AddTwitterIntegrationPage /> : <Loader />}</SettingsPage>
    </>
  );
};

export default IntegrationsPage;
