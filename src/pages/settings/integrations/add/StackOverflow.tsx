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
  UseToastOptions,
} from '@chakra-ui/react';
import { goodToast, badToast, verifiedToast, notVerifiedToast } from '../../../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import Axios from 'axios';

/**
 * @name AddStackOverflowIntegrationPage
 * @description It is the component that displays a user's StackOverFlow integration (i.e. medals, tags) and adds a user's StackOverflow integration to their HackerStat Profile.
 * @author @Cgunter
 * @returns {FunctionComponent}
 */
const AddStackOverflowIntegrationPage: FunctionComponent = () => {
  useEffect(() => {
    Axios.get('/api/stackoverflow/getUsername')
      .then((res) => setUsername(res.data?.username))
      .catch((e) => console.error(e));
  }, []);

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [addIntegrationLoading, setAddIntegrationLoading] = useState(false);
  const [stackOverflowInfo, setStackOverflowInfo] = useState({});
  const toast = useToast();

  /**
   * @name retrieveStackOverflowInfo
   * @description It is the function that retrieves the StackOverFlow info from the HackerStat user's StackOverFlow username.
   * @author @Cgunter1
   * @returns {void}
   */
  const retrieveStackOverflowInfo = async () => {
    setLoading(true);
    const URL = '/api/stackoverflow/checkStackOverflowUsername';
    const res = await Axios.get(URL, { params: { username: username } });
    setLoading(false);
    setStackOverflowInfo(res.data);
  };

  /**
   * @name verifyStackOverflowAccount
   * @description It is the function that verifies a StackOverflow Account is the current HackerStat user's account.
   * @author @Cgunter1
   * @returns {void}
   */
  const verifyStackOverflowAccount = async () => {
    setVerifyLoading(true);
    try {
      const URL = '/api/stackoverflow/validateStackOverflowAccount';
      const res = await Axios.get(URL, { params: { username: username } });
      if (res.data?.validated) {
        toast(verifiedToast as UseToastOptions);
      } else {
        toast(notVerifiedToast as UseToastOptions);
      }
    } catch (err) {
      toast(notVerifiedToast as UseToastOptions);
    }
    setVerifyLoading(false);
  };

  /**
   * @name addStackOverflowToAccount
   * @description It is the function that adds the StackOverflow username to the user's HackerStat Profile.
   * @author @Cgunter1
   * @param {string} username It is the HackerStat user's given StackOverFlow username.
   * @returns {void}
   */
  const addStackOverflowToAccount = async (username: string) => {
    setAddIntegrationLoading(true);
    try {
      await Axios.post('/api/integration', {
        integrationType: 'stackoverflow',
        settings: { username: username },
      });
      toast(goodToast as unknown);
    } catch (e) {
      toast(badToast as unknown);
    }
    setAddIntegrationLoading(false);
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
        <Heading fontSize={'lg'} as="h2">
          Verification Instructions:
        </Heading>
        <Heading fontSize={'sm'} as="h2">
          In order to have your StackOverflow Account verified. Put https://hackerstat.io/your-hackerstat-username in
          your StackOveflow account&rsquo;s bio.
        </Heading>
        <Button isLoading={verifyLoading} onClick={async () => await verifyStackOverflowAccount()}>
          Verify StackOverflow Account
        </Button>
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
          maxWidth={'100%'}
          overflowX={'scroll'}
          whiteSpace={'pre'}
        >
          {JSON.stringify(stackOverflowInfo || {}, null, '\t')
            .split('\t')
            .join('  ')}
        </Text>
        <Button
          isLoading={addIntegrationLoading}
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
