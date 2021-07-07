import * as React from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { ABOUT_CONTENT } from '../utils/constants';
import { Heading, Text, Flex, Box } from '@chakra-ui/react';

/**
 * @name AboutPage
 * @description This component is the static About Page.
 * @author @LouisIV
 * @returns {NextPage}
 */
const AboutPage: NextPage = () => (
  <PageBase>
    <Flex w={{ base: '100%', md: '50%' }}>
      <Box>
        <Heading textAlign="center" color={'primary-bg'} mb={5}>
          About Page
        </Heading>
        <Text fontSize="lg" as="p">
          {ABOUT_CONTENT}
        </Text>
      </Box>
    </Flex>
  </PageBase>
);

export default AboutPage;
