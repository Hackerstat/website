import React from 'react';
import { WakaTimeActivityGraphDataPropsType } from '../../../../utils/utils';
import { Bar } from 'react-chartjs-2';

const TimeBar = ({ data }: { data: WakaTimeActivityGraphDataPropsType }): any => {
  return <Bar data={data} type="bar" options={{ responsive: true }} />;
};

export const TimeBarWrapper = React.memo(TimeBar);
