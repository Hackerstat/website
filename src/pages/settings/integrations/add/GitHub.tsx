import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, Heading, Button, Stack, Text } from '@chakra-ui/react';
import SettingsPage from '../../../../Components/SettingsPage';
import { GITHUB_VERIFICATION_LINK } from '../../../../utils/constants';
import Loader from '../../../../Components/Loader';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayer from '../../../../Components/AuthLayer';
import Axios from 'axios';
import { useRouter } from 'next/router';

/**
 * @name AddGithubIntegrationPage
 * @description It is the component that is the landing page that shows GitHub Repos display on the HackerStat user's profile. The component also allows users to add GitHub integration through OAuth2.
 * @author @Cgunter1
 * @returns {FunctionComponent}
 */
const AddGithubIntegrationPage: FunctionComponent = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const router = useRouter();

  useEffect(() => {
    Axios.get('/api/github/fetchRepos')
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <AuthLayer>
      <Flex ml={4} width={'100%'} flexDirection={'column'}>
        <Flex mb={4}>
          <FontAwesomeIcon icon={faGithub} size={'3x'} />
          <Heading ml={3}>GitHub</Heading>
        </Flex>
        <Stack spacing={10}>
          <Text>
            {
              'In order to add the GitHub integration to your file you need to verify your account via Logging into your GitHub Account. Then you can select which GitHub Repos you want to show then save it to your account.'
            }
          </Text>
          <Button
            isLoading={isVerifying}
            loadingText="Verifying Account"
            onClick={() => {
              setIsVerifying(true);
              router.push(GITHUB_VERIFICATION_LINK);
            }}
          >
            Verify Account
          </Button>
        </Stack>
      </Flex>
    </AuthLayer>
  );
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <SettingsPage>{mounted ? <AddGithubIntegrationPage /> : <Loader />}</SettingsPage>;
};

export default IntegrationsPage;
