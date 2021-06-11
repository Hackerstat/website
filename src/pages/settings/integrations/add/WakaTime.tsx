import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import {
  Flex,
  Box,
  Input,
  FormLabel,
  FormControl,
  Heading,
  Button,
  Stack,
  FormErrorMessage,
  useToast,
  LightMode,
} from '@chakra-ui/react';
import { CollapseableInstructionWrapper } from '../../../../Components/WakaTime/CollapseInstructionBox';
import { LanguagePieWrapper, TimeBarWrapper } from '../../../../Components/WakaTime/Graphs';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import { goodToast, badToast, badGetWakaTimeToast } from '../../../../utils/constants';
import Axios from 'axios';
import {
  WakaTimeLanguagesGraphDataPropsType,
  WakaTimeActivityGraphDataPropsType,
  WakaTimeLanguageDataType,
} from '../../../../utils/utils';

const fetchWakaTimeDataURL = '/api/wakatime/fetchWakaTimeData';
const addWakaTimeIntegrationURL = '/api/wakatime/addIntegration';

/**
 * @name AddWakaTimeIntegrationPage
 * @description It is the component that displays a user's WakaTime integration (i.e. Language Pie, Activity Bar) and adds a user's WakaTime integration to their HackerStat Profile.
 * @author @Cgunter
 * @returns {FunctionComponent}
 */
const AddWakaTimeIntegrationPage: FunctionComponent = () => {
  const [fetchError, setFetchError] = useState<string>();
  const [activityWakaTimeURL, setActivityWakaTimeURL] = useState<string>('');
  const [languagesWakaTimeURL, setLanguagesWakaTimeURL] = useState<string>('');
  const [drawerCodingActivity, setDrawerCodingActivity] = useState(false);
  const [drawerLanguage, setDrawerLanguage] = useState(false);
  const [retrievedBarData, setRetrievedBarData] = useState<WakaTimeActivityGraphDataPropsType>();
  const [retrievedPieData, setRetrievedPieData] = useState<WakaTimeActivityGraphDataPropsType>();
  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const toast = useToast();

  const animationStyle = {
    transition: 'height .3s',
  };

  /**
   * @name getWakaTimeData
   * @description This function retrieves the Coding Activity Data from the user's WakaTime via their URL and sets it to the barDataPoints variable. If it fails, it shows a failure toast.
   * @author @Cgunter1
   * @param {string} url It is the user's WakaTime Coding Activity URL.
   * @returns
   */
  const getWakaTimeData = async (url: string) => {
    try {
      if (!url) {
        setFetchError('Required');
        return;
      }

      const barDataPoints: WakaTimeActivityGraphDataPropsType = {
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

      res.data.dataPoints.forEach((dataPoint: WakaTimeLanguagesGraphDataPropsType) => {
        barDataPoints.labels.push(dataPoint.dateText);
        const dataPointsRef = barDataPoints.datasets[0];
        dataPointsRef.backgroundColor.push('rgba(0, 0, 255, 0.2)');
        dataPointsRef.borderColor.push('blue');
        dataPointsRef.data.push(dataPoint.hours + dataPoint.minutes / 60);
      });

      setRetrievedBarData(barDataPoints);

      setDrawerCodingActivity(true);
    } catch (err) {
      console.log(err);
      toast(badGetWakaTimeToast as unknown);
    }
  };

  /**
   * @name getWakaTimeLanguagesData
   * @description This function retrieves the Languages Share from the user's WakaTime via their URL and sets it to the pieDataPoints variable. If it fails, it shows a failure toast.
   * @author @Cgunter1
   * @param {string} url It is the user's WakaTime Languages Share URL.
   * @returns
   */
  const getWakaTimeLanguagesData = async (url: string) => {
    try {
      if (!url) {
        setFetchError('Required');
        return;
      }

      const dataType = 'pie';

      const pieDataPoints: WakaTimeActivityGraphDataPropsType = {
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
  /**
   * @name addIntegrationsForWakaTime
   * @description This function adds the WakaTime integation to the user's HackerStat. If it fails, then it sends a bad Toast.
   * @author @Cgunter1
   * @returns
   */
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
        <Box w="100%">
          <Box
            maxW={drawerCodingActivity ? 700 : 0}
            minW={drawerCodingActivity ? 200 : 0}
            margin="0 auto"
            style={animationStyle}
          >
            <LightMode>
              <TimeBarWrapper data={retrievedBarData} />
            </LightMode>
          </Box>
        </Box>
        {/* TODO: Add Another Input/Graph for languages used pie chart */}
        <CollapseableInstructionWrapper typeOfChartIsActivity={false} />
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
