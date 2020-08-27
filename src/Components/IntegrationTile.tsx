import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Flex, Text, PseudoBox, useColorMode } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Card';

const colors = { light: 'gray.800', dark: 'white' };

const IntegrationTile: FunctionComponent = ({ icon, name }) => {
  const { colorMode } = useColorMode();

  const [color, setColor] = useState(colors[colorMode]);

  useEffect(() => {
    setColor(color[colorMode]);
  }, [colorMode]);

  return (
    <Card
      height={'100px'}
      width={'100px'}
      onClick={() => {
        console.log('h');
      }}
    >
      <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'100%'}>
        <FontAwesomeIcon
          icon={icon}
          size={'3x'}
          color={color[colorMode]}
          style={{
            textAlign: 'center',
          }}
        />
        <Text fontFamily={'monospace'} fontSize={'sm'} textAlign={'center'}>
          {name}
        </Text>
      </Flex>
    </Card>
  );
};

export default IntegrationTile;
