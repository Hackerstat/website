import React, { FunctionComponent } from 'react';
import { Text, Stack } from '@chakra-ui/react';

interface FooterSectionProps {
  title: string;
}

const FooterSection: FunctionComponent<FooterSectionProps> = ({ title, children }) => (
  <Stack>
    <Text fontWeight={'bold'} letterSpacing={'wide'} textTransform={'uppercase'}>
      {title}
    </Text>
    {children}
  </Stack>
);

export { FooterSection };
