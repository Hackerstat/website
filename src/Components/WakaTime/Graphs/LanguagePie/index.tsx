import React from 'react';
import { WakaTimeGraphDataPropsType } from '../../../../utils/utils';
import { Pie } from 'react-chartjs-2';

const LanguagePie = ({ data }: { data: WakaTimeGraphDataPropsType }): any => {
  return <Pie data={data} type="pie" options={{ responsive: true }} />;
};

export const LanguagePieWrapper = React.memo(LanguagePie);
