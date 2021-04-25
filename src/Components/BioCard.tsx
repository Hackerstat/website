import React, { FunctionComponent, useState, useEffect } from 'react';
import FocusCard from './FocusCard';
import { Text, useColorMode, Icon, Flex } from '@chakra-ui/core';
import ExternalLink from './ExternalLink';

interface BioCardProps {
  bio: string;
  website: string;
  email: string;
  school: string;
  location: string;
}

const colors = { light: 'gray.800', dark: 'white' };

const BioCard: FunctionComponent<Partial<BioCardProps>> = ({ bio, email, school, location, website }) => {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState(colors['dark']);

  useEffect(() => {
    setColor(colors[colorMode]);
  }, [colorMode]);
  return (
    <FocusCard>
      <Text color={color}>{bio}</Text>
      {!!email && (
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Icon color={color} name={'email'} />
          <ExternalLink ml={1} href={`mailto:${email}`}>
            <Text color={color}>{email}</Text>
          </ExternalLink>
        </Flex>
      )}
      {!!school && (
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Icon color={color} name={'info'} />
          <Text color={color} ml={1}>
            {school}
          </Text>
        </Flex>
      )}
      {!!location && (
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Icon color={color} name={'info'} />
          <Text color={color} ml={1}>
            {location}
          </Text>
        </Flex>
      )}
      {!!website && (
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Icon color={color} name={'link'} />
          <ExternalLink ml={1} href={website}>
            <Text color={color}>{website}</Text>
          </ExternalLink>
        </Flex>
      )}
    </FocusCard>
  );
};

export default BioCard;
