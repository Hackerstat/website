import React, { FunctionComponent } from 'react';
import { useColorMode, Select, Flex } from '@chakra-ui/react';

const ColorModePicker: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
      <Select
        defaultValue={colorMode}
        onChange={(event) => {
          const selectedColor = event.target.value;
          if (selectedColor !== colorMode) {
            toggleColorMode();
            console.log('changed color mode');
          }
        }}
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </Select>
    </Flex>
  );
};

export { ColorModePicker };
