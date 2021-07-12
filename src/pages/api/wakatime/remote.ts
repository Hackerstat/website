import { NextApiRequest, NextApiResponse } from 'next';
import { getRemoteWakaTimeData } from '../../../utils/mongo';
import {
  WakaTimeActivityGraphDataPropsType,
  WakaTimeLanguagesGraphDataPropsType,
  GetRemoteWakaTimeDataRes,
} from '../../../utils/utils';
import { fetchWakaTimeActivityData, fetchWakaTimeLanguagesData } from '../../../utils/thrdAPIs';

import {
  handleRes,
  StatusTypes,
  WAKATIME,
  WAKATIME_LANGUAGE_URL,
  WAKATIME_ACTIVITY_URL,
  INTEGRATIONS,
  INTEGRATION_SETTINGS,
} from '../../../utils';

type wakaTimeRes = {
  wakaTimeLanguagesData: WakaTimeLanguagesGraphDataPropsType | null;
  wakaTimeActivityData: WakaTimeActivityGraphDataPropsType | null;
};

const checkWakaTimeInfoObject = (wakaTimeInfo: GetRemoteWakaTimeDataRes): boolean =>
  !Object(wakaTimeInfo).hasOwnProperty(INTEGRATIONS) &&
  !Object(wakaTimeInfo).hasOwnProperty(INTEGRATION_SETTINGS) &&
  !Object(wakaTimeInfo.integration_settings).hasOwnProperty(WAKATIME) &&
  !wakaTimeInfo.integrations.includes(WAKATIME);

/**
 * @name remoteWakaTimeRetrieval
 * @description It is the function that a hackerStat user's wakaTime info for both Activity and Language graphs w/out authentication.
 * @author @Cgunter1
 * @argument {string} dataType It is the dataType that indicates whether the url is an Activity Bar or Language Pie.
 * @returns {void}
 */
export default async function remoteWakaTimeRetrieval(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const wakaTimeRes: wakaTimeRes = {
    wakaTimeActivityData: null,
    wakaTimeLanguagesData: null,
  };
  try {
    if (req.method === 'GET') {
      const wakaTimeInfo = await getRemoteWakaTimeData(req);
      if (checkWakaTimeInfoObject(wakaTimeInfo)) {
        handleRes({ res, status: StatusTypes.OK, jsonData: {} });
        return;
      }
      console.log(wakaTimeInfo);
      if (Object(wakaTimeInfo.integration_settings.wakatime).hasOwnProperty(WAKATIME_LANGUAGE_URL)) {
        const { wakaTimeLanguageURL } = wakaTimeInfo.integration_settings.wakatime;
        wakaTimeRes.wakaTimeLanguagesData = await fetchWakaTimeLanguagesData(wakaTimeLanguageURL);
      }
      if (Object(wakaTimeInfo.integration_settings.wakatime).hasOwnProperty(WAKATIME_ACTIVITY_URL)) {
        const { wakaTimeCodingActivityURL } = wakaTimeInfo.integration_settings.wakatime;
        wakaTimeRes.wakaTimeActivityData = await fetchWakaTimeActivityData(wakaTimeCodingActivityURL);
      }
      handleRes({ res, status: StatusTypes.OK, jsonData: { ...wakaTimeRes } });
    } else {
      handleRes({ res, status: StatusTypes.BAD_REQUEST });
    }
  } catch (err) {
    console.error(err);
    handleRes({ res, status: StatusTypes.SERVER_ERROR });
  }
}
