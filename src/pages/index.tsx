import * as React from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Heading, Stack, Box, Text, Flex, Button, Grid, Img } from '@chakra-ui/react';
import IntegrationTile from '../Components/IntegrationTile';
import {
  faGithub,
  faGitlab,
  faStackOverflow,
  faDocker,
  faTwitter,
  faBehance,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
// import WakaTime from '../Components/Dashboard/WakaTime/index';

/**
 * @name IndexPage
 * @description This component is the Main Home Page.
 * @author @LouisIV
 * @returns {NextPage}
 */
const IndexPage: NextPage = () => (
  <PageBase>
    <Stack alignItems={'center'} spacing={32}>
      {/* INTEGRATIONS */}
      <Flex flexWrap={'wrap'} flexDirection={'row'}>
        <Box width={'100%'} minW={'xs'} maxW={'lg'} alignSelf={'center'} justifySelf={'center'} mr={3}>
          <Heading display={'flex'} fontSize={'5xl'} justifySelf={'flex-start'} mb={2}>
            Show Off More than Just Your GitHub
          </Heading>
          <Text>
            HackerStats has tons of integrations for you to show off on your page! These integrations will let you show
            off more than just your GitHub and can be looked at by tech recruiters!
          </Text>
        </Box>
        <Grid
          gap={2}
          mt={4}
          gridTemplateColumns={'repeat(auto-fit, 100px)'}
          maxW={['xs', 'sm', 'lg', '250px']}
          width={'100%'}
        >
          <IntegrationTile icon={faGithub} disabled />
          <IntegrationTile icon={faGitlab} disabled />
          <IntegrationTile icon={faStackOverflow} disabled />
          <IntegrationTile icon={faDocker} disabled />
          <IntegrationTile icon={faTwitter} disabled />
          <IntegrationTile icon={faBehance} disabled />
        </Grid>
        <Link href={'/integrations'}>
          <Button mt={4} variant={'solid'} colorScheme={'green'} alignSelf={'center'}>
            See Integrations
          </Button>
        </Link>
      </Flex>
      <Box minW={'100%'} maxW={'lg'}>
        <Flex
          justifyContent="flex-start"
          flexDirection={['column-reverse', 'row-reverse']}
          minW={'100%'}
          maxW={'lg'}
          height="100%"
        >
          <Flex justifyContent="center" flexDirection="column" maxW={'100%'} maxHeight="sm">
            <Heading display={'flex'} fontSize={['3xl', '5xl']} justifySelf={'flex-start'} mb={2}>
              Find Your Community
            </Heading>
            <Heading display={'flex'} fontSize={['md', 'xl']} textAlign={'left'} mb={4}>
              1,233,524 Hackers and Growing!
            </Heading>
          </Flex>

          <Box maxWidth="100%" height={'100%'} flexGrow={1}>
            <Img align="left top" src={'https://temppr.com/images/User-Bubbles.svg'} boxSize="100%" />
          </Box>
        </Flex>
        <Link href={'/dashboard'} passHref>
          <Button mt={3} variant={'solid'} colorScheme={'green'}>
            Explore HackerStat
          </Button>
        </Link>
      </Box>
    </Stack>
  </PageBase>
);

export default IndexPage;
