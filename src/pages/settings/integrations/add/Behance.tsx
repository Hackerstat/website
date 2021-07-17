import React, { FunctionComponent, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, Heading } from '@chakra-ui/react';
import { IntegrationTypes } from '../../../../utils';
import SettingsPage from '../../../../Components/SettingsPage';
import Loader from '../../../../Components/Loader';
import SettingsIntegrationContainer from '../../../../Components/SettingsIntegrationContainer';

const AddBehanceIntegrationPage: FunctionComponent = () => {
  return (
    <SettingsIntegrationContainer integration={IntegrationTypes.BEHANCE}>
      <></>
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
