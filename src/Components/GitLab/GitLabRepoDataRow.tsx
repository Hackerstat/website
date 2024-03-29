import React, { FunctionComponent } from 'react';
import { Box, Flex, Heading, Button, Stack, Text } from '@chakra-ui/react';
import { faCodeBranch, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GitHubRepoDisplayDataType } from '../../types';
import { SetGitHubRepoDisplayDataType } from '../types';

interface GitLabRepoDataRowProps {
  repos: Array<GitHubRepoDisplayDataType>;
  changeRepos: SetGitHubRepoDisplayDataType;
}

/**
 * @name GitLabRepoDataRow
 * @description This component displays a list of individual GitLab Repo data w/ details of the repo's top language, size, watchers, and description. It also allows the removal of repos.
 * @author @Cgunter1
 * @param {GitHubRepoDataRowProps} props This is the props for the component.
 * @param {Array<GitHubRepoDisplayDataType>} props.repos This is a list of the user's GitLab Repos including forks, description, stars, size, and etc..
 * @param {SetGitHubRepoDisplayDataType} props.changeRepos This is the setState function that changes the props.repos variable and re-renders the component.
 * @returns {FunctionComponent<GitHubRepoDataRowProps>}
 */
export const GitLabRepoDataRow: FunctionComponent<GitLabRepoDataRowProps> = ({ repos, changeRepos }) => {
  /**
   * @name filterRepos
   * @description This function filters out any repos from the variable repo and re-renders the component without the removed repo.
   * @author @Cgunter1
   * @param {GitHubRepoDisplayDataType} repo The repo object to be removed from the list of repos.
   */
  const filterRepos = (repo: GitHubRepoDisplayDataType) => {
    const newRepos = repos.filter(({ url, des }) => repo.url !== url && repo.des !== des);
    changeRepos(newRepos);
  };
  return (
    <Stack direction="column" mt={2} spacing="24px">
      {repos.map((repo) => (
        <Box m="0 auto" borderRadius={10} p={3} border="1px solid white" w="100%" key={`${repo.url}`}>
          <Flex pr={3} w="100%" justifyContent="space-between" alignItems="center">
            <Heading fontSize={'2xl'}>{repo.repoName}</Heading>
            <Button onClick={() => filterRepos(repo)}>
              <FontAwesomeIcon size="lg" icon={faTrash} />
            </Button>
          </Flex>
          <Stack flexWrap="wrap" w="100%" ml={1} fontSize="lg" direction="row" spacing="12px" shouldWrapChildren={true}>
            <Text>
              {Object.entries(repo.languages).length === 0 ? (
                <></>
              ) : (
                Object.entries(repo.languages).sort((a, b) => b[1] - a[1])[0][0]
              )}
            </Text>
            <Text>&middot;</Text>
            <Flex alignItems="center">
              <FontAwesomeIcon icon={faCodeBranch} />
              <Text ml={1}>{repo.forks}</Text>
            </Flex>
            <Text>&middot;</Text>
            <Text>{repo.sz}B</Text>
            <Text>&middot;</Text>
            <Flex alignItems="center">
              <FontAwesomeIcon icon={faEye} />
              <Text ml={1}>{repo.watchers}</Text>
            </Flex>
          </Stack>
          <Text fontSize={'sm'}>{repo.des}</Text>
        </Box>
      ))}
    </Stack>
  );
};
