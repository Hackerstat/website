import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import deepmerge from 'deepmerge';
import {
  Flex,
  Input,
  FormLabel,
  FormControl,
  Heading,
  Button,
  Stack,
  Box,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/core';
import { CollapseableInstructionWrapper } from '../../../../Components/WakaTime/CollapseInstructionBox';
import { LanguagePieWrapper, TimeBarWrapper } from '../../../../Components/WakaTime/Graphs';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import { goodToast, badGetWakaTimeToast } from '../../../../utils/constants';
import Axios from 'axios';
import { WakaTimeDayDataType } from '../../../../utils/utils';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      type: '',
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const fetchWakaTimeDataURL = '/api/wakatime/fetchWakaTimeData';

const AddWakaTimeIntegrationPage: FunctionComponent = () => {
  const [fetchError, setFetchError] = useState<string>();
  const [activityWakaTimeURL, setActivityWakaTimeURL] = useState<string>('');
  const [languagesWakaTimeURL, setLanguagesWakaTimeURL] = useState<string>('');
  const [drawerCodingActivity, setDrawerCodingActivity] = useState(false);
  const [drawerLanguage, setDrawerLanguage] = useState(false);
  const [retrievedData, setRetrievedData] = useState<Array<WakaTimeDayDataType>>([]);
  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const toast = useToast();

  const animationStyle = {
    transition: 'height .3s',
  };

  const getWakaTimeData = async (url: string) => {
    try {
      if (!url) {
        setFetchError('Required');
        return;
      }

      const res = await Axios.get(fetchWakaTimeDataURL, { params: { url } });
      setDrawerCodingActivity(true);

      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast(badGetWakaTimeToast as unknown);
    }
  };

  const getWakaTimeLanguagesData = async (url: string) => {
    try {
      if (!url) {
        setFetchError('Required');
        return;
      }

      // const res = await Axios.get(fetchWakaTimeDataURL, { params: { url } });
      setDrawerLanguage(true);

      // console.log(res.data);
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
        <CollapseableInstructionWrapper typeOfChartIsActivity={true} />
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>Activity WakaTimeURL</FormLabel>
          <Input
            value={activityWakaTimeURL}
            placeholder={'URL'}
            onChange={(e) => setActivityWakaTimeURL(e.target.value)}
          />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={fetchingHackerFile}
          onClick={() => {
            setFetchingHackerFile(true);
            try {
              getWakaTimeData(activityWakaTimeURL);
            } catch (err) {
              console.log(err);
            } finally {
              setFetchingHackerFile(false);
            }
          }}
        >
          Get Daily Data
        </Button>
        <Flex pb={-25} border="1px red solid" justifyContent="center" alignItems="center">
          <Flex
            w={{ base: drawerCodingActivity ? 500 : 0 }} // TODO: Set breakpoints for graph
            h={{ base: drawerCodingActivity ? 250 : 0 }} // TODO: Set breakpoints for graph
            alignItems="center"
            border="1px red solid"
            backgroundColor="red"
            style={animationStyle}
          >
            <TimeBarWrapper data={data} />
          </Flex>
        </Flex>
        {/* Add Another Input/Graph for languages used pie chart */}
        <CollapseableInstructionWrapper typeOfChartIsActivity={false} />
        {/* {useMemo(() => CollapseableInstruction({ typeOfChartIsActivity: true }), [{ typeOfChartIsActivity: true }])} */}
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>Languages WakaTimeURL</FormLabel>
          <Input
            value={languagesWakaTimeURL}
            placeholder={'URL'}
            onChange={(e) => setLanguagesWakaTimeURL(e.target.value)}
          />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={fetchingHackerFile}
          onClick={() => {
            setFetchingHackerFile(true);
            try {
              getWakaTimeLanguagesData(languagesWakaTimeURL);
            } catch (err) {
              console.log(err);
            } finally {
              setFetchingHackerFile(false);
            }
          }}
        >
          Get Languages Used
        </Button>
        <Flex pb={-25} border="1px red solid" justifyContent="center" alignItems="center">
          <Flex
            w={{ base: drawerLanguage ? 300 : 0 }} // TODO: Set breakpoints for graph
            h={{ base: drawerLanguage ? 300 : 0 }} // TODO: Set breakpoints for graph
            alignItems="center"
            border="1px red solid"
            backgroundColor="red"
            style={animationStyle}
          >
            <LanguagePieWrapper data={data} />
          </Flex>
        </Flex>
        <Button isDisabled={fetchingHackerFile || !activityWakaTimeURL || !languagesWakaTimeURL}>
          Set WakaTimeURL
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
        <SettingsPage>{mounted ? <AddWakaTimeIntegrationPage /> : <Loader />}</SettingsPage>
      </AuthLayer>
    </>
  );
};

export default IntegrationsPage;
