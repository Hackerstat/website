import React, { FunctionComponent, useEffect, useState } from 'react';
import { Flex, Text, useColorMode } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Card';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';

const colors = { light: 'gray.800', dark: 'white' };

interface IntegrationTileProps {
  icon?: IconProp;
  name?: string;
  link?: string;
  disabled?: boolean;
}

const IntegrationTile: FunctionComponent<IntegrationTileProps> = ({ icon, name, link, disabled = false }) => {
  const { colorMode } = useColorMode();

  const [color, setColor] = useState(colors[colorMode]);

  const router = useRouter();

  useEffect(() => {
    setColor(colors[colorMode]);
  }, [colorMode]);

  return (
    <Card
      height={'100px'}
      width={'100px'}
      onClick={
        !disabled
          ? () => {
              router.push(`/settings/integrations/add/${link}`);
            }
          : undefined
      }
      opacity={disabled ? 0.6 : undefined}
    >
      <Flex
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100%'}
        width={'100%'}
        color={color}
      >
        <FontAwesomeIcon
          icon={icon}
          size={'3x'}
          style={{
            textAlign: 'center',
          }}
        />
        <Text
          fontWeight={'bold'}
          letterSpacing={'wide'}
          fontFamily={'monospace'}
          fontSize={'sm'}
          textAlign={'center'}
          width={'80%'}
        >
          {name}
        </Text>
      </Flex>
    </Card>
  );
};

export default IntegrationTile;
