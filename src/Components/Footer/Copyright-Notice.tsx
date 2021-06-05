import React, { FunctionComponent } from 'react';
import { Text, BoxProps } from '@chakra-ui/react';

const currentYear = new Date().getFullYear();

const CopyrightNotice: FunctionComponent<BoxProps> = (props) => (
  <Text bottom={0} textAlign={'left'} {...props}>
    &copy; {currentYear} Hackerstat
  </Text>
);

export { CopyrightNotice };
