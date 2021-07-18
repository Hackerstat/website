import React, { FunctionComponent } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import AuthLayer from '../AuthLayer';
import { IntegrationTypes } from '../../types';
import { INTEGRATION_ICONS } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SettingsIntegrationContainerProps {
  children: JSX.Element | Array<JSX.Element>;
  integration: IntegrationTypes;
}

const SettingsIntegrationContainer: FunctionComponent<SettingsIntegrationContainerProps> = ({
  children,
  integration,
}) => (
  <AuthLayer>
    <Flex ml={4} width={'100%'} flexDirection={'column'}>
      <Flex alignItems="center" mb={4}>
        {INTEGRATION_ICONS[integration] && <FontAwesomeIcon icon={INTEGRATION_ICONS[integration]} size={'3x'} />}
        <Heading ml={3}>{integration.toLocaleUpperCase()}</Heading>
      </Flex>
      {children}
    </Flex>
  </AuthLayer>
);

export default SettingsIntegrationContainer;
