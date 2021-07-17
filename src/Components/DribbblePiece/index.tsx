import React, { useState, FunctionComponent, useEffect } from 'react';
import { Flex, Box, Text, useColorMode } from '@chakra-ui/react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExternalLink from '../ExternalLink';
import { DribbblePiecesData } from '../../utils';

const DribbblePiece: FunctionComponent<DribbblePiecesData> = ({ img, title, link }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPushingUp, setIsPushingUp] = useState(false);
  const { colorMode } = useColorMode();
  useEffect(() => {
    setTimeout(() => setIsPushingUp(true), 500);
  });
  return (
    <Box
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      borderRadius={20}
      transition=".25s all ease-in"
      mt={isPushingUp ? 10 : 200}
      opacity={isPushingUp ? 1.0 : 0.0}
      position="relative"
      height={['210px', '260px', '300px']}
      width={['300px', '380px', '400px']}
      backgroundImage={img}
      backgroundSize={['300px 210px', '400px 260px', '400px 300px']}
      backgroundRepeat={'no-repeat'}
      boxShadow={colorMode === 'light' ? (isHovering ? '0px 10px 10px 0px #C4C4C4' : '0px 5px 5px 0px #C4C4C4') : ''}
    >
      <Box
        transition=".25s all ease-in"
        padding={2}
        pt={[5, 5, 7]}
        opacity={isHovering ? 0.95 : 0.0}
        h={['45%', '35%']}
        w="100%"
        background="linear-gradient(to top, black, transparent)"
        position="absolute"
        bottom={0}
        borderBottomRadius={20}
        color="white"
      >
        <Text minH={['10px', '40px']} w="100%" noOfLines={2} fontSize={['sm', 'md']}>
          <strong>{title}</strong>
        </Text>
        <ExternalLink href={link}>
          <Flex w="100%" justifyContent="flex-end">
            <FontAwesomeIcon size={'1x'} icon={faExternalLinkAlt} />
          </Flex>
        </ExternalLink>
      </Box>
    </Box>
  );
};

export default React.memo(DribbblePiece);
