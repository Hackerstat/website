import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import Axios from 'axios';
import { Button, Input, Stack, Text, useToast, UseToastOptions } from '@chakra-ui/react';
import SettingsIntegrationContainer from '../../../../Components/SettingsIntegrationContainer';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import ImagePieceList from '../../../../Components/ImagePieceList';
import {
  goodToast,
  badToast,
  verifiedToast,
  notVerifiedToast,
  RetrieveDribbblePiecesScrape,
  IntegrationTypes,
} from '../../../../utils';
import DribbblePiece from '../../../../Components/DribbblePiece';

/**
 * @name AddDribbbleIntegrationPage
 * @description It is the component that adds an user's Dribbble account to their HackerStat account.
 * @author @Cgunter1
 * @returns {FunctionComponent}
 */
const AddDribbbleIntegrationPage: FunctionComponent = () => {
  const toast = useToast();
  const [dribbbleUsername, setDribbbleUsername] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRetrievingDribbbleData, setIsRetrievingDribbbleData] = useState(false);
  const [dribbbleWorkPieces, setDribbbleWorkPieces] = useState<RetrieveDribbblePiecesScrape>([]);
  const [isAddingDribbbleData, setIsAddingDribbbleData] = useState(false);

  const retrieveDribbbleData = async () => {
    setDribbbleWorkPieces([].slice());
    const RETRIEVE_DRIBBBLE_PIECES_URL = '/api/dribbble/retrieveDribbblePieces';
    try {
      const { data: dribbblePieces } = await Axios.get(RETRIEVE_DRIBBBLE_PIECES_URL, {
        params: { dribbbleUsername },
      });
      setDribbbleWorkPieces(dribbblePieces);
      setIsRetrievingDribbbleData(false);
    } catch (err) {
      console.error(err);
      toast(badToast as UseToastOptions);
    }
    setIsRetrievingDribbbleData(false);
  };

  const validateDribbbleAccount = async () => {
    const VALIDATE_DRIBBBLE_PIECES_URL = '/api/dribbble/validateDribbbleAccount';
    try {
      await Axios.get(VALIDATE_DRIBBBLE_PIECES_URL, { params: { dribbbleUsername } });
      toast(verifiedToast as UseToastOptions);
    } catch (err) {
      console.error(err);
      toast(notVerifiedToast as UseToastOptions);
    }
    setIsVerifying(false);
  };

  const addDribbbleData = async () => {
    const VALIDATE_DRIBBBLE_PIECES_URL = '/api/dribbble/addDribbblePieces';

    try {
      await retrieveDribbbleData();
      await Axios.post(VALIDATE_DRIBBBLE_PIECES_URL, {
        integrationInfo: {
          integrationType: IntegrationTypes.DRIBBBLE,
          settings: {
            username: dribbbleUsername,
            integrationType: IntegrationTypes.DRIBBBLE,
          },
        },
        dribbbleUsername,
        dribbblePieces: dribbbleWorkPieces,
      });
      toast(goodToast as UseToastOptions);
    } catch (err) {
      toast(badToast as UseToastOptions);
    }
    setIsAddingDribbbleData(false);
  };

  return (
    <SettingsIntegrationContainer integration={IntegrationTypes.DRIBBBLE}>
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
          onClick={async () => {
            setIsVerifying(true);
            await validateDribbbleAccount();
          }}
        >
          Verify Dribbble Account
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
        <ImagePieceList>
          {dribbbleWorkPieces &&
            dribbbleWorkPieces.map((dribbbleData) => (
              <React.Fragment key={dribbbleData.link}>
                <DribbblePiece {...dribbbleData} />
              </React.Fragment>
            ))}
        </ImagePieceList>
      </Stack>
    </SettingsIntegrationContainer>
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
