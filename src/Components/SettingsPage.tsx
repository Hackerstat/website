import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Flex, Stack, Heading, Text, useColorMode, PseudoBox } from '@chakra-ui/core';
import Link from 'next/link';
import SidebarMenu, { TSidebarMenuItem } from './SidebarMenu';
import PageBase from './Page';

const backgroundColors = { light: 'gray.200', dark: 'gray.700' };

const sidebarMenuItems: Array<TSidebarMenuItem> = [
  {
    href: '/',
    name: 'Personal Information',
  },
  {
    href: '/',
    name: 'Work History',
  },
  {
    href: '#',
    name: 'Delete Account',
  },
];

const SettingsBase = ({ children, title }): JSX.Element => {
  const { colorMode } = useColorMode();

  const [backgroundColor, setBackgroundColor] = useState<string>('gray.700');

  useEffect(() => {
    setBackgroundColor(backgroundColors[colorMode]);
  }, [colorMode]);

  return (
    <PageBase>
      <Flex
        width={'100%'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        mt={[2, 2, 2, 16]}
        justifyContent={[undefined, undefined, undefined, 'space-around']}
      >
        <SidebarMenu title={'Settings'} items={sidebarMenuItems} selectedItem={'Personal Information'} mb={8} />
        {children}
      </Flex>
    </PageBase>
  );
};

export default SettingsBase;
