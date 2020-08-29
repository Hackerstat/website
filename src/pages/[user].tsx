import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Heading, Flex, Avatar, Stack, PseudoBox, Spinner, Image, Text } from '@chakra-ui/core';
import { useRouter } from 'next/dist/client/router';

import ContributionGraph from '@louisiv/react-contribution-graph';
import Card from '../Components/Card';
import dynamic from 'next/dynamic';
import Axios from 'axios';
import UserCard from '../Components/Dashboard/UserCard';
import FocusCard from '../Components/FocusCard';
import BioCard from '../Components/BioCard';

const NPM = dynamic(() => import('../Components/Dashboard/NPM'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

NPM.displayName = 'NPM';

const Medium = dynamic(() => import('../Components/Dashboard/Medium'), {
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading...</p>,
});
Medium.displayName = 'Medium';

const Twitter = dynamic(() => import('../Components/Dashboard/Twitter'), {
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading...</p>,
});
Twitter.displayName = 'Twitter';

interface UserInfo {
  firstName: string;
  lastName: string;
  photo?: string;
  bio?: string;
}

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const { user, gitLabUsername = undefined } = router.query;

  const [integrations, setIntegrations] = useState();

  const [info, setInfo] = useState<UserInfo>({});

  const [integrationSettings, setIntegrationSettings] = useState();

  useEffect(() => {
    if (!user) {
      return;
    }

    Axios.get(`/api/users/${user}`).then((integrationData) => {
      setIntegrations(integrationData.data.integrations);
      setIntegrationSettings(integrationData.data.settings);
      setInfo(integrationData.data.info);
    });
  }, [user]);

  return (
    <PageBase>
      <Stack isInline shouldWrapChildren spacing={3} flexWrap={'wrap'}>
        <UserCard
          maxW={'lg'}
          minW={'md'}
          width={'100%'}
          photo={info?.photo || `https://api.adorable.io/avatars/285/${user}.png`}
          name={`${info?.firstName || ''} ${info?.lastName || ''}`}
          username={user}
        />
        <BioCard {...info} />
      </Stack>
      <Stack isInline shouldWrapChildren spacing={3} bg={'primary-bg'} flexWrap={'wrap'}>
        {/* <Card minWidth={['xs', 'lg']} width={'100%'} minHeight={'200px'} borderWidth={3} borderColor={'white'}>
          <Flex flexDirection={'column'} alignItems={'flex-start'}>
            <Avatar
              mt={2}
              ml={2}
              name={user as string}
              src={`https://api.adorable.io/avatars/285/${user}.png`}
              size={'xl'}
            />
          </Flex>
        </Card> */}
        <Card padding={3} mt={3} color={'white'}>
          <ContributionGraph gitHubUsername={user as string} gitlabUsername={gitLabUsername as string} />
        </Card>
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !!integrationSettings && integrationSettings?.medium?.username && (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Medium user={`@${integrationSettings?.medium?.username}`} />
          )
        }
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !!integrationSettings && integrationSettings?.npm?.username && (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <NPM username={integrationSettings?.npm?.username} />
          )
        }
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !!integrationSettings && integrationSettings?.twitter?.username && (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Twitter screenName={integrationSettings?.twitter?.username} />
          )
        }
      </Stack>
    </PageBase>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const username = context?.params?.user;

//   console.log('USERNAME', context);

//   try {
//     const integrationData = await Axios.get(`/api/users/${username}`);
//     console.log(integrationData);
//     return {
//       props: { ...integrationData.data }, // will be passed to the page component as props
//     };
//   } catch (err) {
//     console.error('ERROR', err);
//   }

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// };

export default UserProfilePage;
