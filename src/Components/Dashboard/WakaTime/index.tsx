import React, { FunctionComponent } from 'react';
import { BoxProps } from '@chakra-ui/react';
import {
  WakaTimeActivityBarDataSchemaType,
  WakaTimeLanguagePieDataSchemaType,
} from '../../../utils/validation/schemas';
import Card from '../../Card';

interface WakaTimeProps extends BoxProps {
  wakaTimeActivityData: WakaTimeActivityBarDataSchemaType;
  wakaTimeLanguageData: WakaTimeLanguagePieDataSchemaType;
}
/**
 * @name WakaTimeCard
 * @description This component displays a HackerStat user's WakaTime Data.
 * @author @Cgunter1
 * @param {WakaTimeProps} props This is the props for the component.
 * @param {WakaTimeActivityBarDataSchemaType} props.wakaTimeActivityData This is the data object to build the bar graph to represent the HackerStat user's Coding Activity.
 * @param {WakaTimeLanguagePieDataSchemaType} props.wakaTimeLanguageData This is the data object to build the pie graph to represent the HackerStat user's Languages Used.
 * @param {WakaTimeLanguagePieDataSchemaType} props.rest This is the rest of the object for the Card's attributes.
 * @returns {FunctionComponent<WakaTimeProps>}
 */
const WakaTimeCard: FunctionComponent<WakaTimeProps> = ({ wakaTimeActivityData, wakaTimeLanguageData, ...rest }) => {
  return <Card {...rest}></Card>;
};

export default WakaTimeCard;
