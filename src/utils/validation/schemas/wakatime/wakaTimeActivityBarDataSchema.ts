import * as yup from 'yup';

const GrandTotalDataType = yup.object().shape({
  hours: yup.number().nullable(false).strict(true).required(),
  minutes: yup.number().nullable(false).strict(true).required(),
  text: yup.string().nullable(false).strict(true).required(),
});

const RangeDataType = yup.object().shape({
  date: yup.string().nullable(false).strict(true).required(),
  text: yup.string().nullable(false).strict(true).required(),
});

const WakaTimeActivityDataInstanceSchema = yup.object().shape({
  grand_total: GrandTotalDataType,
  range: RangeDataType,
});

export const WakaTimeActivityBarDataSchema = yup.object().shape({
  data: yup.array(WakaTimeActivityDataInstanceSchema.nullable(true)),
});

export type WakaTimeActivityBarDataSchemaType = yup.InferType<typeof WakaTimeActivityBarDataSchema>;
