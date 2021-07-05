import * as yup from 'yup';
const wakaTimeDomainURL = 'https://wakatime.com/share/';
const jsonExtension = '.json';

const checkIfValidURL = (url: string) => url && url.startsWith(wakaTimeDomainURL) && url.endsWith(jsonExtension);

export const addWakaTimeIntegrationSchema = yup.object().shape({
  wakaTimeCodingActivityURL: yup
    .string()
    .url()
    .strict(true)
    .test('wakaTimeCodingActivityURL', 'check if it has a valid URL form', (url: string) => checkIfValidURL(url)),
  wakaTimeLanguageURL: yup
    .string()
    .url()
    .strict(true)
    .test('wakaTimeLanguageURL', 'check if it has a valid URL form', (url: string) => checkIfValidURL(url)),
});

export type addWakaTimeIntegrationSchemaType = yup.InferType<typeof addWakaTimeIntegrationSchema>;
