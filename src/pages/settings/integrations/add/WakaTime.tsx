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
import { goodToast, badGetWakaTimeToast } from '../../../../utils/constants';
import Axios from 'axios';
import { WakaTimeDayDataType } from '../../../../utils/utils';

const fetchWakaTimeDataURL = '/api/wakatime/fetchWakaTimeData';

const AddWakaTimeIntegrationPage: FunctionComponent = () => {
  const [fetchError, setFetchError] = useState<string>();
  const [wakaTimeURL, setWakaTimeURL] = useState<string>('');
  const [retrievedData, setRetrievedData] = useState<Array<WakaTimeDayDataType>>([]);
  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const toast = useToast();

  const getWakaTimeData = async (url: string) => {
    try {
      if (!url) {
        setFetchError('Required');
        return;
      }

      const res = await Axios.get(fetchWakaTimeDataURL, { params: { url } });

      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast(badGetWakaTimeToast as unknown);
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
              getWakaTimeData(wakaTimeURL);
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
        <SettingsPage>{mounted ? <AddWakaTimeIntegrationPage /> : <Loader />}</SettingsPage>
      </AuthLayer>
    </>
  );
};

export default IntegrationsPage;
