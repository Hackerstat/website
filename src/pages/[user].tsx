import * as React from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Heading, Flex, Avatar, Stack, PseudoBox } from '@chakra-ui/core';
import { useRouter } from 'next/dist/client/router';

import ContributionGraph from '@louisiv/react-contribution-graph';
import Card from '../Components/Card';

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const { user, gitLabUsername = undefined } = router.query;

  return (
    <PageBase>
      <Heading>{user}</Heading>

      <Stack isInline shouldWrapChildren spacing={3} bg={'primary-bg'}>
        <Card minWidth={'lg'} minHeight={'200px'} borderWidth={3} borderColor={'white'}>
          <Flex flexDirection={'column'} alignItems={'flex-start'}>
            <Avatar
              mt={2}
              ml={2}
              name={user as string}
              src={`https://api.adorable.io/avatars/285/${user}.png`}
              size={'xl'}
            />
          </Flex>
        </Card>
        <PseudoBox
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
          padding={3}
          borderBottomStyle={'solid'}
          borderBottomColor={'green.500'}
          borderBottomWidth={3}
        >
          <ContributionGraph gitHubUsername={user as string} gitlabUsername={gitLabUsername as string} />
        </PseudoBox>
        <figure>
          <embed src="https://wakatime.com/share/@louisIV/278e8e3f-528a-4e0f-8f5b-0b842e86100b.svg"></embed>
        </figure>
        <a
          className="twitter-timeline"
          href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw"
          style={{ height: '100px' }}
        >
          Tweets by TwitterDev
        </a>
        <script async src="https://platform.twitter.com/widgets.js"></script>
      </Stack>
    </PageBase>
  );
};

export default UserProfilePage;
