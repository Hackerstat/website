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
  Text,
} from '@chakra-ui/core';
import SettingsPage from '../../../../Components/SettingsPage';
import MediumArticle from '../../../../Components/MediumArticle';
import Loader from '../../../../Components/Loader';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';

interface MediumPostType {
  title: string;
  date: string;
  link: string;
}

const AddMediumIntegrationPage: FunctionComponent = () => {
  useEffect(() => {
    Axios.get('/api/Medium/getUsername').then((res) => setUsername(res.data?.username));
  });

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [mediumPosts, setMediumPosts] = useState<Array<MediumPostType>>();

  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);

  const toast = useToast();

  // TODO: Retrieve Medium Posts.
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

  const addMediumAccount = async (username) => {
    try {
      await Axios.post('/api/integration', {
        integrationType: 'medium',
        settings: { username: username },
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
      <SettingsPage>{mounted ? <AddMediumIntegrationPage /> : <Loader />}</SettingsPage>
    </>
  );
};

export default IntegrationsPage;
