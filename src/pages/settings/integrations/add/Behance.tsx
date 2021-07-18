import React, { FunctionComponent, useState, useEffect } from 'react';
import Axios from 'axios';
import { NextPage } from 'next';
import { Stack, Text, Input, Button, useToast, UseToastOptions } from '@chakra-ui/react';
import {
  IntegrationTypes,
  BehanceWorkPiecesType,
  goodToast,
  badToast,
  verifiedToast,
  notVerifiedToast,
} from '../../../../utils';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import SettingsIntegrationContainer from '../../../../Components/SettingsIntegrationContainer';
import ImagePieceList from '../../../../Components/ImagePieceList';
import BehancePiece from '../../../../Components/BehancePiece';

const AddBehanceIntegrationPage: FunctionComponent = () => {
  const toast = useToast();
  const [behanceUsername, setBehanceUsername] = useState('');
  const [isAddingBehanceData, setIsAddingBehanceData] = useState(false);
  const [isRetrievingBehanceData, setIsRetrievingBehanceData] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [behanceData, setBehanceData] = useState<BehanceWorkPiecesType>([]);

  const validateBehanceAccount = async () => {
    const VALIDATION_ERROR = 'Could Not Validate Integration.';
    const VALIDATE_BEHANCE_PIECES_URL = '/api/behance/validateBehanceAccount';
    try {
      const {
        data: { validated },
      } = await Axios.get(VALIDATE_BEHANCE_PIECES_URL, { params: { behanceUsername } });
      if (!validated) {
        throw new Error(VALIDATION_ERROR);
      }
      toast(verifiedToast as UseToastOptions);
    } catch (e) {
      console.error(e);
      toast(notVerifiedToast as UseToastOptions);
    }
    setIsVerifying(false);
  };

  const retrieveBehanceData = async () => {
    const RETRIEVAL_ERROR = `Could not find any behance project associated with ${behanceUsername}.`;
    const RETRIEVE_BEHANCE_PIECES_URL = '/api/behance/retrieveBehancePieces';
    try {
      const {
        data: { behanceProjects },
      } = await Axios.get(RETRIEVE_BEHANCE_PIECES_URL, { params: { behanceUsername } });
      if (!behanceProjects || !behanceProjects.length) {
        throw new Error(RETRIEVAL_ERROR);
      }
      setBehanceData(behanceProjects);
    } catch (e) {
      console.error(e);
      toast(badToast as UseToastOptions);
    }
    setIsRetrievingBehanceData(false);
  };

  const addBehanceData = async () => {
    const ADD_BEHANCE_PIECES_URL = '/api/behance/addBehancePieces';
    try {
      await retrieveBehanceData();
      await Axios.post(ADD_BEHANCE_PIECES_URL, {
        integrationInfo: {
          integrationType: IntegrationTypes.BEHANCE,
          settings: {
            username: behanceUsername,
            integrationType: IntegrationTypes.BEHANCE,
          },
        },
        behanceUsername,
        behanceWorkPieces: behanceData,
      });
      toast(goodToast as UseToastOptions);
    } catch (e) {
      console.error(e);
      toast(badToast as UseToastOptions);
    }
    setIsAddingBehanceData(false);
  };

  return (
    <SettingsIntegrationContainer integration={IntegrationTypes.BEHANCE}>
      <Stack spacing={5}>
        <Text>{'Write out your Behance username to add your Behance account to your HackerStat Account.'}</Text>
        <Input
          value={behanceUsername}
          placeholder={'Dribbble Username'}
          onChange={(e) => setBehanceUsername(e.target.value)}
        />
        <Button
          disabled={isAddingBehanceData || isRetrievingBehanceData}
          isLoading={isVerifying}
          loadingText="Verifying Account"
          onClick={async () => {
            setIsVerifying(true);
            await validateBehanceAccount();
          }}
        >
          Verify Behance Account
        </Button>
        <Button
          disabled={isAddingBehanceData || isVerifying || behanceUsername.length === 0}
          isLoading={isRetrievingBehanceData}
          loadingText="Retrieving Behance Work"
          onClick={async () => {
            setIsRetrievingBehanceData(true);
            await retrieveBehanceData();
          }}
        >
          Retrieve Behance Data
        </Button>
        <Button
          disabled={isRetrievingBehanceData || isVerifying || behanceData.length === 0}
          isLoading={isAddingBehanceData}
          loadingText="Adding Behance Work"
          onClick={async () => {
            setIsAddingBehanceData(true);
            await addBehanceData();
          }}
        >
          Add Behance Account Data
        </Button>
        <ImagePieceList>
          {behanceData &&
            behanceData
              .filter(({ image }) => image !== undefined)
              .map(({ image, title, link, likes, watches }) => (
                <React.Fragment key={`${image}${link}`}>
                  <BehancePiece image={image} title={title} link={link} likes={likes} watches={watches} />
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

  return <SettingsPage>{mounted ? <AddBehanceIntegrationPage /> : <Loader />}</SettingsPage>;
};

export default IntegrationsPage;
