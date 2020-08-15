import React, { FunctionComponent } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/core';

const PageBase: FunctionComponent = ({ children }) => (
  <Box p={3}>
    <Flex flexDirection={'column'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
      <Stack maxW={'6xl'} width={'100%'} shouldWrapChildren spacing={3}>
        {children}
      </Stack>
    </Flex>
  </Box>
);

export default PageBase;
