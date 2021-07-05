import React, { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import { Text, Box, Stack, useColorMode, Flex, Heading } from '@chakra-ui/react';
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

/**
 * @name SidebarMenuItem
 * @description This component is the sidebar items for the settings menu.
 * @author @LouisIV
 * @param {SidebarMenuItemProps} props It is the prop object of the component.
 * @param {boolean} props.selected This determines if the current sidebar item is selected or not.
 * @param {string} props.href This is the URL that the sidebar menu item directs to when clicked on.
 * @param {boolean} props.name This is the title of the sidebar menu item.
 * @param {SidebarMenuItemColors} props.colors This an object of colors that vary between activeLink, inActiveLink, and highlightedLink.
 * @returns {FunctionComponent<SidebarMenuItemProps>}
 */
const SidebarMenuItem: FunctionComponent<SidebarMenuItemProps> = ({ selected = false, href, name, colors }) => {
  return (
    <Link href={href} passHref>
      <Box
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
        <Box
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
        </Box>
      </Box>
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
