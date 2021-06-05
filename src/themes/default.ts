import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const defaultTheme = extendTheme({
  styles: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global: (props) => ({
      body: {
        maxWidth: '100vw',
        overflowHorizontal: 'hidden',
        font: 'body',
        color: mode('gray.700', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.700')(props),
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
    }),
  },
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
      900: '#0f0f0f',
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
    lightMenuBackground: 'gray.200',
    darkMenuBackground: 'gray.700',
  },
  radii: {
    none: '0',
    sm: '0.025rem',
    md: '0.125rem',
    lg: '0.25rem',
    full: '9999px',
  },
});

export default defaultTheme;
