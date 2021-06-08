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
import { CollapseableInstructionWrapper } from '../../../../Components/WakaTime/CollapseInstructionBox';
import { LanguagePieWrapper, TimeBarWrapper } from '../../../../Components/WakaTime/Graphs';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import { goodToast, badToast, badGetWakaTimeToast } from '../../../../utils/constants';
import Axios from 'axios';
import {
  WakaTimeGraphDataPropsType,
  WakaTimePieGraphDataResType,
  WakaTimeLanguageDataType,
} from '../../../../utils/utils';

const fetchWakaTimeDataURL = '/api/wakatime/fetchWakaTimeData';
const addWakaTimeIntegrationURL = '/api/wakatime/addIntegration';

const AddWakaTimeIntegrationPage: FunctionComponent = () => {
  const [fetchError, setFetchError] = useState<string>();
  const [activityWakaTimeURL, setActivityWakaTimeURL] = useState<string>('');
  const [languagesWakaTimeURL, setLanguagesWakaTimeURL] = useState<string>('');
  const [drawerCodingActivity, setDrawerCodingActivity] = useState(false);
  const [drawerLanguage, setDrawerLanguage] = useState(false);
  const [retrievedBarData, setRetrievedBarData] = useState<WakaTimeGraphDataPropsType>();
  const [retrievedPieData, setRetrievedPieData] = useState<WakaTimeGraphDataPropsType>();
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

      const barDataPoints: WakaTimeGraphDataPropsType = {
        labels: [],
        datasets: [
          {
            type: 'bar',
            label: 'Coding Daily Activity',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      };

      const dataType = 'bar';

      const res = await Axios.get(fetchWakaTimeDataURL, { params: { url, dataType } });

      res.data.dataPoints.forEach((dataPoint: WakaTimePieGraphDataResType) => {
        barDataPoints.labels.push(dataPoint.dateText);
        const dataPointsRef = barDataPoints.datasets[0];
        dataPointsRef.backgroundColor.push('rgba(0, 0, 255, 0.2)');
        dataPointsRef.borderColor.push('blue');
        dataPointsRef.data.push(dataPoint.hours + dataPoint.minutes / 60);
      });

      setRetrievedBarData(barDataPoints);

      setDrawerCodingActivity(true);

      // console.log(res.data);
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

      const dataType = 'pie';

      const pieDataPoints: WakaTimeGraphDataPropsType = {
        labels: [],
        datasets: [
          {
            type: 'pie',
            label: 'Languages Used',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      };

      const res = await Axios.get(fetchWakaTimeDataURL, { params: { url, dataType } });
      console.log(res.data);

      res.data.dataPoints.forEach((dataPoint: WakaTimeLanguageDataType) => {
        pieDataPoints.labels.push(dataPoint.name);
        const dataPointsRef = pieDataPoints.datasets[0];
        dataPointsRef.data.push(dataPoint.percent);
        dataPointsRef.backgroundColor.push(dataPoint.color);
        dataPointsRef.borderColor.push(dataPoint.color);
      });

      setRetrievedPieData(pieDataPoints);
      setDrawerLanguage(true);

      // console.log(res.data);
    } catch (err) {
      console.log(err);
      toast(badGetWakaTimeToast as unknown);
    }
  };

  const addIntegrationsForWakaTime = async () => {
    try {
      await Axios.post(addWakaTimeIntegrationURL, {
        wakaTimeCodingActivityURL: activityWakaTimeURL,
        wakaTimeLanguageURL: languagesWakaTimeURL,
      });
      toast(goodToast as unknown);
    } catch (e) {
      console.error(e);
      toast(badToast as unknown);
    }
  };

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
        <Flex pb={-25} justifyContent="center" alignItems="center">
          <Flex
            w={{ base: drawerCodingActivity ? 500 : 0, xs: drawerCodingActivity ? 450 : 0 }} // TODO: Set breakpoints for graph
            h={{ base: drawerCodingActivity ? 250 : 0, xs: drawerCodingActivity ? 225 : 0 }} // TODO: Set breakpoints for graph
            alignItems="center"
            style={animationStyle}
          >
            <TimeBarWrapper data={retrievedBarData} />
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
        <Flex pb={-25} justifyContent="center" alignItems="center">
          <Flex
            w={{ base: drawerLanguage ? 300 : 0 }} // TODO: Set breakpoints for graph
            h={{ base: drawerLanguage ? 300 : 0 }} // TODO: Set breakpoints for graph
            alignItems="center"
            style={animationStyle}
          >
            <LanguagePieWrapper data={retrievedPieData} />
          </Flex>
        </Flex>
        <Button
          onClick={() => addIntegrationsForWakaTime()}
          isDisabled={fetchingHackerFile || !activityWakaTimeURL || !languagesWakaTimeURL}
        >
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
