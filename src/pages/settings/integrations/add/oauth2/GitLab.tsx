import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Box, Heading, Text, Flex, Button, Skeleton } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import SettingsPage from '../../../../../Components/SettingsPage';
import Loader from '../../../../../Components/Loader';
// import { GitHubRepoDataRow, GitHubUserData } from '../../../../../Components/GitHub';
// import { NextApiRequest, NextApiResponse } from 'next';
import AuthLayer from '../../../../../Components/AuthLayer';
// import { GitHubRepoDisplayDataType, GitHubUserAccountType } from '../../../../../utils/utils';
import Axios from 'axios';

const GitLabAuthenticator = ({ router: router }) => {
  const [isFailed, setFailed] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const [gitHubAccountData, setGitHubAccountData] = useState<GitHubUserAccountType>();
  // const [gitHubUserRepos, setgitHubUserRepos] = useState<Array<GitHubRepoDisplayDataType>>([]);

  const addGitHubData = async () => {
    // setIsSaving(true);
    // await Axios.post('/api/github/addRepos', {
    //   ...gitHubAccountData,
    //   repos: gitHubUserRepos,
    // });
    // router.push('/settings/integrations/add/GitHub');
  };

  useEffect(() => {
    // Axios.get('/api/gitlab/addVerification', { params: { code: router.query?.code, state: router.query?.state } })
    //   .then((res) => {
    //     // const { avatar_url, user, name, location, followers, following, repos } = res.data;
    //     // setGitHubAccountData({ avatar_url, user, name, location, followers, following });
    //     // setgitHubUserRepos(repos);
    //     console.log(res.status);
    //     setLoaded(true);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setFailed(true);
    //     router.push('/settings/integrations/add/GitLab');
    //   });
    // console.log(localStorage.getItem('code_verifier'));
    const code_verifier = localStorage.getItem('code_verifier');
    const URL = `https://gitlab.com/oauth/token`;
    Axios.post(URL, {
      client_id: 'a79cf3786413327d873e83d47d7308b9b618fa6e8393ce3c1967b18281a0f377',
      client_secret: 'NOT_YET',
      code: router.query?.code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/settings/integrations/add/oauth2/GitLab',
      code_verifier: code_verifier,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message));
  }, []);
  return (
    <>
      {isLoaded && !isFailed ? (
        <Box ml={5} w="100%">
          <Heading>Verification</Heading>
          {/* <GitHubUserData userData={gitHubAccountData} /> */}
          <Flex alignItems="center" flexDirection="column" mt={5} w="90%">
            <Flex w="100%" justifyContent="space-between">
              <Heading>GitHub Repos</Heading>
              <Button isLoading={isSaving} loadingText="Saving" onClick={async () => await addGitHubData()}>
                Save
              </Button>
            </Flex>
            {/* <GitHubRepoDataRow repos={gitHubUserRepos} changeRepos={setgitHubUserRepos} /> */}
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
