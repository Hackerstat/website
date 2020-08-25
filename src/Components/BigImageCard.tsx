import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';
import { FunctionComponent } from 'react';

interface BigImageCardProps extends BoxProps {
  imageSource: any;
}

const BigImageCard: FunctionComponent<BigImageCardProps> = ({ children, imageSource }) => (
  <Box
    backgroundImage={imageSource}
    height={'2xl'}
    width={'100%'}
    borderRadius={'lg'}
    backgroundSize={'cover'}
    backgroundPosition={'top'}
  >
    {children}
  </Box>
);

export default BigImageCard;
