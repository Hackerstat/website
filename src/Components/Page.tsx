import React, { FunctionComponent } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';

const PageBase: FunctionComponent = ({ children, ...rest }) => (
  <Box p={3}>
    <Flex flexDirection={'column'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
      <Stack maxW={'120rem'} width={'100%'} shouldWrapChildren spacing={3}>
        {children}
      </Stack>
    </Flex>
  </Box>
);

export default PageBase;
