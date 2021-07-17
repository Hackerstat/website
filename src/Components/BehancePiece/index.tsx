import React, { FunctionComponent } from 'react';
import { Flex, Box, Text, HStack } from '@chakra-ui/react';
import { faEye, faThumbsUp, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageWorkPiece from '../ImageWorkPiece';
import ExternalLink from '../ExternalLink';
import { BehanceWorkPieceType } from '../../utils';

const BehancePiece: FunctionComponent<BehanceWorkPieceType> = ({ image, title, link, likes, watches }) => (
  <ImageWorkPiece img={image}>
    <Box>
      <Text minH={['10px', '40px']} w="100%" noOfLines={2} fontSize={['sm', 'md']}>
        <strong>{title}</strong>
      </Text>
      <Flex color="white" w="100%" alignItems="center" justifyContent="space-between">
        <HStack spacing={2}>
          <HStack spacing={2}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <Text>{likes}</Text>
          </HStack>
          <HStack spacing={2}>
            <FontAwesomeIcon icon={faEye} />
            <Text>{watches}</Text>
          </HStack>
        </HStack>
        <ExternalLink href={link}>
          <Flex w="100%" justifyContent="flex-end">
            <FontAwesomeIcon size={'1x'} icon={faExternalLinkAlt} />
          </Flex>
        </ExternalLink>
      </Flex>
    </Box>
  </ImageWorkPiece>
);

export default React.memo(BehancePiece);
