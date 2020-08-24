import React, { FunctionComponent } from 'react';
import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/core';

const SettingsBase: FunctionComponent = ({ children }) => (
  <Box p={3}>
    <Flex flexDirection={'column'} width={'100%'} justifyContent={'space-between'} alignItems={'left'}>
      <Heading color={'primary-bg'}>Profile Settings</Heading>
    </Flex>
    <Flex
      mt={'100px'}
      width={'100%'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      maxW={'xlg'}
      minW={'md'}
      minH={'lg'}
    >
      <Box backgroundColor={'black'} borderColor={'red'} borderRadius={'.5em'} maxH={'sm'} maxW={'sm'} minW={'sm'}>
        <Flex
          flexDirection={'column'}
          p={'1.0em'}
          maxW={'100%'}
          minW={'100%'}
          minH={'100%'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          alignContent={'center'}
        >
          <Stack spacing={20}>
            <Text>Stuff1</Text>
          </Stack>
          <Stack spacing={8}>
            <Text>Stuff2</Text>
          </Stack>
          <Stack spacing={8}>
            <Text>Stuff3</Text>
          </Stack>
          <Stack spacing={8}>
            <Text>Stuff3</Text>
          </Stack>
          <Stack spacing={8}>
            <Text>Stuff3</Text>
          </Stack>
          <Stack spacing={8}>
            <Text>Stuff3</Text>
          </Stack>
        </Flex>
      </Box>
      <Flex minW={'md'} maxW={'xlg'} borderColor={'red'} ml={'2em'}>
        <Box backgroundColor={'black'} p={'.5em'} borderRadius={'.5em'}>
          <Text>
            adsdsaads dasasddsa dasdas dsa dsa ads ads dsa sad dsa sad ads dsa dsa dassaddsa sad sad das asd asd asd ads
            dsadsa das das asd asd dsa asd das sad dsa sad das{' '}
          </Text>
          {/* {children} */}
        </Box>
      </Flex>
    </Flex>
  </Box>
);

export default SettingsBase;
