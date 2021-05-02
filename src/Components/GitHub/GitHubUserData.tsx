import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/core';
import { GitHubUserAccountType } from '../../utils/utils';

export const GitHubUserData = ({ userData }: { userData: GitHubUserAccountType }): JSX.Element => {
  const { avatar_url, user, name, location, followers, following } = userData;
  return (
    <Flex mt={2} alignItems="flex-start">
      <Image src={avatar_url} w={75} h={75} />
      <Box>
        <Text fontSize={18} fontFamily={'monospace'} ml={2}>
          {user}
        </Text>
        <Flex>
          <Text fontSize={15} fontFamily={'monospace'} ml={2}>
            Name: {name},
          </Text>
          <Text fontSize={15} fontFamily={'monospace'} ml={2}>
            Location: {location}
          </Text>
        </Flex>
        <Flex>
          <Text fontSize={15} fontFamily={'monospace'} ml={2}>
            Followers: {followers},
          </Text>
          <Text fontSize={15} fontFamily={'monospace'} ml={2}>
            Following: {following}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
