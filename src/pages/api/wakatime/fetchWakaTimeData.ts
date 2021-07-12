import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../utils/auth';
import { fetchWakaTimeActivityData, fetchWakaTimeLanguagesData } from '../../../utils/thrdAPIs';
import { handleRes, StatusTypes, fetchWakaTimeValidator } from '../../../utils';

/**
 * @name fetchWakaTimeData
 * @description It is the function that retrieves the JSON WakaTime data for either the Activity bar graph or Languages pie graph.
 * @author @Cgunter1
 * @authentication user: auth0 token
 * @argument {string} url It is the url that the function will retrieve the JSON data from.
 * @argument {string} dataType It is the dataType that indicates whether the url is an Activity Bar or Language Pie.
 * @returns {void}
 */
export default auth0.withApiAuthRequired(async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { url, dataType } = await fetchWakaTimeValidator(req.query);

      if (dataType === 'bar') {
        const validatedData = await fetchWakaTimeActivityData(url);
        handleRes({ res, status: StatusTypes.OK, jsonData: { dataPoints: validatedData } });
      } else {
        const validatedData = await fetchWakaTimeLanguagesData(url);
        handleRes({ res, status: StatusTypes.OK, jsonData: { dataPoints: validatedData } });
      }
    } else {
      handleRes({ res, status: StatusTypes.BAD_REQUEST, message: 'Bad HTTP Request' });
    }
  } catch (e) {
    console.error(e);
    handleRes({ res, status: StatusTypes.SERVER_ERROR });
  }
});
