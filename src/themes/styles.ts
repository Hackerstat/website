import { mode, Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global: (props) => ({
    body: {
      fontFamily: 'body',
      color: mode('gray.100', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.100')(props),
      lineHeight: 'base',
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
  }),
};

export default styles;
