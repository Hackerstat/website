import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import {
  Input,
  FormLabel,
  FormControl,
  Heading,
  Button,
  Stack,
  Text,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import Axios from 'axios';
import { IntegrationTypes } from '../../../../types';
import { goodToast, badToast, verifiedToast, notVerifiedToast, ADD_INTEGRATION_URL } from '../../../../utils';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import SettingsIntegrationContainer from '../../../../Components/SettingsIntegrationContainer';

/**
 * @name AddStackOverflowIntegrationPage
 * @description It is the component that displays a user's StackOverFlow integration (i.e. medals, tags) and adds a user's StackOverflow integration to their HackerStat Profile.
 * @author @Cgunter
 * @returns {FunctionComponent}
 */
const AddStackOverflowIntegrationPage: FunctionComponent = () => {
  useEffect(() => {
    const STACKOVERFLOW_GET_USERNAME = '/api/stackoverflow/getUsername';

    Axios.get(STACKOVERFLOW_GET_USERNAME)
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
    const STACKOVERFLOW_CHECK_USERNAME = '/api/stackoverflow/checkStackOverflowUsername';

    setLoading(true);
    const res = await Axios.get(STACKOVERFLOW_CHECK_USERNAME, { params: { username: username } });
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
    const STACKOVERFLOW_VALIDATE_ACCOUNT = '/api/stackoverflow/validateStackOverflowAccount';

    setVerifyLoading(true);
    try {
      const res = await Axios.get(STACKOVERFLOW_VALIDATE_ACCOUNT, { params: { username: username } });
      if (res.data?.validated) {
        toast(verifiedToast);
      } else {
        toast(notVerifiedToast);
      }
    } catch (err) {
      toast(notVerifiedToast);
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
      await Axios.post(ADD_INTEGRATION_URL, {
        integrationType: IntegrationTypes.STACKOVERFLOW,
        settings: { username: username },
      });
      toast(goodToast);
    } catch (e) {
      toast(badToast);
    }
    setAddIntegrationLoading(false);
  };

  return (
    <SettingsIntegrationContainer integration={IntegrationTypes.STACKOVERFLOW}>
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
        <SettingsPage>{mounted ? <AddStackOverflowIntegrationPage /> : <Loader />}</SettingsPage>
      </AuthLayer>
    </>
  );
};

export default IntegrationsPage;
