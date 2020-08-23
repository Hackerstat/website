import React, { FunctionComponent } from 'react';
import { useColorMode, Box, PseudoBox, BoxProps } from '@chakra-ui/core';

type CardProps = BoxProps;

const Card: FunctionComponent<CardProps> = ({ children, onClick, ...rest }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.100', dark: '#2b2b2b' };
  const accentColor = { light: 'red.500', dark: 'green.500' };
  const color = { light: 'white', dark: 'gray.800' };

  return (
    <PseudoBox
      flex="1"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      transition={'filter .1s, border-bottom-width .1s, background-color .1s'}
      _hover={
        onClick && {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filter: 'brightness(150%)',
          borderBottomWidth: 5,
          borderBottomColor: accentColor[colorMode],
        }
      }
      _active={
        onClick && {
          backgroundColor: accentColor[colorMode],
          borderBottomWidth: 15,
        }
      }
      onClick={onClick}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
};

export default Card;
