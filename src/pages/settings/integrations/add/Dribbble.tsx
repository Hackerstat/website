import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import Axios from 'axios';
import { Flex, Heading, Button, Input, Stack, Text, Grid } from '@chakra-ui/react';
import AuthLayer from '../../../../Components/AuthLayer';
import { RetrieveDribbblePiecesScrape } from '../../../../utils';
import { faDribbble } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import DribbblePiece from '../../../../Components/DribbblePiece';

/**
 * @name AddDribbbleIntegrationPage
 * @description It is the component that adds an user's Dribbble account to their HackerStat account.
 * @author @Cgunter1
 * @returns {FunctionComponent}
 */
const AddDribbbleIntegrationPage: FunctionComponent = () => {
  const [dribbbleUsername, setDribbbleUsername] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRetrievingDribbbleData, setIsRetrievingDribbbleData] = useState(false);
  const [dribbbleWorkPieces, setDribbbleWorkPieces] = useState<RetrieveDribbblePiecesScrape>([]);
  const [isAddingDribbbleData, setIsAddingDribbbleData] = useState(false);

  const retrieveDribbbleData = async () => {
    const RETRIEVE_DRIBBBLE_PIECES_URL = '/api/dribbble/retrieveDribbblePieces';
    const { data: dribbblePieces } = await Axios.get(RETRIEVE_DRIBBBLE_PIECES_URL, {
      params: { dribbbleUsername },
    });
    setDribbbleWorkPieces(dribbblePieces);
    setIsRetrievingDribbbleData(false);
  };

  const addDribbbleData = async () => {
    /**
     * Add Dribbble Data.
     */
    setIsAddingDribbbleData(false);
  };

  return (
    <AuthLayer>
      <Flex ml={4} width={'100%'} flexDirection={'column'}>
        <Flex mb={4}>
          <FontAwesomeIcon icon={faDribbble} size={'3x'} />
          <Heading ml={3}>Dribbble</Heading>
        </Flex>
        <Stack spacing={5}>
          <Text>{'Write out your Dribbble username to add your Dribbble account to your HackerStat Account.'}</Text>
          <Input
            value={dribbbleUsername}
            placeholder={'Dribbble Username'}
            onChange={(e) => setDribbbleUsername(e.target.value)}
          />
          <Button
            disabled={isAddingDribbbleData || isRetrievingDribbbleData}
            isLoading={isVerifying}
            loadingText="Verifying Account"
            onClick={() => {
              setIsVerifying(true);
            }}
          >
            Verify Account
          </Button>
          <Button
            disabled={isAddingDribbbleData || isVerifying || dribbbleUsername.length === 0}
            isLoading={isRetrievingDribbbleData}
            loadingText="Retrieving Dribbble Work"
            onClick={async () => {
              setIsRetrievingDribbbleData(true);
              await retrieveDribbbleData();
            }}
          >
            Retrieve Dribbble Data
          </Button>
          <Button
            disabled={isRetrievingDribbbleData || isVerifying || dribbbleWorkPieces.length === 0}
            isLoading={isAddingDribbbleData}
            loadingText="Adding Dribbble Work"
            onClick={async () => {
              setIsAddingDribbbleData(true);
              await addDribbbleData();
            }}
          >
            Add Dribbble Account Data
          </Button>
          <Flex w="100%" justifyContent="center">
            <Grid gap={10} rowGap={0} gridTemplateColumns={'repeat(3, 1fr)'}>
              {dribbbleWorkPieces &&
                dribbbleWorkPieces.map((dribbbleData) => (
                  <React.Fragment key={dribbbleData.link}>
                    <DribbblePiece {...dribbbleData} />
                  </React.Fragment>
                ))}
            </Grid>
          </Flex>
        </Stack>
      </Flex>
    </AuthLayer>
  );
};

const IntegrationsPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <SettingsPage>{mounted ? <AddDribbbleIntegrationPage /> : <Loader />}</SettingsPage>;
};

export default IntegrationsPage;
