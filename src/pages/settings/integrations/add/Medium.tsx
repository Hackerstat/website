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
  FormErrorMessage,
  useToast,
  Box,
  UseToastOptions,
} from '@chakra-ui/react';
import SettingsPage from '../../../../Components/SettingsPage';
import MediumArticle from '../../../../Components/MediumArticle';
import Loader from '../../../../Components/Loader';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { goodToast, badToast, verifiedToast, notVerifiedToast } from '../../../../utils/constants';
import AuthLayer from '../../../../Components/AuthLayer';
import Axios from 'axios';

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
    Axios.get('/api/Medium/getUsername')
      .then((res) => setUsername(res.data?.username))
      .catch((e) => console.error(e));
  }, []);

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [mediumPosts, setMediumPosts] = useState<Array<MediumPostType>>();

  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const toast = useToast();

  /**
   * @name CheckForHackerStatFile
   * @description It is the function that retrieves the Medium articles from the API to display.
   * @param {string} username It is the Medium username to retrieve Medium articles for.
   * @returns
   */
  const CheckForHackerStatFile = async (username: string) => {
    try {
      if (!username) {
        setFetchError('Required');
        return;
      }
      const mediumArticles = await Axios.get('/api/Medium/fetchArticles', {
        params: { user: username },
      });

      setMediumPosts(mediumArticles?.data?.articles.slice());
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @name verifyMediumAccount
   * @description It is the function that verfies if the Medium Account username is exists to the HackerStat user.
   * @param {string} username It is the Medium Account username being verified.
   * @returns {Promise<boolean>}
   */
  const verifyMediumAccount = async (username: string): Promise<boolean> => {
    try {
      if (!username) {
        setFetchError('Required');
        return false;
      }
      const res = await Axios.get('/api/Medium/validateMediumAccount', { params: { username } });
      if (res.data?.validated) {
        toast(verifiedToast as UseToastOptions);
      } else {
        toast(notVerifiedToast as UseToastOptions);
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  /**
   * @name addMediumAccount
   * @description It is the function that adds the Medium username to the user's HackerStat Profile.
   * @param {string} username It is the Medium username to add to the user's HackerStat Profile.
   * @returns
   */
  const addMediumAccount = async (username: string) => {
    try {
      await Axios.post('/api/integration', {
        integrationType: 'medium',
        settings: { username: username },
      });
      toast(goodToast as UseToastOptions);
    } catch (err) {
      toast(badToast as UseToastOptions);
    }
  };

  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <Flex mb={4}>
        <FontAwesomeIcon icon={faMedium} size={'3x'} />
        <Heading ml={3}>Medium</Heading>
      </Flex>
      <Stack spacing={3}>
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>Medium Username</FormLabel>
          <Input value={username} placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isVerifying}
          disabled={!username}
          onClick={() => {
            setIsVerifying(true);
            try {
              verifyMediumAccount(username);
            } catch (err) {
              console.log(err);
            } finally {
              setIsVerifying(false);
            }
          }}
        >
          Verify Medium Account
        </Button>
        <Button
          isLoading={fetchingHackerFile}
          onClick={() => {
            setFetchingHackerFile(true);
            try {
              CheckForHackerStatFile(username);
            } catch (err) {
              console.log(err);
            } finally {
              setFetchingHackerFile(false);
            }
          }}
        >
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
          isDisabled={fetchingHackerFile}
          onClick={() => {
            addMediumAccount(username);
          }}
        >
          Add Medium
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
    <>
      <AuthLayer>
        <SettingsPage>{mounted ? <AddMediumIntegrationPage /> : <Loader />}</SettingsPage>
      </AuthLayer>
    </>
  );
};

export default IntegrationsPage;
