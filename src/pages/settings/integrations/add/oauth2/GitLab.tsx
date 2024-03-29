import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Axios from 'axios';
import SettingsPage from '../../../../../Components/SettingsPage';
import Loader from '../../../../../Components/Loader';
import { GitHubUserData, GitHubRepoDataRow } from '../../../../../Components/GitHub';
import AuthLayer from '../../../../../Components/AuthLayer';
import { GitHubRepoLanguagesType } from '../../../../../types';

export interface GitLabRepoDisplayDataType {
  contributors: string;
  des: string;
  forks: number;
  languages: GitHubRepoLanguagesType;
  lastUpdated: string;
  owner: string;
  private: boolean;
  repoName: string;
  stars: number;
  sz: number;
  url: string;
  watchers: number;
}

export interface GitLabUserAccount {
  avatar_url: string;
  email: string;
  user: string;
  name: string;
  id: number;
  followers: number;
  following: number;
  location: string;
}

/**
 * @REDO
 */
const GitLabAuthenticator = ({ router: router }) => {
  const [isFailed, setFailed] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [gitLabAccountData, setGitLabAccountData] = useState<GitLabUserAccount>();
  const [gitLabUserRepos, setGitLabUserRepos] = useState<Array<GitLabRepoDisplayDataType>>([]);

  const addGitLabData = async () => {
    setIsSaving(true);
    const GITLAB_ADD_REPOS = '/api/gitlab/addRepos';
    await Axios.post(GITLAB_ADD_REPOS, {
      ...gitLabAccountData,
      repos: gitLabUserRepos,
    });
    router.push('/settings/integrations/add/GitLab');
  };

  console.log(gitLabAccountData, gitLabUserRepos);

  useEffect(() => {
    // const code_verifier = localStorage.getItem('code_verifier');
    const AUTH_URL = `https://gitlab.com/oauth/token`;
    Axios.post(AUTH_URL, {
      client_id: 'bd68a5365d5be0784ff0f75d26b8e3a9c8213df18a78a68df4c95c41797d7289',
      client_secret: 'SECRET',
      code: router.query?.code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/settings/integrations/add/oauth2/GitLab',
      // code_verifier: code_verifier,
    }).then((res) => {
      // const USERPROFILE_URL = 'https://gitlab.com/api/v4/user';
      const {
        data: { access_token },
      } = res;
      const GITLAB_ADD_VERIFICATION = '/api/gitlab/addVerification';
      Axios.get(GITLAB_ADD_VERIFICATION, { headers: { gitLabToken: access_token } })
        .then((res) => {
          const { repos, ...gitLabUserData } = res.data;
          setGitLabAccountData(gitLabUserData);
          setGitLabUserRepos(repos);
          setLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          setFailed(true);
        });
    });
  }, []);
  return (
    <>
      {isLoaded && !isFailed ? (
        <Box ml={5} w="100%">
          <Heading>Verification</Heading>
          <GitHubUserData userData={gitLabAccountData} />
          <Flex alignItems="center" flexDirection="column" mt={5} w="90%">
            <Flex w="100%" justifyContent="space-between">
              <Heading>GitHub Repos</Heading>
              <Button isLoading={isSaving} loadingText="Saving" onClick={async () => await addGitLabData()}>
                Save
              </Button>
            </Flex>
            <GitHubRepoDataRow repos={gitLabUserRepos} changeRepos={setGitLabUserRepos} />
          </Flex>
        </Box>
      ) : !isFailed ? (
        <Box w="100%" textAlign="center">
          <Loader />
        </Box>
      ) : (
        <Text>Could not retrieve Data. Try Again.</Text>
      )}
    </>
  );
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthLayer>
      <SettingsPage>{mounted ? <GitLabAuthenticator router={router} /> : <Loader />}</SettingsPage>
    </AuthLayer>
  );
};

export default IntegrationsPage;
