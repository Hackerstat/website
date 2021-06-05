import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { GitHubUserAccountType, GitLabUserAccount } from '../../utils/utils';

export const GitHubUserData = ({ userData }: { userData: GitHubUserAccountType | GitLabUserAccount }): JSX.Element => {
  const { avatar_url, user, name, location, followers, following } = userData;
  return (
    <Flex mt={2} alignItems="flex-start">
      <Image src={avatar_url} w={75} h={75} />
      <Box>
        <Text fontSize={18} fontFamily={'monospace'} ml={2}>
          {user}
        </Text>
        <Flex flexWrap="wrap">
          <Text fontSize={15} fontFamily={'monospace'} ml={2}>
            Name: {name},
          </Text>
          <Text fontSize={15} fontFamily={'monospace'} ml={2}>
            Location: {location}
          </Text>
        </Flex>
        <Flex flexWrap="wrap">
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
