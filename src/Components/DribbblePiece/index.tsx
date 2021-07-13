import React, { useState, FunctionComponent } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { DribbblePiecesData } from '../../utils';

const DribbblePiece: FunctionComponent<DribbblePiecesData> = ({ img, title, link }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Box
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      borderRadius={10}
      position="relative"
      height="320px"
      width="320px"
    >
      <Image src={img} />
      <Box
        transition=".25s all ease-in"
        padding={2}
        opacity={isHovering ? 0.75 : 0.0}
        h="25%"
        w="100%"
        backgroundColor="black"
        position="absolute"
        bottom={20}
      >
        <Text noOfLines={2} fontSize={'xl'}>
          {title}
        </Text>
      </Box>
    </Box>
  );
};

export default React.memo(DribbblePiece);
