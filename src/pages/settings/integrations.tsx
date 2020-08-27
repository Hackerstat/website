import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, SimpleGrid, Box, Grid } from '@chakra-ui/core';
import SettingsPage from '../../Components/SettingsPage';
import Loader from '../../Components/Loader';
import IntegrationTile from '../../Components/IntegrationTile';

import { faGitlab } from '@fortawesome/free-brands-svg-icons';

const Integrations: FunctionComponent = () => {
  return (
    <Flex flexDirection={'column'} width={'100%'} ml={3} justifySelf={'flex-start'}>
      <Grid gap={2} gridTemplateColumns={'repeat(auto-fit, 80px)'}>
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />
        <IntegrationTile icon={faGitlab} name={'GitLab'} />

        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
        <Box bg="tomato" height="80px" width={'80px'}></Box>
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
