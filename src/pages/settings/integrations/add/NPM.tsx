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
  Box,
  Grid,
} from '@chakra-ui/core';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import { faNpm } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { HackerFile } from '../../../../types/hackerfile';
import ExternalLink from '../../../../Components/ExternalLink';

import { Chart } from 'react-charts';
import NPMPackage from '../../../../Components/NPMPackage';

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

const AddNPMIntegrationPage: FunctionComponent = () => {
  const [username, setUsername] = useState<string>();
  const [fetchError, setFetchError] = useState<string>();
  const [packages, setPackages] = useState<Array<Package>>();

  const [fetchingHackerFile, setFetchingHackerFile] = useState(false);

  const CheckForHackerStatFile = async (username) => {
    try {
      if (!username) {
        setFetchError('Required');
        return;
      }

      const result = await Axios.get(`/api/npm/remote/louisiv/${username}`, {});

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
          <Input placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} />
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
          Check Repo
        </Button>
        <Grid gap={2} gridTemplateColumns={'repeat(auto-fit, 400px)'}>
          {!!packages &&
            packages.map((packageInfo) => {
              return <NPMPackage key={packageInfo.name} packageInfo={packageInfo} />;
            })}
        </Grid>
        <Button isDisabled={fetchingHackerFile}>Add NPM</Button>
      </Stack>
    </Flex>
  );
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <SettingsPage>{mounted ? <AddNPMIntegrationPage /> : <Loader />}</SettingsPage>;
};

export default IntegrationsPage;
