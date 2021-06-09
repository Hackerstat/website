import React from 'react';
import { WakaTimeActivityGraphDataPropsType } from '../../../../utils/utils';
import { Pie } from 'react-chartjs-2';

const LanguagePie = ({ data }: { data: WakaTimeActivityGraphDataPropsType }): any => {
  return <Pie data={data} type="pie" options={{ responsive: true }} />;
};

export const LanguagePieWrapper = React.memo(LanguagePie);
