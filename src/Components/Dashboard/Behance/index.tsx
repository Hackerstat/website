import React, { FunctionComponent, useEffect, useState } from 'react';
import Axios from 'axios';
import { BoxProps, Box } from '@chakra-ui/react';
import { BehanceRemoteJSONDataType, IntegrationTypes } from '../../../utils';
import BehancePiece from '../../BehancePiece';
import IntegrationWrapperCard from '../IntegrationWrapperCard';

interface BehanceCardProps extends BoxProps {
  username: string;
}

/**
 * @name BehanceCard
 * @description This component displays a HackerStat user's Behance Data.
 * @author @Cgunter1
 * @param {BehanceCardProps} props This is the props for the component.
 * @param {string} props.username This is the HackerStat user's username to find the .
 * @param {BoxProps} props.rest This is the rest of the object for the Card's attributes.
 * @returns {FunctionComponent<BehanceCardProps>}
 */
const BehanceCard: FunctionComponent<BehanceCardProps> = ({ username, ...props }) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [behanceData, setBehanceData] = useState<BehanceRemoteJSONDataType>({
    behanceData: [],
    behanceUsername: '',
    isValidated: false,
  });

  useEffect(() => {
    Axios.post('/api/behance/remote', { username })
      .then(({ data: { isValidated, behanceUsername, behanceData } }) => {
        setBehanceData({ isValidated, behanceData, behanceUsername });
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  return (
    <>
      {!error && !loading && (
        <IntegrationWrapperCard
          link={`https://www.behance.net/${behanceData.behanceUsername}`}
          icon={IntegrationTypes.DRIBBBLE}
          username={behanceData.behanceUsername}
          {...props}
          verified={behanceData.isValidated}
        >
          <Box w="100%" maxH="md" overflowY="scroll">
            {behanceData.behanceData
              .filter(({ image }) => image !== undefined)
              .map(({ image, title, link, watches, likes }) => (
                <React.Fragment key={`${image}${link}`}>
                  <BehancePiece image={image} title={title} link={link} watches={watches} likes={likes} />
                </React.Fragment>
              ))}
          </Box>
        </IntegrationWrapperCard>
      )}
    </>
  );
};

export default React.memo(BehanceCard);
