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
import { goodToast, badToast } from '../../../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import Axios from 'axios';

const AddStackOverflowIntegrationPage: FunctionComponent = () => {
  useEffect(() => {
    Axios.get('/api/stackoverflow/getUsername')
      .then((res) => setUsername(res.data?.username))
      .catch((e) => console.error(e));
  }, []);

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [stackOverflowInfo, setStackOverflowInfo] = useState({});
  const toast = useToast();

  const retrieveStackOverflowInfo = async () => {
    setLoading(true);
    const URL = '/api/stackoverflow/checkStackOverflowUsername';
    const res = await Axios.get(URL, { params: { username: username } });
    setLoading(false);
    setStackOverflowInfo(res.data);
  };

  const addStackOverflowToAccount = async (username: string) => {
    try {
      await Axios.post('/api/integration', {
        integrationType: 'stackoverflow',
        settings: { username: username },
      });
      toast(goodToast as unknown);
    } catch (e) {
      toast(badToast as unknown);
    }
  };

  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <Flex mb={4}>
        <FontAwesomeIcon icon={faStackOverflow} size={'3x'} />
        <Heading ml={3}>StackOverflow</Heading>
      </Flex>
      <Stack spacing={3}>
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>StackOverflow UserID</FormLabel>
          <Input value={username} placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button isLoading={loading} onClick={async () => await retrieveStackOverflowInfo()}>
          Get StackOverflow Info
        </Button>
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
          {JSON.stringify(stackOverflowInfo || {}, null, '\t')
            .split('\t')
            .join('  ')}
        </Text>
        <Button
          isDisabled={!username}
          onClick={() => {
            addStackOverflowToAccount(username);
          }}
        >
          Add StackOverflow
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
        <SettingsPage>{mounted ? <AddStackOverflowIntegrationPage /> : <Loader />}</SettingsPage>
      </AuthLayer>
    </>
  );
};

export default IntegrationsPage;
