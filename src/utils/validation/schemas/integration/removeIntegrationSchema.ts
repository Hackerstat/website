import * as yup from 'yup';
import { INTEGRATIONS } from '../constants';

export const removeIntegrationSchema = yup.object().shape({
  integrationType: yup
    .string()
    .strict(true)
    .trim()
    .test('type', 'is valid integration type', (type: string) => INTEGRATIONS.includes(type))
    .required(),
});
