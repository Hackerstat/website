import React, { FunctionComponent, useState, useEffect } from 'react';
import Axios from 'axios';
import { BoxProps, Box } from '@chakra-ui/react';
import { DribbbleRemoteJSONDataType, IntegrationTypes } from '../../../utils';
import IntegrationWrapperCard from '../IntegrationWrapperCard';
import DribbblePiece from '../../DribbblePiece';

interface DribbbleCardProps extends BoxProps {
  username: string;
}

/**
 * @name DribbbleCard
 * @description This component displays a HackerStat user's Behance Data.
 * @author @Cgunter1
 * @param {DribbbleCardProps} props This is the props for the component.
 * @param {string} props.username This is the HackerStat user's username to find the .
 * @param {BoxProps} props.rest This is the rest of the object for the Card's attributes.
 * @returns {FunctionComponent<DribbbleCardProps>}
 */
const DribbbleCard: FunctionComponent<DribbbleCardProps> = ({ username, ...props }) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dribbbleData, setDribbbleData] = useState<DribbbleRemoteJSONDataType>({
    dribbbleData: [],
    dribbbleUsername: '',
    isValidated: false,
  });

  useEffect(() => {
    try {
      Axios.post('/api/dribbble/remote', { username }).then(
        ({ data: { dribbbleData, dribbbleUsername, isValidated } }) =>
          setDribbbleData({ dribbbleData, dribbbleUsername, isValidated }),
      );
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  }, []);

  return (
    <>
      {!error && !loading && (
        <IntegrationWrapperCard
          link={`https://dribbble.com/${dribbbleData.dribbbleUsername}`}
          icon={IntegrationTypes.DRIBBBLE}
          username={dribbbleData.dribbbleUsername}
          {...props}
          verified={dribbbleData.isValidated}
        >
          <Box w="100%" maxH="md" overflowY="scroll">
            {dribbbleData.dribbbleData.map(({ img, title, link }) => (
              <React.Fragment key={`${img}${link}`}>
                <DribbblePiece img={img} title={title} link={link} />
              </React.Fragment>
            ))}
          </Box>
        </IntegrationWrapperCard>
      )}
    </>
  );
};

export default React.memo(DribbbleCard);
