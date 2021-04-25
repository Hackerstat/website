import * as yup from 'yup';
import { INTEGRATIONS } from '../constants';

export const addIntegrationInSettingsSchema = yup
  .object()
  .shape({
    integrationType: yup
      .string()
      .strict(true)
      .trim()
      .test('type', 'integration type is valid', (name: string) => INTEGRATIONS.includes(name.toLowerCase()))
      .required(),
    settings: yup
      .object()
      .when('integrationType', {
        is: 'npm',
        then: yup
          .object({
            username: yup.string().strict(true).required(),
          })
          .required(),
      })
      .when('integrationType', {
        is: 'medium',
        then: yup
          .object({
            username: yup.string().strict(true).required(),
          })
          .required(),
      })
      .when('integrationType', {
        is: 'twitter',
        then: yup
          .object({
            username: yup.string().strict(true).required(),
          })
          .required(),
      })
      .when('integrationType', {
        is: 'github',
        then: yup.object(),
      })
      .required(),
  })
  .required();
