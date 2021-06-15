import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Stack, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

import dynamic from 'next/dynamic';
import Axios from 'axios';
import UserProfileInfoCard from '../Components/Dashboard/UserProfileInfoCard';
import WorkExperienceCard from '../Components/Dashboard/WorkExperience';
import { WorkExperienceType } from '../utils/utils';

const WakaTime = dynamic(() => import('../Components/Dashboard/WakaTime'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

WakaTime.displayName = 'WakaTime';

const NPM = dynamic(() => import('../Components/Dashboard/NPM'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

NPM.displayName = 'NPM';

const StackOverFlow = dynamic(() => import('../Components/Dashboard/StackOverFlow'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

StackOverFlow.displayName = 'StackOverFlow';

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

type WorkExperienceInstancesType = Array<WorkExperienceType>;

/**
 * @name UserProfilePage
 * @description This component display a HackerStat user's info and integrations (i.e. NPM, GitHub, StackOverflow).
 * @author @Cgunter1 @LouisIV
 * @returns {NextPage}
 */
const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const { user, gitLabUsername = undefined } = router.query;

  const [integrations, setIntegrations] = useState();

  const [info, setInfo] = useState<Partial<UserInfo>>({});

  const [integrationSettings, setIntegrationSettings] = useState();

  const [workExperienceInstances, setWorkExperienceInstances] = useState<WorkExperienceInstancesType>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    Axios.get(`/api/users/${user}`).then((integrationData) => {
      setIntegrations(integrationData.data.integrations);
      setIntegrationSettings(integrationData.data.settings);
      setInfo(integrationData.data.info);
      setWorkExperienceInstances(integrationData.data.workExperience);
    });
  }, [user]);

  return (
    <PageBase>
      <Stack isInline shouldWrapChildren spacing={3} flexWrap={'wrap'} margin="0 auto">
        <UserProfileInfoCard
          maxW={'100%'}
          photo={info?.photo || `https://api.adorable.io/avatars/285/${user}.png`}
          name={`${info?.firstName || ''} ${info?.lastName || ''}`}
          username={user as string}
          {...info}
        />
        <WorkExperienceCard listOfWorkExperiences={workExperienceInstances} />
      </Stack>
      <Stack isInline shouldWrapChildren spacing={3} bg={'primary-bg'} flexWrap={'wrap'} maxW="100%">
        {/* Add GitHub Repos */}
        {/* Add GitLab Repos */}
        {/* Add StackOverflow */}
        {/* Add Work Experience */}
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
          !!integrationSettings &&
            !!integrations &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            integrations.includes('wakatime') && (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <WakaTime username={user as string} />
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
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !!integrationSettings && integrationSettings?.stackoverflow?.username && (
            <StackOverFlow
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              stackOverFlowUsername={integrationSettings?.stackoverflow?.username}
              username={user as string}
            />
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
