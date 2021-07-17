import * as yup from 'yup';
import { INTEGRATIONS } from '../constants';

export const addIntegrationInSettingsSchema = yup.object().shape({
  integrationType: yup
    .string()
    .strict(true)
    .trim()
    .test('type', 'integration type is not valid', (name: string) => name && INTEGRATIONS.includes(name.toLowerCase()))
    .required(),
  settings: yup
    .object()
    .when('integrationType', {
      is: 'npm',
      then: yup
        .object({
          username: yup.string().strict(true).required(),
          isValidated: yup.boolean().default(false),
        })
        .required(),
    })
    .when('integrationType', {
      is: 'medium',
      then: yup
        .object({
          username: yup.string().strict(true).required(),
          isValidated: yup.boolean().default(false),
        })
        .required(),
    })
    .when('integrationType', {
      is: 'twitter',
      then: yup
        .object({
          username: yup.string().strict(true).required(),
          isValidated: yup.boolean().default(false),
        })
        .required(),
    })
    .when('integrationType', {
      is: 'github',
      then: yup.object(),
    })
    .when('integrationType', {
      is: 'dribbble',
      then: yup.object({
        username: yup.string().strict(true).required(),
        isValidated: yup.boolean().default(false),
      }),
    })
    .required(),
});

export type AddIntegrationInSettingsSchemaType = yup.InferType<typeof addIntegrationInSettingsSchema>;
