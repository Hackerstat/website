import React, { FunctionComponent } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';

const PageBase: FunctionComponent = ({ children, ...rest }) => (
  <Box mx={[2, 0]} p={[0, 3]} {...rest}>
    <Flex flexDirection={'column'} minWidth={'100%'} justifyContent={'space-between'} alignItems={'center'}>
      {/* <Stack alignItems={'center'} maxW={'120rem'} width={'100%'} shouldWrapChildren spacing={3}> */}
      {children}
      {/* </Stack> */}
    </Flex>
  </Box>
);

export default PageBase;
