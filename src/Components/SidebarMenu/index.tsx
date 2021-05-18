import React, { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import { Text, PseudoBox, Stack, useColorMode, Flex, Heading, Box } from '@chakra-ui/core';
import Link from 'next/link';

type SidebarMenuItemColors = {
  activeLink: string;
  inactiveLink: string;
  highlighColor: string;
};

const sidebarMenuColors: { dark: SidebarMenuItemColors; light: SidebarMenuItemColors } = {
  dark: {
    activeLink: 'black',
    inactiveLink: 'white',
    highlighColor: 'whiteAlpha.900',
  },
  light: {
    activeLink: 'white',
    inactiveLink: 'gray.700',
    highlighColor: 'gray.700',
  },
};

interface SidebarMenuItemProps {
  selected?: boolean;
  href: string;
  name: string;
  colors: SidebarMenuItemColors;
}

const SidebarMenuItem: FunctionComponent<SidebarMenuItemProps> = ({ selected = false, href, name, colors }) => {
  return (
    <Link href={href} passHref>
      <PseudoBox
        role={'group'}
        as={'a'}
        cursor="pointer"
        borderLeftColor={selected ? colors.highlighColor : undefined}
        borderLeftWidth={2}
        backgroundColor={selected ? colors.highlighColor : undefined}
        _hover={
          !selected && {
            borderLeftWidth: '4px',
            borderLeftColor: colors.highlighColor,
          }
        }
        _focus={
          !selected && {
            borderLeftWidth: '4px',
            borderLeftColor: colors.highlighColor,
          }
        }
        transition="all 0.1s ease"
      >
        <PseudoBox
          ml={1}
          py={1}
          transform={selected ? 'translate(10px)' : undefined}
          _groupHover={
            !selected && {
              color: 'white',
              transform: 'translate(10px);',
              fontWeight: 'bold',
            }
          }
        >
          <Text
            color={selected ? colors.activeLink : colors.inactiveLink}
            letterSpacing={'wide'}
            fontWeight={selected ? 'bold' : undefined}
          >
            {name}
          </Text>
        </PseudoBox>
      </PseudoBox>
    </Link>
  );
};

export type TSidebarMenuItem = {
  href: string;
  name: string;
};

interface SidebarMenuLinksProps {
  sidebarColors: SidebarMenuItemColors;
  items: Array<TSidebarMenuItem>;
  selectedItem: string;
}

const SidebarMenuLinks: FunctionComponent<SidebarMenuLinksProps> = ({
  items,
  selectedItem,
  sidebarColors,
  ...rest
}) => (
  <Stack {...rest} minW={['80vw', 'xs']} width={'100%'} flexWrap={'wrap'}>
    {items.map(({ href, name, ...additionalMenuItemProps }) => {
      return (
        <SidebarMenuItem
          selected={selectedItem.includes(href)}
          key={name}
          href={href}
          name={name}
          colors={sidebarColors}
          {...additionalMenuItemProps}
        />
      );
    })}
  </Stack>
);

interface SidebarMenuProps extends Pick<SidebarMenuLinksProps, 'items' | 'selectedItem'> {
  title: string;
}

const backgroundColors = { light: 'lightMenuBackground', dark: 'darkMenuBackground' };

const SidebarMenu: FunctionComponent<SidebarMenuProps> = (props) => {
  const { colorMode } = useColorMode();
  const [sidebarColors, setSidebarColors] = useState<SidebarMenuItemColors>(sidebarMenuColors['dark']);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors['dark']);

  useEffect(() => {
    setSidebarColors(sidebarMenuColors[colorMode]);
    setBackgroundColor(backgroundColors[colorMode]);
  }, [colorMode]);

  return (
    <Flex
      flexDirection={'column'}
      minW={['100%', 'xs']}
      maxW={'lg'}
      width={'100%'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
      borderRadius={'md'}
    >
      <Heading textAlign={'left'}>{props.title}</Heading>
      <Box mt={2} backgroundColor={backgroundColor} borderRadius={'md'} overflow={'hidden'}>
        <SidebarMenuLinks sidebarColors={sidebarColors} {...props} />
      </Box>
    </Flex>
  );
};

export default SidebarMenu;
