import * as yup from 'yup';

const WakaTimeLanguageDataInstanceSchema = yup.object({
  color: yup
    .string()
    .nullable(false)
    .test((c) => c.startsWith('#'))
    .required(),
  name: yup.string().nullable(false).required(),
  percent: yup.number().nullable(false).required(),
});

export const WakaTimeLanguagePieDataSchema = yup.object().shape({
  data: yup.array(WakaTimeLanguageDataInstanceSchema),
});

export type WakaTimeLanguagePieDataSchemaType = yup.InferType<typeof WakaTimeLanguagePieDataSchema>;
