import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Box, Heading, Text, Flex, Button, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SettingsPage from '../../../../../Components/SettingsPage';
import Loader from '../../../../../Components/Loader';
import { GitHubRepoDataRow, GitHubUserData } from '../../../../../Components/GitHub';
import AuthLayer from '../../../../../Components/AuthLayer';
import { GitHubRepoDisplayDataType, GitHubUserAccountType } from '../../../../../utils/utils';
import Axios from 'axios';

const GithubAuthenticator = ({ router: router }) => {
  const [isFailed, setFailed] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [gitHubAccountData, setGitHubAccountData] = useState<GitHubUserAccountType>();
  const [gitHubUserRepos, setgitHubUserRepos] = useState<Array<GitHubRepoDisplayDataType>>([]);

  const addGitHubData = async () => {
    setIsSaving(true);
    await Axios.post('/api/github/addRepos', {
      ...gitHubAccountData,
      repos: gitHubUserRepos,
    });
    router.push('/settings/integrations/add/GitHub');
  };

  useEffect(() => {
    Axios.get('/api/github/addVerification', { params: { code: router.query?.code } })
      .then((res) => {
        const { avatar_url, user, name, location, followers, following, repos } = res.data;
        setGitHubAccountData({ avatar_url, user, name, location, followers, following });
        setgitHubUserRepos(repos);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setFailed(true);
        router.push('/settings/integrations/add/GitHub');
      });
  }, []);
  return (
    <>
      {isLoaded && !isFailed ? (
        <Box ml={5} w="100%">
          <Heading>Verification</Heading>
          <GitHubUserData userData={gitHubAccountData} />
          <Flex alignItems="center" flexDirection="column" mt={5} w="90%">
            <Flex w="100%" justifyContent="space-between">
              <Heading>GitHub Repos</Heading>
              <Button isLoading={isSaving} loadingText="Saving" onClick={async () => await addGitHubData()}>
                Save
              </Button>
            </Flex>
            <GitHubRepoDataRow repos={gitHubUserRepos} changeRepos={setgitHubUserRepos} />
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
      <SettingsPage>{mounted ? <GithubAuthenticator router={router} /> : <Loader />}</SettingsPage>
    </AuthLayer>
  );
};

export default IntegrationsPage;
