import React, { FunctionComponent } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageWorkPiece from '../ImageWorkPiece';
import ExternalLink from '../ExternalLink';
import { DribbblePiecesData } from '../../types';

const DribbblePiece: FunctionComponent<DribbblePiecesData> = ({ img, title, link }) => (
  <ImageWorkPiece img={img}>
    <Text minH={['10px', '40px']} w="100%" noOfLines={2} fontSize={['sm', 'md']}>
      <strong>{title}</strong>
    </Text>
    <ExternalLink href={link}>
      <Flex w="100%" justifyContent="flex-end">
        <FontAwesomeIcon size={'1x'} icon={faExternalLinkAlt} />
      </Flex>
    </ExternalLink>
  </ImageWorkPiece>
);

export default React.memo(DribbblePiece);
