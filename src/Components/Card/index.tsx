import React, { FunctionComponent, useState, useEffect } from 'react';
import { useColorMode, BoxProps, Box } from '@chakra-ui/react';

type CardProps = BoxProps;

const bgColors = { light: 'gray.100', dark: '#2b2b2b' };
const accentColors = { light: 'green.500', dark: 'green.300' };
const mainColors = { light: 'white', dark: 'gray.800' };

/**
 * @name Card
 * @description This is a generic component for UI items that are clickable and hoverable with the brightness of the item increasing (i.e. Integration Tiles, Medium Posts).
 * @author @LouisIV
 * @param {CardProps} props This is the object for the Card object props.
 * @param {JSX.Element | JSX.Element[]} props.children These is the wrapped components in the Card component.
 * @param {() => void} props.children These is the function when the Card component is clicked.
 * @param {BoxProps} props.rest These is the miscellaneous props used for Box's extra attributes (i.e. width, height).
 * @returns {FunctionComponent<CardProps>}
 */
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
    <Box
      flex="1"
      bg={colors.bg}
      color={colors.color}
      transition={'filter .1s, border-bottom-width .1s, background-color .1s'}
      _hover={
        onClick && {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filter: 'brightness(120%)',
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
    </Box>
  );
};

export default Card;
