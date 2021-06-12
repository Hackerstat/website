import React, { FunctionComponent } from 'react';
import { Text, BoxProps } from '@chakra-ui/react';

const currentYear = new Date().getFullYear();

/**
 * @name CopyrightNotice
 * @description This component is that shows the copyright of the website.
 * @author @LouisIV
 * @returns {FunctionComponent}
 */
const CopyrightNotice: FunctionComponent<BoxProps> = (props) => (
  <Text bottom={0} textAlign={'left'} {...props}>
    &copy; {currentYear} Hackerstat
  </Text>
);

export { CopyrightNotice };
