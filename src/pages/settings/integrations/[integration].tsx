import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, Grid } from '@chakra-ui/core';
import SettingsPage from '../../../Components/SettingsPage';
import Loader from '../../../Components/Loader';

import { faGitlab, faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import IntegrationTile from '../../../Components/IntegrationTile';

const Integrations: FunctionComponent = () => {
  return (
    <Flex flexDirection={'column'} width={'100%'} ml={3} justifySelf={'flex-start'}>
      <Grid gap={2} gridTemplateColumns={'repeat(auto-fit, 100px)'}>
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGithub} name={'GitHub'} />
        <IntegrationTile icon={faNpm} name={'NPM'} />
        <IntegrationTile name={'WakaTime'} />
      </Grid>
    </Flex>
  );
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <SettingsPage>{mounted ? <Integrations /> : <Loader />}</SettingsPage>;
};

export default IntegrationsPage;
