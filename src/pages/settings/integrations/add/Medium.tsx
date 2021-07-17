import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import {
  Input,
  FormLabel,
  FormControl,
  Heading,
  Button,
  Stack,
  FormErrorMessage,
  useToast,
  Box,
  UseToastOptions,
} from '@chakra-ui/react';
import SettingsPage from '../../../../Components/SettingsPage';
import MediumArticle from '../../../../Components/MediumArticle';
import Loader from '../../../../Components/Loader';
import {
  goodToast,
  badToast,
  verifiedToast,
  notVerifiedToast,
  ADD_INTEGRATION_URL,
  IntegrationTypes,
} from '../../../../utils';
import AuthLayer from '../../../../Components/AuthLayer';
import Axios from 'axios';
import SettingsIntegrationContainer from '../../../../Components/SettingsIntegrationContainer';

interface MediumPostType {
  title: string;
  date: string;
  link: string;
}

/**
 * @name AddMediumIntegrationPage
 * @description It is the component that allows HackerStat users to add their Medium username, display those Medium profile's posts, and add the Medium integration to the HackerStat user's profile.
 * @author @LouisIV @Cgunter
 * @returns {FunctionComponent}
 */
const AddMediumIntegrationPage: FunctionComponent = () => {
  useEffect(() => {
    Axios.get('/api/medium/getUsername')
      .then((res) => setUsername(res.data?.username))
      .catch((e) => console.error(e));
  }, []);

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [mediumPosts, setMediumPosts] = useState<Array<MediumPostType>>();

  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const toast = useToast();

  /**
   * @name CheckForHackerStatFile
   * @description It is the function that retrieves the Medium articles from the API to display.
   * @param {string} username It is the Medium username to retrieve Medium articles for.
   * @returns
   */
  const CheckForHackerStatFile = async (username: string) => {
    setFetchingHackerFile(true);
    try {
      if (!username) {
        setFetchError('Required');
        setFetchingHackerFile(false);
        return;
      }
      const mediumArticles = await Axios.get('/api/medium/fetchArticles', {
        params: { user: username },
      });

      setMediumPosts(mediumArticles?.data?.articles.slice());
    } catch (err) {
      console.log(err);
    }
    setFetchingHackerFile(false);
  };

  /**
   * @name verifyMediumAccount
   * @description It is the function that verfies if the Medium Account username is exists to the HackerStat user.
   * @param {string} username It is the Medium Account username being verified.
   * @returns {Promise<boolean>}
   */
  const verifyMediumAccount = async (username: string): Promise<void> => {
    setIsVerifying(true);
    try {
      if (!username) {
        setFetchError('Required');
        setIsVerifying(false);
      }
      const res = await Axios.get('/api/medium/validateMediumAccount', { params: { username } });
      if (res.data?.validated) {
        toast(verifiedToast as UseToastOptions);
      } else {
        toast(notVerifiedToast as UseToastOptions);
      }
    } catch (err) {
      console.error(err);
    }
    setIsVerifying(false);
  };

  /**
   * @name addMediumAccount
   * @description It is the function that adds the Medium username to the user's HackerStat Profile.
   * @param {string} username It is the Medium username to add to the user's HackerStat Profile.
   * @returns
   */
  const addMediumAccount = async (username: string) => {
    setSubmitLoading(true);
    try {
      await Axios.post(ADD_INTEGRATION_URL, {
        integrationType: IntegrationTypes.MEDIUM,
        settings: { username: username },
      });
      toast(goodToast as UseToastOptions);
    } catch (err) {
      toast(badToast as UseToastOptions);
    }
    setSubmitLoading(false);
  };

  return (
    <SettingsIntegrationContainer integration={IntegrationTypes.MEDIUM}>
      <Stack spacing={3}>
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>Medium Username</FormLabel>
          <Input value={username} placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Heading fontSize={'lg'} as="h2">
          Verification Instructions:
        </Heading>
        <Heading fontSize={'sm'} as="h2">
          In order to have your Medium Account verified. Put https://hackerstat.io/your-hackerstat-username in your
          Medium account&rsquo;s bio.
        </Heading>
        <Button isLoading={isVerifying} disabled={!username} onClick={() => verifyMediumAccount(username)}>
          Verify Medium Account
        </Button>
        <Button isLoading={fetchingHackerFile} onClick={() => CheckForHackerStatFile(username)}>
          Get Posts
        </Button>
        {mediumPosts
          ? mediumPosts.map((post) => (
              <Box key={post.title}>
                <MediumArticle {...post} />
              </Box>
            ))
          : ''}
        <Button
          isLoading={submitLoading}
          isDisabled={fetchingHackerFile}
          onClick={() => {
            addMediumAccount(username);
          }}
        >
          Add Medium
        </Button>
      </Stack>
    </SettingsIntegrationContainer>
  );
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <AuthLayer>
        <SettingsPage>{mounted ? <AddMediumIntegrationPage /> : <Loader />}</SettingsPage>
      </AuthLayer>
    </>
  );
};

export default IntegrationsPage;
