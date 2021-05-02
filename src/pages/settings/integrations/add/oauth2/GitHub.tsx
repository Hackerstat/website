import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
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
  const [gitHubAccountData, setGitHubAccountData] = useState<GitHubUserAccountType>();
  const [gitHubUserRepos, setgitHubUserRepos] = useState<Array<GitHubRepoDisplayDataType>>([]);

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
      });
  }, []);
  return (
    <>
      {isLoaded && !isFailed ? (
        <Box w="100%">
          <Heading>Verification</Heading>
          <GitHubUserData userData={gitHubAccountData} />
          {/* <Flex mt={2} alignItems="flex-start">
            <Image src={gitHubAccountData.avatar_url} w={75} h={75} />
            <Box>
              <Text fontSize={18} fontFamily={'monospace'} ml={2}>
                {gitHubAccountData.user}
              </Text>
              <Flex>
                <Text fontSize={15} fontFamily={'monospace'} ml={2}>
                  Name: {gitHubAccountData.name},
                </Text>
                <Text fontSize={15} fontFamily={'monospace'} ml={2}>
                  Location: {gitHubAccountData.location}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize={15} fontFamily={'monospace'} ml={2}>
                  Followers: {gitHubAccountData.followers},
                </Text>
                <Text fontSize={15} fontFamily={'monospace'} ml={2}>
                  Following: {gitHubAccountData.following}
                </Text>
              </Flex>
            </Box>
          </Flex> */}
          <Box mt={5} w="100%">
            <Heading ml={3}>GitHub Repos</Heading>
            <GitHubRepoDataRow repos={gitHubUserRepos} />
          </Box>
        </Box>
      ) : !isFailed ? (
        <Box w="100%" textAlign="center">
          <Loader />
        </Box>
      ) : (
        <Text>Could not retrieve Data</Text>
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
