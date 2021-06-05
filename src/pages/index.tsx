import * as React from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Heading, Stack, Box, Text, Flex, Avatar, Button, Grid, Image } from '@chakra-ui/react';
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

const IndexPage: NextPage = () => (
  <PageBase>
    <Stack shouldWrapChildren alignItems={'center'} spacing={32}>
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
          <Button mt={4} variant={'solid'} variantColor={'green'} alignSelf={'center'}>
            See Integrations
          </Button>
        </Link>
      </Flex>
      <Flex flexWrap={'wrap'} flexDirection={'row'} maxW={'lg'} justifyContent={'center'} alignItems={'center'}>
        <Box flexGrow={3} width={'100%'} minW={'xs'} maxW={'lg'} alignSelf={'flex-start'} justifySelf={'flex-start'}>
          <Heading display={'flex'} fontSize={'5xl'} justifySelf={'flex-start'} mb={2}>
            Find Your Community
          </Heading>
        </Box>

        <Box height={'100%'} padding={4} flexGrow={1}>
          <Heading display={'flex'} fontSize={'3xl'} textAlign={'center'} mb={4}>
            1,233,524 Hackers and Growing!
          </Heading>
          <Stack spacing={3} shouldWrapChildren isInline flexWrap={'wrap'}>
            <Image src={'https://temppr.com/images/User-Bubbles.svg'} />
          </Stack>
        </Box>
        <Link href={'/dashboard'} passHref>
          <Button mt={3} variant={'solid'} variantColor={'green'}>
            Explore HackerStat
          </Button>
        </Link>
      </Flex>
    </Stack>
  </PageBase>
);

export default IndexPage;
