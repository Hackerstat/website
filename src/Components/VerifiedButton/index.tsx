import React, { FunctionComponent } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const VerifiedButton: FunctionComponent = () => (
  <Flex mb={1} ml={1} p={1} alignItems="center" backgroundColor="green" borderRadius={5}>
    <FontAwesomeIcon color="white" size="1x" icon={faCheckCircle} />
    <Text fontSize="xs" pl={1} color="white">
      Verified
    </Text>
  </Flex>
);
