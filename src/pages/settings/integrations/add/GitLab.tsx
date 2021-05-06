import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, Heading, Button, Stack, Text } from '@chakra-ui/core';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import randomstring from 'randomstring';
import crypto from 'crypto';
import { useRouter } from 'next/router';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import { GitLabServerSideProps } from '../../../../utils/utils';

const AddGitHubIntegrationPage: FunctionComponent<{ props: GitLabServerSideProps }> = ({
  props: { state, code_verifier, sha256OfState, client_id, redirect_uri, scope },
}: {
  props: GitLabServerSideProps;
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const VERIFICATION_LINK = `https://gitlab.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state}&scope=${scope}&code_challenge=${sha256OfState}&code_challenge_method=S256`;
  // const VERIFICATION_LINK = `https://gitlab.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state}&scope=${scope}`;
  useEffect(() => {
    console.log(sha256OfState, code_verifier);
    localStorage.setItem('code_verifier', code_verifier);
    console.log('LOADED!');
  }, []);

  return (
    <AuthLayer>
      <Flex ml={4} width={'100%'} flexDirection={'column'}>
        <Flex mb={4}>
          <FontAwesomeIcon icon={faGitlab} size={'3x'} />
          <Heading ml={3}>GitLab</Heading>
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
              router.push(VERIFICATION_LINK);
            }}
          >
            Verify Account
          </Button>
        </Stack>
      </Flex>
    </AuthLayer>
  );
};

const IntegrationsPage: NextPage<GitLabServerSideProps> = (props: GitLabServerSideProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthLayer>
      <SettingsPage>{mounted ? <AddGitHubIntegrationPage props={props} /> : <Loader />}</SettingsPage>
    </AuthLayer>
  );
};

export function getServerSideProps(): { props: GitLabServerSideProps } {
  // TODO:
  // Add CSRF Properties to state so API can identify user.
  const state = ':)';
  const code = `${randomstring.generate(65)}-_.~`;
  const props = {
    state: state,
    code_verifier: code,
    sha256OfState: crypto.createHash('sha256').update(code).digest('base64'),
    client_id: 'a79cf3786413327d873e83d47d7308b9b618fa6e8393ce3c1967b18281a0f377',
    redirect_uri: 'http://localhost:3000/settings/integrations/add/oauth2/GitLab',
    scope: 'read_user+profile+read_repository+read_api',
  };
  return { props: props };
}

export default IntegrationsPage;
