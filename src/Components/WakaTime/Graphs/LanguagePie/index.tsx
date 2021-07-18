import React, { FunctionComponent } from 'react';
import { WakaTimeActivityGraphDataPropsType } from '../../../../types';
import { Pie } from 'react-chartjs-2';

interface LanguagePieProps {
  data: WakaTimeActivityGraphDataPropsType;
}

/**
 * @name LanguagePie
 * @description This component displays the Pie graph using data given from the argument.
 * @author @Cgunter1
 * @param {LanguagePieProps} props It is the prop object of the component.
 * @param {WakaTimeActivityGraphDataPropsType} props.data It is the data fed into the Pie component to construct the Pie Graph.
 * @returns {FunctionComponent<LanguagePieProps>}
 */
const LanguagePie: FunctionComponent<LanguagePieProps> = ({ data }: LanguagePieProps) => {
  return <Pie data={data} type="pie" options={{ responsive: true }} />;
};

export const LanguagePieWrapper = React.memo(LanguagePie);
