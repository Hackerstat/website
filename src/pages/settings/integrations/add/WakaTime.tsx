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
} from '@chakra-ui/core';
import { CollapseableInstruction } from '../../../../Components/WakaTime/CollapseInstructionBox';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import { goodToast, badToast } from '../../../../utils/constants';
import Axios from 'axios';

const AddTwitterIntegrationPage: FunctionComponent = () => {
  const [fetchError, setFetchError] = useState<string>();
  const [wakaTimeURL, setWakaTimeURL] = useState<string>('');
  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const toast = useToast();

  const setTwitterUsername = async (username: string) => {
    try {
      if (!username) {
        setFetchError('Required');
        return;
      }

      // setTwitterName(username);
    } catch (err) {
      console.log(err);
    }
  };

  // const addTwitterToAccount = async (username: string) => {
  //   try {
  //     await Axios.post('/api/integration', {
  //       integrationType: 'twitter',
  //       settings: { username: username },
  //     });
  //     toast(goodToast as unknown);
  //   } catch (e) {
  //     toast(badToast as unknown);
  //   }
  // };

  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <Flex mb={4}>
        <Heading>WakaTime</Heading>
      </Flex>
      <Stack spacing={3}>
        <CollapseableInstruction />
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>WakaTimeURL</FormLabel>
          <Input value={wakaTimeURL} placeholder={'URL'} onChange={(e) => setWakaTimeURL(e.target.value)} />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={fetchingHackerFile}
          onClick={() => {
            setFetchingHackerFile(true);
            try {
              // setTwitterUsername(username);
            } catch (err) {
              console.log(err);
            } finally {
              setFetchingHackerFile(false);
            }
          }}
        >
          Get Tweets
        </Button>
        <Button isDisabled={fetchingHackerFile || !wakaTimeURL}>Set WakaTimeURL</Button>
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
