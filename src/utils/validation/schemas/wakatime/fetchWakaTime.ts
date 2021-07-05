import * as yup from 'yup';

const wakaTimeDomainURL = 'https://wakatime.com/share/';
const jsonExtension = '.json';
const dataTypes = ['bar', 'pie'];

export const fetchWakaTimeSchema = yup.object().shape({
  url: yup
    .string()
    .required()
    .strict(true)
    .test(
      'url',
      'is not valid wakatime url',
      (url) => url && url.startsWith(wakaTimeDomainURL) && url.endsWith(jsonExtension),
    ),
  dataType: yup
    .string()
    .required()
    .strict(true)
    .test('dataType', 'is not valid data type.', (dataType) => dataType && dataTypes.includes(dataType)),
});

export type FetchWakaTimeDataType = yup.InferType<typeof fetchWakaTimeSchema>;
