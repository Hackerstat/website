import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Skeleton,
  Flex,
  MenuList,
  MenuItem,
  MenuDivider,
  Menu,
  MenuButton,
  useColorMode,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useFetchUser, getCurrentUsername } from '../utils';
import Link from 'next/link';

const textColors = { light: 'black', dark: 'white' };

const UserBubble: FunctionComponent = () => {
  const { user, loading } = useFetchUser();
  const [hackerStatUsername, setHackerStatUsername] = useState('');
  const { colorMode } = useColorMode();

  useEffect(() => {
    getCurrentUsername()
      .then((username) => setHackerStatUsername(username))
      .catch((err) => console.error(err));
  });

  return (
    <Box color={textColors[colorMode]} maxW="100%" overflow={'hidden'}>
      <Menu>
        <MenuButton>
          <Skeleton isLoaded={!loading}>
            <Flex flexDirection={'row'} alignItems={'center'}>
              <Avatar size={'sm'} src={user?.picture} />
              <TriangleDownIcon ml={1} fontSize={'xs'} color="gray.500" />
            </Flex>
          </Skeleton>
        </MenuButton>
        <MenuList>
          {!!hackerStatUsername && (
            <Link href={`/${hackerStatUsername}`}>
              <MenuItem>Profile</MenuItem>
            </Link>
          )}
          <Link href="/dashboard">
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <MenuDivider />
          <Link href="/settings/info">
            <MenuItem as="a">Settings</MenuItem>
          </Link>
          <Link href="/api/logout">
            <MenuItem as="a">Logout</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserBubble;
