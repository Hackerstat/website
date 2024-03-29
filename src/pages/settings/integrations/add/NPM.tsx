import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Input, FormLabel, FormControl, Button, Stack, Text, FormErrorMessage, Grid, useToast } from '@chakra-ui/react';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import Axios from 'axios';
import NPMPackage from '../../../../Components/NPMPackage';
import AuthLayer from '../../../../Components/AuthLayer';
import { IntegrationTypes } from '../../../../types';
import { goodToast, badToast, verifiedToast, notVerifiedToast, ADD_INTEGRATION_URL } from '../../../../utils';
import SettingsIntegrationContainer from '../../../../Components/SettingsIntegrationContainer';

export interface Package {
  name: string;
  date: Date;
  description?: string;
  keywords: Array<string>;
  lastMonthDownloads: {
    start: Date;
    end: Date;
    package: string;
    downloads: Array<{
      day: Date;
      downloads: number;
    }>;
  };
  links: {
    bugs: string;
    homepage: string;
    npm: string;
    repository: string;
  };
  maintainers: Array<{
    username: string;
    email: string;
  }>;
  publisher: {
    username: string;
    email: string;
  };
  scope: string;
  version: string;
}

/**
 * @name AddNPMIntegrationPage
 * @description It is the component that displays a user's NPM integration and adds a user's NPM integration.
 * @author @LouisIV @Cgunter
 * @returns {FunctionComponent}
 */
const AddNPMIntegrationPage: FunctionComponent = () => {
  useEffect(() => {
    const NPM_GET_USERNAME = '/api/npm/getUserName';

    Axios.get(NPM_GET_USERNAME)
      .then((val) => setUsername(val.data?.username))
      .catch((e) => console.error(e));
  }, []);

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [packages, setPackages] = useState<Array<Package>>();
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const toast = useToast();

  /**
   * @name GetNPMPackages
   * @description It is the function that retrieves the NPM packages and their daily downloads from a user's NPM username.
   * @param {string} username It is the HackerStat user's NPM username used retrieve the NPM info.
   * @returns {void}
   */
  const GetNPMPackages = async (username: string) => {
    const NPM_REMOTE = '/api/npm/remote';

    setFetchingHackerFile(true);
    try {
      if (!username) {
        setFetchError('Required');
        setFetchingHackerFile(false);
        return;
      }

      const result = await Axios.get(NPM_REMOTE, {
        params: {
          username: username,
        },
      });

      if (result?.data?.error) {
        setFetchError(result?.data?.error);
        throw new Error(result?.data?.error);
      }

      setFetchError(null);

      if (result?.data?.length === 0) {
        setPackages([]);
      } else {
        console.log(result);

        setPackages(result?.data);
      }
    } catch (err) {
      console.log(err);
    }
    setFetchingHackerFile(false);
  };

  /**
   * @name verifyNPMAccount
   * @description It is the function that verifies a NPM Account is the current HackerStat user's account.
   * @author @Cgunter1
   * @returns {void}
   */
  const verifyNPMAccount = async () => {
    const NPM_VALIDATE_ACCOUNT = '/api/npm/validateNPMAccount';

    setVerifyLoading(true);
    try {
      const res = await Axios.get(NPM_VALIDATE_ACCOUNT, { params: { username } });
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
   * @name addNPMToAccount
   * @description It is the function adds the NPM username to the user's HackerStat Profile.
   * @param {string} username It is the HackerStat user's NPM username used retrieve the NPM info.
   * @returns {void}
   */
  const addNPMToAccount = async (username) => {
    setSubmitLoading(true);
    try {
      await Axios.post(ADD_INTEGRATION_URL, {
        integrationType: IntegrationTypes.NPM,
        settings: { username },
      });
      toast(goodToast);
    } catch (err) {
      toast(badToast);
    }
    setSubmitLoading(false);
  };

  return (
    <SettingsIntegrationContainer integration={IntegrationTypes.NPM}>
      <Stack spacing={3}>
        <Text>
          {
            "You'll need to create a .hacker.yml in the root of your repo with the information you'd like to display about this project"
          }
        </Text>
        <FormControl isInvalid={!!fetchError}>
          <FormLabel>NPM Username</FormLabel>
          <Input value={username} placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} />
          <FormErrorMessage>{fetchError}</FormErrorMessage>
        </FormControl>
        <Button isLoading={verifyLoading} onClick={async () => await verifyNPMAccount()}>
          Verify StackOverflow Account
        </Button>
        <Button isLoading={fetchingHackerFile} onClick={() => GetNPMPackages(username)}>
          Check Repo
        </Button>
        <Grid gap={2} gridTemplateColumns={'repeat(auto-fit, 400px)'}>
          {!!packages &&
            packages.map((packageInfo) => {
              return <NPMPackage key={packageInfo.name} packageInfo={packageInfo} />;
            })}
        </Grid>
        <Button
          isDisabled={fetchingHackerFile || !username}
          isLoading={submitLoading}
          onClick={() => {
            addNPMToAccount(username);
          }}
        >
          Add NPM
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
    <AuthLayer>
      <SettingsPage>{mounted ? <AddNPMIntegrationPage /> : <Loader />}</SettingsPage>
    </AuthLayer>
  );
};

export default IntegrationsPage;
