import { theme } from '@chakra-ui/core';
import merge from 'deepmerge';

const defaultTheme = {
  colors: {
    brand: {
      50: '#f2f2f2',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
    gray: {
      50: '#fbf0f2',
      100: '#dcd8d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#282626',
      900: '#150a0d',
    },
  },
  radii: {
    none: '0',
    sm: '0.025rem',
    md: '0.125rem',
    lg: '0.25rem',
    full: '9999px',
  },
};

export default merge(theme, defaultTheme);
