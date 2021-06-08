import React from 'react';
import { WakaTimeGraphDataPropsType } from '../../../../utils/utils';
import { Bar } from 'react-chartjs-2';

const TimeBar = ({ data }: { data: WakaTimeGraphDataPropsType }): any => {
  return <Bar data={data} type="bar" options={{ responsive: true }} />;
};

export const TimeBarWrapper = React.memo(TimeBar);
