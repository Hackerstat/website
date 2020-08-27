import React, { FunctionComponent, useEffect, useState } from 'react';
import { Stack, Text, Flex, Heading, Box, Button, Image, useColorMode } from '@chakra-ui/core';
import { useFetchUser } from '../utils/user';
import Link from './Link';
import Logo from './Logo';
import UserBubble from './UserBubble';

const MenuItems = ({ children, href }) => (
  <Link href={href}>
    <Box mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Box>
  </Link>
);

const backgroundColors = { light: 'whiteAlpha.100', dark: 'gray.700' };
const textColors = { light: 'black', dark: 'white' };

const Navbar: FunctionComponent = () => {
  const { user, loading } = useFetchUser();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const { colorMode } = useColorMode();

  const [backgroundColor, setBackgroundColor] = useState<string>(backgroundColors['dark']);
  const [textColor, setTextColor] = useState(textColors['dark']);

  useEffect(() => {
    setBackgroundColor(backgroundColors[colorMode]);
    setTextColor(textColors[colorMode]);
  }, [colorMode]);

  return (
    <Flex
      as="nav"
      align="center"
      bg={'gray.900'}
      justify={'space-between'}
      wrap={'wrap'}
      padding={'1.5rem'}
      color={'white'}
      shadow={'lg'}
      backgroundColor={backgroundColor}
    >
      <Flex align="center" mr={5}>
        <Link href={'/'}>
          <Logo main={'white'} height={['30px', '30px', '40xp', '40px']} />
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
        color={textColor}
        fontFamily={'monospace'}
        fontSize={'lg'}
        fontWeight={'bold'}
        letterSpacing={'wide'}
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
        ) : (
          <UserBubble />
        )}
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
