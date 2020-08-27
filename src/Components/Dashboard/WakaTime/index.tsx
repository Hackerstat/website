import React, { useState, useEffect } from 'react';
import { Flex, useColorMode } from '@chakra-ui/core';
import Card from '../../Card';
import { Highlight, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis';
import axios from 'axios';

interface WakaData {
  x: string;
  y: number;
}
interface propsinter {
  urlend: string;
}
const WakaTime = (props: propsinter) => {
  const { colorMode } = useColorMode();
  const [Data, setData] = useState([]);

  const color = { light: 'gray.800', dark: 'white' };

  useEffect(() => {
    axios.get(`https://wakatime.com/share/` + props.urlend).then((res) => {
      const formatedData = res.data.map(function (thisData) {
        return { x: thisData.range.date, y: thisData.grand_total.minutes / 60 + thisData.grand_total.hours * 60 };
      });
      setData(formatedData);
    });
  });

  return (
    <Card height={['500px', '320']}>
      <Flex alignItems={'center'} flexDirection={'column'} justifyContent={'center'} height={'100%'}>
        <XYPlot xType="ordinal" width={500} height={300}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            lineStyle={{ stroke: '#e0e0e0' }}
            markStyle={{ stroke: '#6dc6c1' }}
            style={{ strokeWidth: '2px', fill: 'none' }}
            strokeStyle="solid"
            data={Data}
          />
          <Highlight
            drag
            enableX={false}
            onBrush={(area) => this.setState({ filter: area })}
            onDrag={(area) => this.setState({ filter: area })}
          />
        </XYPlot>
      </Flex>
    </Card>
  );
};

export default WakaTime;
