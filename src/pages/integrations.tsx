import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, Grid, Heading } from '@chakra-ui/react';
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
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import IntegrationTile from '../Components/IntegrationTile';
import Loader from '../Components/Loader';

interface Integration {
  icon?: IconProp;
  name: string;
  link?: string;
  disabled?: boolean;
}

interface IntegrationsProps {
  integrations: Array<Integration>;
}

/**
 * @name integrations
 * @description It is a component that shows all the HackerStat integrations available or TBA. These are represented as small tiles that users can click on to add the integration.
 * @author @Cgunter1
 * @param {Array<Integration>} Integrations
 * @returns {FunctionComponent<IntegrationsProps>}
 */
const Integrations: FunctionComponent<IntegrationsProps> = ({ integrations }) => {
  return (
    <Flex
      flexDirection={'column'}
      width={'95%'}
      ml={2}
      justifySelf={'flex-start'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Heading fontSize={'3xl'} mt={16}>
        Show Off More Than Your GitHub
      </Heading>
      <Grid gap={2} mt={16} gridTemplateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} maxW={'lg'}>
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
    link: 'WakaTime',
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

  return <>{mounted ? <Integrations integrations={integrations} /> : <Loader />}</>;
};

export default IntegrationsPage;
