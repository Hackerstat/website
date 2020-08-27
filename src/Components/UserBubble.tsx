import React from 'react';
import { Avatar, Skeleton, Icon, Flex, MenuList, MenuItem, MenuDivider, Menu, MenuButton } from '@chakra-ui/core';
import { useFetchUser } from '../utils/user';
import Link from 'next/link';

const UserBubble = () => {
  const { user, loading } = useFetchUser();

  console.log(user);

  return (
    <Menu>
      <MenuButton>
        <Skeleton isLoaded={!loading}>
          <Flex flexDirection={'row'} alignItems={'center'}>
            <Avatar size={'sm'} src={user?.picture} />
            <Icon ml={1} fontSize={'xs'} name="triangle-down" color="gray.500" />
          </Flex>
        </Skeleton>
      </MenuButton>
      <MenuList>
        <Link href="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
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
  );
};

export default UserBubble;
