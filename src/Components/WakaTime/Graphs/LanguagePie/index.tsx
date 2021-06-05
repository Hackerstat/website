import React from 'react';
import { WakaTimeGraphDataPropsType } from '../../../../utils/utils';
import { Pie } from 'react-chartjs-2';

const LanguagePie = ({ data }: { data: WakaTimeGraphDataPropsType }): any => {
  console.log('sda');
  console.log(data);
  console.log('dassda');
  // return <Pie data={data} type="pie" options={{ responsive: true }} />;
  return null;
};

export const LanguagePieWrapper = React.memo(LanguagePie);
