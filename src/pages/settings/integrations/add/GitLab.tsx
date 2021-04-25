import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import {
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
} from '@chakra-ui/core';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { HackerFile } from '../../../../types/hackerfile';
import ExternalLink from '../../../../Components/ExternalLink';

interface RepoInfo {
  repo: string;
  repoURL: string;
  result: Partial<HackerFile>;
  user: string;
}

const AddGitHubIntegrationPage: FunctionComponent = () => {
  const [repoURL, setRepoURL] = useState<string>();
  const [fetchError, setFetchError] = useState<string>();
  const [repoInfo, setRepoInfo] = useState<RepoInfo>();

  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);

  const toast = useToast();

  const CheckForHackerStatFile = async (repoURL) => {
    try {
      if (!repoURL) {
        setFetchError('Required');
        return;
      }

      const result = await Axios.get('/api/gitlab/fetchProject', {
        params: {
          repoURL: repoURL,
        },
      });

      if (result?.data?.error) {
        setFetchError(result?.data?.error);
        throw new Error(result?.data?.error);
      }

      setFetchError(null);
      setRepoInfo(result?.data);

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const addProjectToAccount = async (repo: RepoInfo) => {
    try {
      await Axios.post('/api/integration', {
        integrationType: 'gitlab',
        settings: { [`${repo.user}+${repo.repo}`]: repoURL },
      });
      toast({
        title: 'Added Integration',
        status: 'success',
        description: 'We added this integration to your account',
      });
    } catch (err) {
      toast({
        title: 'Something Went Wrong',
        status: 'error',
        description: 'Could not add integration to your account. Please try again later.',
      });
    }
  };

  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <Flex mb={4}>
        <FontAwesomeIcon icon={faGitlab} size={'3x'} />
        <Heading ml={3}>GitLab</Heading>
      </Flex>
      <Stack spacing={3}>
        <Text>
          {
            "You'll need to create a .hacker.yml in the root of your repo with the information you'd like to display about this project"
          }
        </Text>
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>Git Repo URL</FormLabel>
          <Input placeholder={'URL'} onChange={(e) => setRepoURL(e.target.value)} />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={fetchingHackerFile}
          onClick={() => {
            setFetchingHackerFile(true);
            try {
              CheckForHackerStatFile(repoURL);
            } catch (err) {
              console.log(err);
            } finally {
              setFetchingHackerFile(false);
            }
          }}
        >
          Check Repo
        </Button>
        <Flex alignItems={'center'}>
          <FontAwesomeIcon icon={faGitlab} size={'1x'} />
          <ExternalLink
            ml={2}
            href={repoInfo?.repoURL || undefined}
            isDisabled={!repoInfo?.repoURL}
            fontWeight={'bold'}
          >
            {repoInfo?.repo || '_______'}
          </ExternalLink>
        </Flex>
        <Text
          backgroundColor={'gray.900'}
          padding={3}
          borderRadius={'lg'}
          color={'white'}
          fontWeight={'bold'}
          fontFamily={'mono'}
          width={'100%'}
          whiteSpace={'pre'}
        >
          {JSON.stringify(repoInfo?.result || {}, null, '\t')}
        </Text>
        <Button
          isDisabled={!repoInfo || fetchingHackerFile}
          onClick={() => {
            addProjectToAccount(repoInfo);
          }}
        >
          Add Repo
        </Button>
      </Stack>
    </Flex>
  );
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthLayer>
      <SettingsPage>{mounted ? <AddGitHubIntegrationPage /> : <Loader />}</SettingsPage>
    </AuthLayer>
  );
};

export default IntegrationsPage;
