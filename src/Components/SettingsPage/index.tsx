import React, { FunctionComponent, useEffect, useState } from 'react';
import { Flex, useColorMode } from '@chakra-ui/react';
import SidebarMenu, { TSidebarMenuItem } from '../SidebarMenu';
import PageBase from '../Page';
import { useRouter } from 'next/router';

const backgroundColors = { light: 'gray.200', dark: 'gray.700' };

const sidebarMenuItems: Array<TSidebarMenuItem> = [
  {
    href: '/settings/username',
    name: 'Username',
  },
  {
    href: '/settings/info',
    name: 'Personal Information',
  },
  {
    href: '/settings/workexperience',
    name: 'Work History',
  },
  {
    href: '/settings/integrations',
    name: 'Integrations',
  },
  {
    href: '#',
    name: 'Delete Account',
  },
];

const SettingsBase: FunctionComponent = ({ children }): JSX.Element => {
  const { colorMode } = useColorMode();

  const router = useRouter();

  const [backgroundColor, setBackgroundColor] = useState<string>('gray.700');

  useEffect(() => {
    setBackgroundColor(backgroundColors[colorMode]);
  }, [colorMode]);

  return (
    <PageBase>
      <Flex
        width={'100%'}
        flexDirection={['column', 'column', 'column', 'row']}
        mt={[2, 2, 2, 16]}
        justifyContent={'space-between'}
      >
        <Flex flexGrow={1} justifyContent={'flex-start'} mb={8} width={'27%'}>
          <SidebarMenu title={'Settings'} items={sidebarMenuItems} selectedItem={router.pathname} />
        </Flex>
        <Flex flexGrow={4}>{children}</Flex>
      </Flex>
    </PageBase>
  );
};

export default SettingsBase;
