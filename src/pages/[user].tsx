import * as React from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Heading } from '@chakra-ui/core';
import { useRouter } from 'next/dist/client/router';

import ContributionGraph from '@louisiv/react-contribution-graph';

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const { user, gitLabUsername = undefined } = router.query;

  return (
    <PageBase>
      <ContributionGraph gitHubUsername={user as string} gitlabUsername={gitLabUsername as string} />
      <Heading>About {user}</Heading>
    </PageBase>
  );
};

export default UserProfilePage;
