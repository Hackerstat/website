import React, { FunctionComponent, useState, useEffect } from 'react';
import { useColorMode, PseudoBox, BoxProps } from '@chakra-ui/core';

type CardProps = BoxProps;

const bgColors = { light: 'gray.100', dark: '#2b2b2b' };
const accentColors = { light: 'red.500', dark: 'green.500' };
const mainColors = { light: 'white', dark: 'gray.800' };

const Card: FunctionComponent<CardProps> = ({ children, onClick, ...rest }) => {
  const { colorMode } = useColorMode();

  const [colors, setColors] = useState({
    bg: bgColors['dark'],
    accent: accentColors['dark'],
    color: mainColors['dark'],
  });

  useEffect(() => {
    setColors({
      bg: bgColors[colorMode],
      accent: accentColors[colorMode],
      color: mainColors[colorMode],
    });
  }, [colorMode]);

  return (
    <PseudoBox
      flex="1"
      bg={colors.bg}
      color={colors.color}
      transition={'filter .1s, border-bottom-width .1s, background-color .1s'}
      _hover={
        onClick && {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filter: 'brightness(150%)',
          borderBottomWidth: 5,
          borderBottomColor: colors.accent,
        }
      }
      _active={
        onClick && {
          backgroundColor: colors.accent,
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
