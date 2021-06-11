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
  Grid,
  useToast,
} from '@chakra-ui/react';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import { faNpm } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import NPMPackage from '../../../../Components/NPMPackage';
import AuthLayer from '../../../../Components/AuthLayer';
import { goodToast, badToast } from '../../../../utils/constants';

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
    Axios.get('/api/npm/getUserName')
      .then((val) => setUsername(val.data?.username))
      .catch((e) => console.error(e));
  }, []);

  const [username, setUsername] = useState<string>('');
  const [fetchError, setFetchError] = useState<string>();
  const [packages, setPackages] = useState<Array<Package>>();

  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);
  const toast = useToast();

  /**
   * @name GetNPMPackages
   * @description It is the function that retrieves the NPM packages and their daily downloads from a user's NPM username.
   * @param {string} username It is the HackerStat user's NPM username used retrieve the NPM info.
   * @returns {void}
   */
  const GetNPMPackages = async (username: string) => {
    try {
      if (!username) {
        setFetchError('Required');
        return;
      }

      const result = await Axios.get(`/api/npm/remote`, {
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
  };

  /**
   * @name addNPMToAccount
   * @description It is the function adds the NPM username to the user's HackerStat Profile.
   * @param {string} username It is the HackerStat user's NPM username used retrieve the NPM info.
   * @returns {void}
   */
  const addNPMToAccount = async (username) => {
    try {
      await Axios.post('/api/integration', {
        integrationType: 'npm',
        settings: { username: username },
      });
      toast(goodToast as unknown);
    } catch (err) {
      toast(badToast as unknown);
    }
  };

  return (
    <Flex width={'100%'} flexDirection={'column'}>
      <Flex mb={4}>
        <FontAwesomeIcon icon={faNpm} size={'3x'} />
        <Heading ml={3}>NPM</Heading>
      </Flex>
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
        <Button
          isLoading={fetchingHackerFile}
          onClick={() => {
            setFetchingHackerFile(true);
            try {
              GetNPMPackages(username);
            } catch (err) {
              console.log(err);
            } finally {
              setFetchingHackerFile(false);
            }
          }}
        >
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
          onClick={() => {
            addNPMToAccount(username);
          }}
        >
          Add NPM
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
      <SettingsPage>{mounted ? <AddNPMIntegrationPage /> : <Loader />}</SettingsPage>
    </AuthLayer>
  );
};

export default IntegrationsPage;
