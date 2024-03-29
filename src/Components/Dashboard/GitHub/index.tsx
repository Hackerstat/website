import React, { useState, useEffect, FunctionComponent } from 'react';
import Axios from 'axios';
import { BoxProps, Stack, useColorMode, Skeleton } from '@chakra-ui/react';
import IntegrationWrapperCard from '../IntegrationWrapperCard';
import { IntegrationTypes, GitHubRepoDisplayDataType } from '../../../types';
import { ContributionsCalendarType } from '../../types';
import { GitHubRepoDataRow, GitHubUserData, GitHubCalendar } from '../../GitHub';

interface GitHubCardProps extends BoxProps {
  username: string;
}

interface ContributionsCollectionType {
  startedAt: string;
  endedAt: string;
  hasAnyContributions: boolean;
  hasActivityInThePast: boolean;
  contributionCalendar: ContributionsCalendarType;
}
interface GitHubRemoteAPIReturnDataType {
  data?: {
    user?: {
      contributionsCollection?: ContributionsCollectionType;
    };
  };
  _id: string;
  followers: number;
  following: number;
  avatar_url: string;
  repos: Array<GitHubRepoDisplayDataType>;
  user: string;
}

const GITHUB_URL = 'api/github/remoteGithub';
const colors = { light: 'gray.800', dark: 'white' };

const GitHubCard: FunctionComponent<GitHubCardProps> = ({ username, ...props }) => {
  const { colorMode } = useColorMode();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState(colors[colorMode]);
  const [gitHubRepoData, setGitHubRepoData] = useState<Partial<GitHubRemoteAPIReturnDataType>>({});

  useEffect(() => {
    Axios.get(GITHUB_URL, { params: { username } })
      .then((data) => {
        console.log(data);
        setGitHubRepoData(data.data as GitHubRemoteAPIReturnDataType);
        setLoading(true);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);
  return (
    <>
      {!error && (
        <IntegrationWrapperCard icon={IntegrationTypes.GITHUB} {...props} verified>
          <Skeleton maxH={'md'} isLoaded={loading}>
            <GitHubUserData
              isLinked={true}
              userData={{
                avatar_url: gitHubRepoData.avatar_url,
                followers: gitHubRepoData.followers,
                following: gitHubRepoData.following,
                user: gitHubRepoData.user,
              }}
            />
          </Skeleton>
          <GitHubCalendar
            gitHubCalendarEvents={gitHubRepoData.data?.user?.contributionsCollection?.contributionCalendar}
          />
          <Stack overflow="scroll" maxW={['xs', 'sm', 'md']} spacing={2} mt={2} maxH={'lg'} borderRadius={'lg'}>
            <GitHubRepoDataRow repos={gitHubRepoData.repos} username={gitHubRepoData.user} />
          </Stack>
        </IntegrationWrapperCard>
      )}
    </>
  );
};

export default React.memo(GitHubCard);
