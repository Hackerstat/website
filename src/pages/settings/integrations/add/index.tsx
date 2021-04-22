import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, Grid } from '@chakra-ui/core';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';

import {
  faGitlab,
  faGithub,
  faNpm,
  faTwitter,
  faStackOverflow,
  faDocker,
  faHackerrank,
  faHackerNews,
  faProductHunt,
  faDribbble,
  faMedium,
  faBehance,
} from '@fortawesome/free-brands-svg-icons';
import AuthLayer from '../../../../Components/AuthLayer';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import IntegrationTile from '../../../../Components/IntegrationTile';

interface Integration {
  icon?: IconProp;
  name: string;
  link?: string;
  disabled?: boolean;
}

interface IntegrationsProps {
  integrations: Array<Integration>;
}

const Integrations: FunctionComponent<IntegrationsProps> = ({ integrations }) => {
  return (
    <Flex flexDirection={'column'} width={'100%'} ml={3} justifySelf={'flex-start'}>
      <Grid gap={2} gridTemplateColumns={'repeat(auto-fit, 100px)'}>
        {integrations.map((integration) => {
          return <IntegrationTile key={integration.name} {...integration} />;
        })}
      </Grid>
    </Flex>
  );
};

const integrations: Array<Integration> = [
  {
    name: 'GitLab',
    icon: faGitlab,
    link: 'GitLab',
  },
  {
    name: 'GitHub',
    icon: faGithub,
    link: 'GitHub',
  },
  {
    name: 'NPM',
    icon: faNpm,
    link: 'NPM',
  },
  {
    name: 'WakaTime',
  },
  {
    name: 'Twitter',
    icon: faTwitter,
    link: 'Twitter',
  },
  {
    name: 'Stack OverFlow',
    icon: faStackOverflow,
    disabled: true,
  },
  {
    name: 'DockerHub',
    icon: faDocker,
    disabled: true,
  },
  {
    name: 'HackerRank',
    icon: faHackerrank,
    disabled: true,
  },
  {
    name: 'HackerNews',
    icon: faHackerNews,
    disabled: true,
  },
  {
    name: 'Product Hunt',
    icon: faProductHunt,
    disabled: true,
  },
  {
    name: 'Dribble',
    icon: faDribbble,
    disabled: true,
  },
  {
    name: 'Medium',
    icon: faMedium,
    link: 'Medium',
  },
  {
    name: 'Behance',
    icon: faBehance,
    disabled: true,
  },
];

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthLayer>
      <SettingsPage>{mounted ? <Integrations integrations={integrations} /> : <Loader />}</SettingsPage>
    </AuthLayer>
  );
};

export default IntegrationsPage;
