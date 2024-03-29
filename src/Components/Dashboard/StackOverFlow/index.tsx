import React, { useEffect, FunctionComponent, useState } from 'react';
import Axios from 'axios';
import { Stack, useColorMode, BoxProps } from '@chakra-ui/react';
import IntegrationWrapperCard from '../IntegrationWrapperCard';
import { UserInfo, TagRow } from '../../StackOverFlow';
import { FetchStackOverflowInfoRes } from '../../../types';
import { IntegrationTypes } from '../../../types';

const stackOverFlowRetrievalURL = '/api/stackoverflow/remote';

interface StackOverflowCardPropsType extends BoxProps {
  username: string;
  stackOverFlowUsername: string;
  verified: boolean;
}

type StackOverflowCardType = FunctionComponent<StackOverflowCardPropsType>;

const colors = { light: 'gray.800', dark: 'white' };
const backgroundColors = { light: 'white', dark: 'gray.800' };

/**
 * @name StackOverflowCard
 * @description It is a component that displays a user's stackoverflow account info such as badges, tags, and etc..
 * @author @Cgunter1
 * @param {StackOverflowCardPropsType} props It is the prop object of the component.
 * @param {string} props.username It is the HackerStat username.
 * @param {string} props.stackOverFlowUsername It is the HackerStat user's StackOverflow username.
 * @returns {StackOverflowCardType}
 */
const StackOverflowCard: StackOverflowCardType = ({ username, stackOverFlowUsername, verified, ...rest }) => {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState(colors['dark']);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [stackOverflowInfo, setStackOverflowInfo] = useState<Partial<FetchStackOverflowInfoRes>>({
    badges: { gold: 12, silver: 53, bronze: 2034223 },
    displayName: 'Chris Gunter',
    reputation: 123231,
    profileImage: '',
    topTags: [
      { name: 'R', answerScore: 1234, questionScore: 546 },
      { name: 'Javascript', answerScore: 675, questionScore: 12312 },
      { name: 'HTML/CSS', answerScore: 876, questionScore: 90432 },
      { name: 'wqe', answerScore: 675, questionScore: 12312 },
      { name: 'sda/CSS', answerScore: 876, questionScore: 90432 },
      { name: 'xzccxz', answerScore: 675, questionScore: 12312 },
      { name: 'HTML2132213/CSS', answerScore: 876, questionScore: 90432 },
      { name: '213', answerScore: 1234, questionScore: 546 },
      { name: 'ewqweq', answerScore: 675, questionScore: 12312 },
      { name: '123e2wqedas/CSS', answerScore: 876, questionScore: 90432 },
      { name: '435435fdssdf', answerScore: 675, questionScore: 12312 },
      { name: 'dfsfds1e2321/CSS', answerScore: 876, questionScore: 90432 },
      { name: 'asdd121xz', answerScore: 675, questionScore: 12312 },
      { name: 'knlewfnlknlefkwlnkf/CSS', answerScore: 876, questionScore: 90432 },
    ],
  });

  useEffect(() => {
    setColor(colors[colorMode]);
  }, [colorMode]);

  const { badges, displayName, profileImage, reputation } = stackOverflowInfo;
  useEffect(() => {
    Axios.post(stackOverFlowRetrievalURL, { username })
      .then((data) => {
        setStackOverflowInfo(data?.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);
  return (
    <>
      {loaded && !error && !!stackOverflowInfo && (
        <>
          <IntegrationWrapperCard
            verified={verified}
            icon={IntegrationTypes.STACKOVERFLOW}
            link={`https://stackoverflow.com/users/${stackOverFlowUsername}?tab=profile`}
            {...rest}
          >
            <UserInfo
              mt={2}
              color={colors[color]}
              displayName={displayName}
              profileImage={profileImage}
              badges={badges}
              minW={['xs', 'sm', 'md']}
              reputation={reputation}
              overflowX="hidden"
            />
            <Stack overflow="scroll" maxW={['xs', 'sm', 'md']} spacing={2} mt={2} maxH={'lg'} borderRadius={'lg'}>
              {stackOverflowInfo.topTags.map((tag) => (
                <React.Fragment key={`${tag.name}${tag.questionScore}`}>
                  <TagRow tag={tag} backgroundColor={backgroundColors[colorMode]} />
                </React.Fragment>
              ))}
            </Stack>
          </IntegrationWrapperCard>
        </>
      )}
    </>
  );
};

export default React.memo(StackOverflowCard);
