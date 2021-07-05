import React, { FunctionComponent } from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { GitHubUserAccountType, formatNums } from '../../utils';
import ExternalLink from '../../Components/ExternalLink';

interface GitHubUserDataProps {
  userData: Partial<GitHubUserAccountType>;
  isLinked?: boolean;
}

/**
 * @name GitHubRepoDataRow
 * @description This component displays the GitHub user's personal info including name, location, followers, and etc..
 * @author @Cgunter1
 * @param {GitHubRepoDataRowProps} props This is the props for the component.
 * @param {Partial<GitHubUserAccountType>} props.userData This is a object that holds the GitHub user's info data.
 * @param {string} props.userData.avatar_url This is the GitHub user's Avatar Pic URL.
 * @param {string} props.userData.user This is the GitHub user's username.
 * @param {string} props.userData.name This is the GitHub user's full name.
 * @param {string} props.userData.location This is the GitHub user's location.
 * @param {number} props.userData.followers This is the GitHub user's total # of followers.
 * @param {number} props.userData.following This is the GitHub user's total # of users following them.
 * @returns {FunctionComponent<GitHubRepoDataRowProps>}
 */
export const GitHubUserData: FunctionComponent<GitHubUserDataProps> = ({
  userData: { avatar_url, user, name, location, followers, following },
  isLinked,
}) => {
  return (
    <Flex mt={2} alignItems="flex-start">
      <Image src={avatar_url} w={75} h={75} />
      <Box>
        {isLinked ? (
          <ExternalLink href={`https://github.com/${user}`}>
            <Text fontSize={18} fontFamily={'monospace'} ml={2}>
              {user}
            </Text>
          </ExternalLink>
        ) : (
          <Text fontSize={18} fontFamily={'monospace'} ml={2}>
            {user}
          </Text>
        )}
        <Flex flexWrap="wrap">
          {name && (
            <Text fontSize={15} fontFamily={'monospace'} ml={2}>
              Name: {name},
            </Text>
          )}
          {location && (
            <Text fontSize={15} fontFamily={'monospace'} ml={2}>
              Location: {location}
            </Text>
          )}
        </Flex>
        <Flex flexWrap="wrap">
          <Text fontSize={15} fontFamily={'monospace'} ml={2}>
            Followers: {formatNums(followers)},
          </Text>
          <Text fontSize={15} fontFamily={'monospace'} ml={2}>
            Following: {formatNums(following)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
