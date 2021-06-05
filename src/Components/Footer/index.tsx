import React, { FunctionComponent } from 'react';
import { Flex, SimpleGrid, Heading } from '@chakra-ui/react';
import Link from '../Link';
import { FooterSection } from './FooterSection';
import { BottomBar } from './BottomBar';

const Footer: FunctionComponent = () => (
  <Flex height={'300px'} width={'100%'} justifyContent={'center'}>
    <Flex
      flexDirection={'column'}
      height={'100%'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems="flex-start"
      maxW={'6xl'}
      p={3}
    >
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing="40px">
        <Heading>Hackerstat</Heading>
        <FooterSection title={null}>
          <Link href={'/about'}>About</Link>
        </FooterSection>
      </SimpleGrid>
      <BottomBar />
    </Flex>
  </Flex>
);

export default Footer;
