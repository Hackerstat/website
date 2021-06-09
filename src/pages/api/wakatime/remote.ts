import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { getRemoteWakaTimeData } from '../../../utils/mongo';
import { WakaTimeActivityGraphDataPropsType, WakaTimeLanguagesGraphDataPropsType } from '../../../utils/utils';
import { fetchWakaTimeActivityData, fetchWakaTimeLanguagesData } from '../../../utils/thrdAPIs';

import {
  HTTPCode,
  WAKATIME,
  WAKATIME_LANGUAGE_URL,
  WAKATIME_ACTIVITY_URL,
  INTEGRATIONS,
  INTEGRATION_SETTINGS,
} from '../../../utils/constants';

type wakaTimeRes = {
  wakaTimeLanguagesData: WakaTimeActivityGraphDataPropsType | null;
  wakaTimeActivityData: WakaTimeLanguagesGraphDataPropsType | null;
};

export default async function remoteWakaTimeRetrieval(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const wakaTimeRes: wakaTimeRes = {
    wakaTimeActivityData: null,
    wakaTimeLanguagesData: null,
  };
  try {
    if (req.method === 'GET') {
      const wakaTimeInfo = await getRemoteWakaTimeData(req);
      if (
        Object(wakaTimeInfo).hasOwnProperty(INTEGRATIONS) &&
        Object(wakaTimeInfo).hasOwnProperty(INTEGRATION_SETTINGS) &&
        Object(wakaTimeInfo.integration_settings).hasOwnProperty(WAKATIME) &&
        !wakaTimeInfo.integrations.includes(WAKATIME)
      ) {
        res.status(HTTPCode.OK).json({});
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
      res.status(HTTPCode.OK).json({ ...wakaTimeRes });
    } else {
      res.status(HTTPCode.BAD_REQUEST).send('Bad HTTP Request');
    }
  } catch (err) {
    console.error(err);
    res.status(HTTPCode.SERVER_ERROR).send('Server Error');
  }
}
