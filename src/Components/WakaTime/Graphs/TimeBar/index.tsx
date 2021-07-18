import React, { FunctionComponent } from 'react';
import { WakaTimeActivityGraphDataPropsType } from '../../../../types';
import { Bar } from 'react-chartjs-2';

interface TimeBarProps {
  data: WakaTimeActivityGraphDataPropsType;
}

/**
 * @name LanguagePie
 * @description This component displays the Bar graph using data given from the argument.
 * @author @Cgunter1
 * @param {TimeBarProps} props It is the prop object of the component.
 * @param {WakaTimeActivityGraphDataPropsType} props.data It is the data fed into the Bar component to construct the Bar Graph.
 * @returns {FunctionComponent<TimeBarProps>}
 */
const TimeBar: FunctionComponent<TimeBarProps> = ({ data }) => {
  return <Bar data={data} type="bar" options={{ responsive: true }} />;
};

export const TimeBarWrapper = React.memo(TimeBar);
