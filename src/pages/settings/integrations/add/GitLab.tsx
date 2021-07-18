import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Button, Stack, Text } from '@chakra-ui/react';
import randomstring from 'randomstring';
import crypto from 'crypto';
import { useRouter } from 'next/router';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import AuthLayer from '../../../../Components/AuthLayer';
import { IntegrationTypes } from '../../../../types';
import SettingsIntegrationContainer from '../../../../Components/SettingsIntegrationContainer';

interface GitLabServerSideProps {
  state: string;
  sha256OfState: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  code_verifier: string;
}

/**
 * @REDO
 */
const AddGitHubIntegrationPage: FunctionComponent<{ props: GitLabServerSideProps }> = ({
  props: { state, code_verifier, sha256OfState, client_id, redirect_uri, scope },
}: {
  props: GitLabServerSideProps;
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const VERIFICATION_LINK = `https://gitlab.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state}&scope=${scope}`;
  useEffect(() => {
    console.log(sha256OfState, code_verifier);
    localStorage.setItem('code_verifier', code_verifier);
  }, []);

  return (
    <SettingsIntegrationContainer integration={IntegrationTypes.GITLAB}>
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
    </SettingsIntegrationContainer>
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
  const state = randomstring.generate();
  const code = `${randomstring.generate(65)}-_.~`;
  const props = {
    state: state,
    code_verifier: code,
    sha256OfState: crypto.createHash('sha256').update(code).digest('base64'),
    client_id: 'bd68a5365d5be0784ff0f75d26b8e3a9c8213df18a78a68df4c95c41797d7289',
    redirect_uri: 'http://localhost:3000/settings/integrations/add/oauth2/GitLab',
    scope: 'read_user+profile+read_repository+read_api',
  };
  return { props: props };
}

export default IntegrationsPage;
