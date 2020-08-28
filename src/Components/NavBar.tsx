import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Stack,
  Text,
  Flex,
  Heading,
  Box,
  Button,
  Image,
  useColorMode,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/core';
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

const LogoSizes = [30, 30, 40, 40];

const Navbar: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      // as="nav"
      align="center"
      bg={'gray.900'}
      justify={'space-between'}
      wrap={'wrap'}
      padding={'1.5rem'}
      color={'white'}
      shadow={'lg'}
      width={'100%'}
      maxW={'100vw'}
      overflowX={'hidden'}
      flexDirection={'row'}
      backgroundColor={backgroundColor}
    >
      <Box display={['block', 'block', 'none']} onClick={onOpen}>
        <svg
          fill={colorMode === 'dark' ? 'white' : 'gray.700'}
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Flex
        align="center"
        mr={5}
        justifySelf={'center'}
        alignSelf={'center'}
        position={['absolute', 'absolute', 'relative']}
        // left={'calc(50% - 15px)'}
        left={[...LogoSizes.map((size) => `calc(50% - ${size / 2}px)`).slice(0, 2), 0]}
      >
        <Link href={'/'}>
          <Logo size="small" height={LogoSizes.map((size) => `${+size}px`)} />
        </Link>
      </Flex>

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
              <MenuItems key={'integrations'} href="/integrations">
                Integrations
              </MenuItems>,
              ,
            ]
          : null}
      </Flex>

      <Box display={[show ? 'block' : 'none', show ? 'block' : 'none', 'block']} mt={{ base: 4, md: 0 }}>
        {!user && !loading ? (
          <Link href="/api/login">
            <Text color={textColor}>Login</Text>
          </Link>
        ) : null}
      </Box>

      <Box>
        <UserBubble />
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
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
            <Flex justifyContent={'center'} alignItems={'center'}>
              <Logo height={LogoSizes.map((size) => `${+size}px`)} />
            </Flex>
          </DrawerHeader>
          <DrawerBody fontFamily={'monospace'} fontSize={'lg'} fontWeight={'bold'} letterSpacing={'wide'}>
            <MenuItems key={'integrations'} href="/integrations">
              Integrations
            </MenuItems>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
