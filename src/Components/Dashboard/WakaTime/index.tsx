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

const WakaTimeCard: FunctionComponent<WakaTimeProps> = ({ wakaTimeActivityData, wakaTimeLanguageData, ...rest }) => {
  return <Card {...rest}></Card>;
};

export default WakaTimeCard;
