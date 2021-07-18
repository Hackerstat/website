import { IntegrationTypes } from '../../../types';

export const INTEGRATIONS = Object.keys(IntegrationTypes).map((key) => IntegrationTypes[key]);
