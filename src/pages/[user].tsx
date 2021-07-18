import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Stack, Spinner, Flex } from '@chakra-ui/react';
import Masonry from 'react-masonry-css';
import { useRouter } from 'next/dist/client/router';

import dynamic from 'next/dynamic';
import Axios from 'axios';
import UserProfileInfoCard from '../Components/Dashboard/UserProfileInfoCard';
import WorkExperienceCard from '../Components/Dashboard/WorkExperience';
import { WorkExperienceType, IntegrationTypes } from '../utils';

const Behance = dynamic(() => import('../Components/Dashboard/Behance'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

Behance.displayName = IntegrationTypes.BEHANCE;

const Dribbble = dynamic(() => import('../Components/Dashboard/Dribbble'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

Dribbble.displayName = IntegrationTypes.DRIBBBLE;

const WakaTime = dynamic(() => import('../Components/Dashboard/WakaTime'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

WakaTime.displayName = IntegrationTypes.WAKATIME;

const NPM = dynamic(() => import('../Components/Dashboard/NPM'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

NPM.displayName = 'NPM';

const StackOverFlow = dynamic(() => import('../Components/Dashboard/StackOverFlow'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

StackOverFlow.displayName = IntegrationTypes.STACKOVERFLOW;

const Medium = dynamic(() => import('../Components/Dashboard/Medium'), {
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading...</p>,
});
Medium.displayName = IntegrationTypes.MEDIUM;

const Twitter = dynamic(() => import('../Components/Dashboard/Twitter'), {
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading...</p>,
});
Twitter.displayName = IntegrationTypes.TWITTER;

const GitHub = dynamic(() => import('../Components/Dashboard/GitHub'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner aria-busy="true" />,
});

GitHub.displayName = IntegrationTypes.GITHUB;

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
  // const { user, gitLabUsername = undefined } = router.query;
  const { user } = router.query;

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
      <Stack direction={['column', 'row']} justifyContent="flex-start" spacing={3} flexWrap={'wrap'} margin="0 auto">
        <UserProfileInfoCard
          maxW={'100%'}
          photo={info?.photo}
          name={`${info?.firstName || ''} ${info?.lastName || ''}`}
          username={user as string}
          {...info}
        />
        <WorkExperienceCard listOfWorkExperiences={workExperienceInstances} />
      </Stack>
      <Flex w="100%" justifyContent="center">
        <Masonry
          style={{
            display: 'flex',
            marginLeft: '0' /* gutter size offset */,
            width: 'auto',
          }}
          className="IntegrationGrid"
          breakpointCols={{ default: 3, 800: 1 }}
        >
          {[
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.github?.id && (
              <GitHub
                mx={2}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                username={user as string}
              />
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.medium?.username && (
              <Medium
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                verified={integrationSettings?.medium?.isValidated}
                mx={2}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                user={`@${integrationSettings?.medium?.username}`}
              />
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings &&
              !!integrations &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              integrations.includes('wakatime') && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <WakaTime mx={2} username={user as string} />
              ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.npm?.username && (
              <NPM
                mx={2}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                verified={integrationSettings?.npm?.isValidated}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                username={integrationSettings?.npm?.username}
              />
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // !!integrationSettings && integrationSettings?.twitter?.username && (
            //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   // @ts-ignore
            //   <Twitter screenName={integrationSettings?.twitter?.username} />
            // ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.stackoverflow?.username && (
              <StackOverFlow
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                verified={integrationSettings?.stackoverflow?.isValidated}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                stackOverFlowUsername={integrationSettings?.stackoverflow?.username}
                username={user as string}
                mx={2}
              />
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.dribbble?.username && (
              <Dribbble
                username={user as string}
                mx={2}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dribbbleUsername={integrationSettings?.dribbble?.username}
              />
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.behance?.username && (
              <Behance username={user as string} mx={2} />
            ),
          ]}
        </Masonry>
      </Flex>
    </PageBase>
  );
};

export default UserProfilePage;
