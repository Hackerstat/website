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
  Text,
  FormErrorMessage,
  Box,
  Grid,
  useToast,
} from '@chakra-ui/core';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import { faNpm, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';

const AddMediumIntegrationPage: FunctionComponent = () => {
  const [username, setUsername] = useState<string>();
  const [fetchError, setFetchError] = useState<string>();

  const [twitterName, setTwitterName] = useState();

  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);

  const toast = useToast();

  const CheckForHackerStatFile = async (username) => {
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

  const addMediumAccount = async (username) => {
    try {
      await Axios.post('/api/integration', {
        integrationType: 'medium',
        settings: { username: username },
      });
      toast({
        title: 'Added Integration',
        status: 'success',
        description: 'We added this integration to your account',
      });
    } catch (err) {
      toast({
        title: 'Something Went Wrong',
        status: 'error',
        description: 'Could not add integration to your account. Please try again later.',
      });
    }
  };

  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <Flex mb={4}>
        <FontAwesomeIcon icon={faMedium} size={'3x'} />
        <Heading ml={3}>Medium</Heading>
      </Flex>
      <Stack spacing={3}>
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>Medium Username</FormLabel>
          <Input placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={fetchingHackerFile}
          onClick={() => {
            setFetchingHackerFile(true);
            try {
              CheckForHackerStatFile(username);
            } catch (err) {
              console.log(err);
            } finally {
              setFetchingHackerFile(false);
            }
          }}
        >
          Get Posts
        </Button>

        <Button
          isDisabled={fetchingHackerFile}
          onClick={() => {
            addMediumAccount(username);
          }}
        >
          Add Medium
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
      <SettingsPage>{mounted ? <AddMediumIntegrationPage /> : <Loader />}</SettingsPage>
    </>
  );
};

export default IntegrationsPage;
