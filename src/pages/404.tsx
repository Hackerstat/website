import React from 'react';
import { NextPage } from 'next';
import { Flex, Heading, Text, Button, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import BigImageCard from '../Components/BigImageCard';
import PageBase from '../Components/Page';

/**
 * @name ErrorPage
 * @description This component is the generic 404 Error Page.
 * @author @LouisIV
 * @returns {NextPage}
 */
const ErrorPage: NextPage = () => (
  <PageBase>
    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} flex={1}>
      <BigImageCard
        p={3}
        imageSource={
          'url(https://images.unsplash.com/photo-1510133768164-a8f7e4d4e3dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60);'
        }
      >
        <Stack
          shouldWrapChildren
          spacing={3}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          flex={1}
          mt={32}
        >
          <Heading fontFamily={'mono'} color={'black'}>
            404
          </Heading>
          <Text color={'gray.600'} fontFamily={'mono'}>
            It looks like you`&apos;`re a little lost
          </Text>
          <NextLink href={'/'} passHref>
            <Button variant={'solid'} colorScheme="yellow">
              Back to Safety
            </Button>
          </NextLink>
        </Stack>
      </BigImageCard>
    </Flex>
  </PageBase>
);

export default ErrorPage;
