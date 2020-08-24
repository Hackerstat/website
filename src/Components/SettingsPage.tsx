import React, { FunctionComponent } from 'react';
import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/core';

const SettingsBase: FunctionComponent = ({ children }) => (
  <Box p={3}>
    <Flex flexDirection={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'left'}>
      <Heading color={'primary-bg'}>Profile Settings</Heading>
      <Heading color={'primary-bg'}>User-Logo</Heading>
    </Flex>
    <Flex
      width={'100%'}
      flexDirection={'row'}
      justifyContent={'space-evenly'}
      maxW={'xlg'}
      minW={'md'}
      minH={'lg'}
      mt={'100px'}
    >
      {/* <Flex flexDirection={'column'}> */}
      <Box borderColor={'red'} borderRadius={'.5em'} maxH={'sm'} maxW={'20%'} minW={'20%'}>
        <Heading>Settings</Heading>
        <Flex
          mt={'.3em'}
          backgroundColor={'black'}
          flexDirection={'column'}
          maxW={'100%'}
          minW={'100%'}
          minH={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
          alignContent={'center'}
          borderRadius={'.5em'}
        >
          <Box py={'1.5em'}>
            <Text>My Profile Information</Text>
          </Box>
          <Box py={'1.5em'} backgroundColor={'white'} minH={'100%'} minW={'100%'} textAlign={'center'}>
            <Text color={'black'}>My Work Experience</Text>
          </Box>
          <Box py={'1.5em'}>
            <Text>Messages</Text>
          </Box>
          <Box py={'1.5em'}>
            <Text>Security</Text>
          </Box>
          <Box py={'1.5em'}>
            <Text>Integrations</Text>
          </Box>
          <Box py={'1.75em'}>
            <Text>Delete My Account</Text>
          </Box>
        </Flex>
      </Box>
      <Flex minW={'60%'} maxW={'60%'} borderColor={'red'} ml={'2em'} flexDirection={'column'}>
        <Heading>My Work Experience</Heading>
        <Flex minW={'100%'} maxW={'100%'} borderColor={'red'} mt={'.3em'}>
          <Box backgroundColor={'black'} p={'.5em'} borderRadius={'.5em'}>
            <Text>
              adsdsaads dasasddsa dasdas dsa dsa ads ads dsa sad dsa sad ads dsa dsa dassaddsa sad sad das asd asd asd
              ads dsadsa das das asd asd dsa asd das sad dsa sad das{' '}
            </Text>
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  </Box>
);

export default SettingsBase;
