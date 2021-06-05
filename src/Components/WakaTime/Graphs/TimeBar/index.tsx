import React from 'react';
import { WakaTimeGraphDataPropsType } from '../../../../utils/utils';
import { Bar } from 'react-chartjs-2';

const TimeBar = ({ data }: { data: WakaTimeGraphDataPropsType }): any => {
  console.log(data);
  // return <Bar data={data} type="bar" options={{ responsive: true }} />;
  return null;
};

export const TimeBarWrapper = React.memo(TimeBar);
