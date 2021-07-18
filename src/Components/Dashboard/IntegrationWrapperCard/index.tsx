import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  faStackOverflow,
  faNpm,
  faTwitter,
  faGithub,
  faGitlab,
  faMedium,
  faDribbble,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExternalLink from '../../ExternalLink';
import { BoxProps, Flex, useColorMode, Box } from '@chakra-ui/react';
import Card from '../../Card';
import { IntegrationTypes } from '../../../types';
import { VerifiedButton } from '../../VerifiedButton';

const Integrations = {
  stackoverflow: { icon: faStackOverflow, name: IntegrationTypes.STACKOVERFLOW },
  npm: { icon: faNpm, name: IntegrationTypes.NPM },
  twitter: { icon: faTwitter, name: IntegrationTypes.TWITTER },
  github: { icon: faGithub, name: IntegrationTypes.GITHUB },
  gitlab: { icon: faGitlab, name: IntegrationTypes.GITLAB },
  medium: { icon: faMedium, name: IntegrationTypes.MEDIUM },
  wakatime: { icon: undefined, name: IntegrationTypes.WAKATIME },
  dribbble: { icon: faDribbble, name: IntegrationTypes.DRIBBBLE },
};

interface IntegrationWrapperCardProps extends BoxProps {
  children: Array<JSX.Element> | JSX.Element;
  // icon: string;
  icon: IntegrationTypes;
  username?: string;
  link?: string;
  verified?: boolean;
}

const colors = { light: 'gray.800', dark: 'white' };

const IntegrationWrapperCard: FunctionComponent<IntegrationWrapperCardProps> = ({
  children,
  username,
  icon,
  link,
  verified,
  ...rest
}) => {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState(colors[colorMode]);

  useEffect(() => setColor(colors[colorMode]), [colorMode]);

  return (
    <Card borderRadius={'lg'} padding={2} maxW={['xs', 'sm', 'md']} mt={3} color={color} {...rest}>
      <Flex alignItems={'center'} opacity={0.8}>
        {Integrations[icon].icon && (
          <FontAwesomeIcon icon={Integrations[icon].icon} size={'1x'} color={color !== 'gray.800' ? color : 'black'} />
        )}
        <ExternalLink color={color} ml={2} href={link || undefined} fontWeight={'bold'}>
          {username || Integrations[icon].name}
        </ExternalLink>
        {verified && <VerifiedButton />}
      </Flex>
      <Box>{children}</Box>
    </Card>
  );
};

export default IntegrationWrapperCard;
