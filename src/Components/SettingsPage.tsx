import React, { FunctionComponent } from 'react';
import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/core';

const SelectedOne = ({ text }) => {
  return (
    <Box py={'1.5em'} backgroundColor={'white'} minH={'100%'} minW={'100%'} textAlign={'center'} borderRadius={'.3em'}>
      <Text color={'text-secondary'}>{text}</Text>
    </Box>
  );
};

const NotSelectedOne = ({ text }) => {
  return (
    <Box py={'1.5em'}>
      <Text>{text}</Text>
    </Box>
  );
};

const CheckIfSelected = ({ givenText, titleOfPage }) => {
  if (titleOfPage === givenText) {
    return <SelectedOne text={titleOfPage} />;
  } else {
    return <NotSelectedOne text={titleOfPage} />;
  }
};

const SettingsBase = ({ children, title }): JSX.Element => (
  <Box p={3}>
    <Flex flexDirection={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'left'} flexWrap={'wrap'}>
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
      flexWrap={'wrap'}
    >
      {/* <Flex flexDirection={'column'}> */}
      <Box borderColor={'red'} borderRadius={'.5em'} maxH={'sm'} maxW={'sm'} minW={'sm'} mb={40}>
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
          {<CheckIfSelected titleOfPage={'My Profile Information'} givenText={title} />}
          {<CheckIfSelected titleOfPage={'My Work Experience'} givenText={title} />}
          {<CheckIfSelected titleOfPage={'Messages'} givenText={title} />}
          {<CheckIfSelected titleOfPage={'Security'} givenText={title} />}
          {<CheckIfSelected titleOfPage={'Integrations'} givenText={title} />}
          {<CheckIfSelected titleOfPage={'Delete My Account'} givenText={title} />}
        </Flex>
      </Box>
      <Flex minW={'xlg'} maxW={'xlg'} borderColor={'red'} flexDirection={'column'}>
        <Heading>{title}</Heading>
        <Flex minW={'100%'} maxW={'100%'} borderColor={'red'} mt={'.3em'}>
          <Box backgroundColor={'black'} p={'.5em'} borderRadius={'.5em'}>
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  </Box>
);

export default SettingsBase;
