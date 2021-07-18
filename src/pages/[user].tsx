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
  userFirstName: string;
  userLastName: string;
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

    const USER_API = `/api/users/${user}`;

    Axios.get(USER_API).then(({ data }) => {
      const { firstName: userFirstName, lastName: userLastName, ...rest } = data.info;
      setIntegrations(data.integrations);
      setIntegrationSettings(data.settings);
      setInfo({ userFirstName, userLastName, ...rest });
      setWorkExperienceInstances(data.workExperience);
    });
  }, [user]);

  const { userFirstName, userLastName, photo, ...restOfInfo } = info;

  return (
    <PageBase>
      <Stack direction={['column', 'row']} justifyContent="flex-start" spacing={3} flexWrap={'wrap'} margin="0 auto">
        <UserProfileInfoCard
          maxW={'100%'}
          photo={photo}
          name={`${userFirstName || ''} ${userLastName || ''}`}
          username={user as string}
          {...restOfInfo}
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
              <React.Fragment key={IntegrationTypes.GITHUB}>
                <GitHub
                  mx={2}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  username={user as string}
                />
              </React.Fragment>
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.medium?.username && (
              <React.Fragment key={IntegrationTypes.MEDIUM}>
                <Medium
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  verified={integrationSettings?.medium?.isValidated}
                  mx={2}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  user={`@${integrationSettings?.medium?.username}`}
                />
              </React.Fragment>
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
                <React.Fragment key={IntegrationTypes.WAKATIME}>
                  <WakaTime mx={2} username={user as string} />
                </React.Fragment>
              ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.npm?.username && (
              <React.Fragment key={IntegrationTypes.NPM}>
                <NPM
                  mx={2}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  verified={integrationSettings?.npm?.isValidated}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  username={integrationSettings?.npm?.username}
                />
              </React.Fragment>
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
              <React.Fragment key={IntegrationTypes.STACKOVERFLOW}>
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
              </React.Fragment>
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.dribbble?.username && (
              <React.Fragment key={IntegrationTypes.DRIBBBLE}>
                <Dribbble username={user as string} mx={2} />
              </React.Fragment>
            ),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            !!integrationSettings && integrationSettings?.behance?.username && (
              <React.Fragment key={IntegrationTypes.BEHANCE}>
                <Behance username={user as string} mx={2} />
              </React.Fragment>
            ),
          ]}
        </Masonry>
      </Flex>
    </PageBase>
  );
};

export default UserProfilePage;
