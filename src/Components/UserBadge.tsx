import React from 'react';
import { Box, Text, useColorMode } from '@chakra-ui/react';

const UserBadge = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.800', dark: 'white' };
  const color = { light: 'white', dark: 'gray.800' };

  return (
    <Box borderRadius={'25px'} bg={bgColor[colorMode]} position={'absolute'} ml={2} mt={2} py={'1px'} px={1}>
      <Text
        textTransform={'uppercase'}
        fontWeight={'bold'}
        fontSize="sm"
        letterSpacing={'wide'}
        color={color[colorMode]}
      >
        {children}
      </Text>
    </Box>
  );
};

export default UserBadge;
