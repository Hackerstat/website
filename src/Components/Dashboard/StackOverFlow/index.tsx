import React, { useEffect, FunctionComponent, useState } from 'react';
import Axios from 'axios';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack, useColorMode, Flex } from '@chakra-ui/react';
import Card from '../../Card';
import ExternalLink from '../../ExternalLink';
import IntegrationWrapperCard from '../IntegrationWrapperCard';
import { UserInfo, TagRow } from '../../StackOverFlow';
import { FetchStackOverflowInfoRes } from '../../../utils/utils';
import { STACKOVERFLOW } from '../../../utils/constants';

const colors = { light: 'gray.800', dark: 'white' };

const stackOverFlowRetrievalURL = '/api/stackoverflow/remote';

type StackOverflowCardType = FunctionComponent<{ username: string; stackOverFlowUsername: string }>;

const StackOverflowCard: StackOverflowCardType = ({ username, stackOverFlowUsername }) => {
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
  // useEffect(() => {
  //   Axios.post(stackOverFlowRetrievalURL, { username })
  //     .then((data) => {
  //       console.log(data);
  //       setStackOverflowInfo(data?.data);
  //       setLoaded(true);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError(true);
  //     });
  // }, []);
  return (
    <>
      {/* {loaded && !error && !!stackOverflowInfo && ( */}
      <>
        {/* <Card borderRadius={'lg'} overflow="scroll" padding={2} maxW={['xs', 'sm', 'md']} mt={3} color={color}>
          <Flex alignItems={'center'} opacity={0.8}>
            <FontAwesomeIcon icon={faStackOverflow} size={'1x'} color={color !== 'gray.800' ? color : 'black'} />
            <ExternalLink
              color={color}
              ml={2}
              href={`https://stackoverflow.com/users/${stackOverFlowUsername}` || undefined}
              fontWeight={'bold'}
            >
              StackOverFlow
            </ExternalLink> */}
        {/* </Flex> */}
        <IntegrationWrapperCard
          icon={STACKOVERFLOW}
          link={`https://stackoverflow.com/users/${stackOverFlowUsername}`}
          borderRadius={'lg'}
          overflow="scroll"
          padding={2}
          maxW={['xs', 'sm', 'md']}
          mt={3}
          color={color}
        >
          <UserInfo
            mt={2}
            color={colors[color]}
            displayName={displayName}
            profileImage={profileImage}
            badges={badges}
            maxW={['xs', 'sm', 'md']}
            reputation={reputation}
          />
          <Stack maxW={['xs', 'sm', 'md']} spacing={2} mt={2} maxH={'lg'} overflowY={'scroll'} borderRadius={'lg'}>
            {stackOverflowInfo.topTags.map((tag) => (
              <React.Fragment key={`${tag.name}${tag.questionScore}`}>
                <TagRow tag={tag} />
              </React.Fragment>
            ))}
          </Stack>
        </IntegrationWrapperCard>
        {/* </Card> */}
      </>
      {/* )} */}
    </>
  );
};

export default React.memo(StackOverflowCard);
