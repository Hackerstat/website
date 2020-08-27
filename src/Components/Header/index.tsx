import React, { FunctionComponent } from 'react';
import { Box, Flex, Button, Heading, ButtonGroup, useColorMode } from '@chakra-ui/core';
import NextLink from 'next/link';
import Link from '../Link';

const Header: FunctionComponent = () => {
  const { colorMode } = useColorMode();

  return (
    <Box w={'100%'} p={4}>
      <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems="center">
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Link href={'/'} mr={2}>
            <Heading>{'Hackerstats'}</Heading>
          </Link>
        </Flex>
        <NextLink href="/auth" passHref>
          <ButtonGroup>
            <Button variant={'ghost'} variantColor={'brand'} marginX={1}>
              Log In
            </Button>
            <Button variant={'solid'} variantColor={'brand'} marginX={1}>
              Sign Up
            </Button>
          </ButtonGroup>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Header;
