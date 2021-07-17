import React, { FunctionComponent, useEffect, useState } from 'react';
import Axios from 'axios';
import { BoxProps, Grid, useColorMode } from '@chakra-ui/react';
import { LanguagePieWrapper, TimeBarWrapper } from '../../WakaTime/Graphs';
import {
  WakaTimeLanguagesGraphDataPropsType,
  WakaTimeLanguageDataType,
  WakaTimeActivityGraphDataPropsType,
  IntegrationTypes,
} from '../../../utils';
import IntegrationWrapperCard from '../IntegrationWrapperCard';

interface WakaTimeProps extends BoxProps {
  username: string;
}
interface SetUpGraphDataProps {
  wakaTimeActivityData: Array<WakaTimeLanguagesGraphDataPropsType>;
  wakaTimeLanguagesData: Array<WakaTimeLanguageDataType>;
}

const retrieveWakaTimeInfoURL = '/api/wakatime/remote';

const colors = { light: 'gray.800', dark: 'white' };

const emptyBarDataPoints: WakaTimeActivityGraphDataPropsType = {
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

const emptyPieDataPoints: WakaTimeActivityGraphDataPropsType = {
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

/**
 * @name WakaTimeCard
 * @description This component displays a HackerStat user's WakaTime Data.
 * @author @Cgunter1
 * @param {WakaTimeProps} props This is the props for the component.
 * @param {string} props.username This is the HackerStat user's username to find the .
 * @param {BoxProps} props.rest This is the rest of the object for the Card's attributes.
 * @returns {FunctionComponent<Partial<WakaTimeProps>>}
 */
const WakaTimeCard: FunctionComponent<Partial<WakaTimeProps>> = ({ username, ...rest }) => {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState(colors['dark']);
  const [errorStatus, setErrorStatus] = useState(false);
  const [pieData, setPieData] = useState<WakaTimeActivityGraphDataPropsType>(emptyPieDataPoints);
  const [barData, setBarData] = useState<WakaTimeActivityGraphDataPropsType>(emptyBarDataPoints);
  const [pieLoaded, setPieLoaded] = useState(false);
  const [barLoaded, setBarLoaded] = useState(false);
  useEffect(() => {
    Axios.get(retrieveWakaTimeInfoURL, { params: { username } })
      .then((res) => {
        setUpGraphData(res.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorStatus(true);
      });
  });

  useEffect(() => {
    setColor(colors[colorMode]);
  }, [colorMode]);

  const setUpGraphData = (graphData: Partial<SetUpGraphDataProps>) => {
    pieData.labels = [].slice();
    barData.labels = [].slice();
    pieData.datasets[0].data = [].slice();
    barData.datasets[0].data = [].slice();
    pieData.datasets[0].backgroundColor = [].slice();
    barData.datasets[0].backgroundColor = [].slice();
    pieData.datasets[0].borderColor = [].slice();
    barData.datasets[0].borderColor = [].slice();

    if (graphData.wakaTimeActivityData) {
      graphData.wakaTimeActivityData.forEach((barDataPoint) => {
        barData.labels.push(barDataPoint.dateText);
        const dataPointsRef = barData.datasets[0];
        dataPointsRef.backgroundColor.push('rgba(0, 0, 255, 0.2)');
        dataPointsRef.borderColor.push('blue');
        dataPointsRef.data.push(barDataPoint.hours + barDataPoint.minutes / 60);
      });
      setBarData(barData);
      setBarLoaded(true);
    }
    if (graphData.wakaTimeLanguagesData) {
      graphData.wakaTimeLanguagesData.forEach((pieDataPoint) => {
        pieData.labels.push(pieDataPoint.name);
        const dataPointsRef = pieData.datasets[0];
        dataPointsRef.data.push(pieDataPoint.percent);
        dataPointsRef.backgroundColor.push(pieDataPoint.color);
        dataPointsRef.borderColor.push(pieDataPoint.color);
      });
      setPieData(pieData);
      setPieLoaded(true);
    }
  };

  return (
    <>
      {!errorStatus ? (
        <IntegrationWrapperCard px={0} verified={true} minH="lg" icon={IntegrationTypes.WAKATIME}>
          <Grid mt={2} gap={2} gridTemplateColumns={'repeat(auto-fit, 400px)'} minW={'xs'} borderRadius={'lg'}>
            {barLoaded && <TimeBarWrapper data={barData} />}
            {pieLoaded && <LanguagePieWrapper data={pieData} />}
          </Grid>
        </IntegrationWrapperCard>
      ) : (
        <></>
      )}
    </>
  );
};

const WakaTimeCardWrapper = React.memo(WakaTimeCard);

export default WakaTimeCardWrapper;
