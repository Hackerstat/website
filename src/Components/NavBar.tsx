import React, { FunctionComponent } from 'react';
import { Stack, Text, Flex, Heading, Box, Button } from '@chakra-ui/core';
import { useFetchUser } from '../utils/user';
import Link from './Link';

const MenuItems = ({ children, href }) => (
  <Link href={href}>
    <Box mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Box>
  </Link>
);

const Navbar: FunctionComponent = () => {
  const { user, loading } = useFetchUser();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      bg={['salmon', 'teal.500', 'gray.300']}
      justify={'space-between'}
      wrap={'wrap'}
      padding={'1.5rem'}
      color={'white'}
    >
      <Flex align="center" mr={5}>
        <Link href={'/'}>
          <Heading as="h1" size="lg">
            HackerStats
          </Heading>
        </Link>
      </Flex>

      <Box display={['block', 'block', 'none']} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Flex
        display={[show ? 'block' : 'none', show ? 'block' : 'none', 'flex']}
        width={['full', 'full', 'auto']}
        flexDirection={['column', 'column', 'row']}
        alignItems="center"
        flexGrow={1}
      >
        {user && !loading
          ? [
              <MenuItems key={'logout'} href="/api/logout">
                Logout
              </MenuItems>,
              <MenuItems key={'profile'} href="/profile">
                Profile
              </MenuItems>,
            ]
          : null}
      </Flex>

      <Box display={[show ? 'block' : 'none', show ? 'block' : 'none', 'block']} mt={{ base: 4, md: 0 }}>
        {!user && !loading ? (
          <Link href="/api/login">
            <Text>Login</Text>
          </Link>
        ) : null}
      </Box>

      {/* <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box> */}

      {/* <Stack isInline>
        <Text>Home</Text>
        {user && !loading
          ? [
              <Link key={'logout'} href="/api/logout">
                Logout
              </Link>,
              <Link key={'profile'} href="/profile">
                Profile
              </Link>,
            ]
          : null}
      
      </Stack> */}
    </Flex>
  );
};

export default Navbar;
