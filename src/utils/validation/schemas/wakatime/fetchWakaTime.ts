import * as yup from 'yup';

const wakaTimeDomainURL = 'https://wakatime.com/share/';
const jsonExtension = '.json';

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
});

export type FetchWakaTimeDataType = yup.InferType<typeof fetchWakaTimeSchema>;
