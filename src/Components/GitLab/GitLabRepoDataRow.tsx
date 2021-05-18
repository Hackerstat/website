import React from 'react';
import {
  Box,
  Flex,
  Input,
  FormLabel,
  FormControl,
  Heading,
  Button,
  Stack,
  Text,
  FormErrorMessage,
  useToast,
  Image,
} from '@chakra-ui/core';
import { faCodeBranch, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GitHubRepoDisplayDataType, SetGitHubRepoDisplayDataType } from '../../utils/utils';

export const GitLabRepoDataRow = ({
  repos,
  changeRepos,
}: {
  repos: Array<GitHubRepoDisplayDataType>;
  changeRepos: SetGitHubRepoDisplayDataType;
}): JSX.Element => {
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
