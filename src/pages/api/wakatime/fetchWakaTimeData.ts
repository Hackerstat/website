import { NextApiRequest, NextApiResponse } from 'next';
import { fetchWakaTimeValidator } from '../../../utils/validation';
import auth0 from '../../../utils/auth';
import { fetchWakaTimeActivityData, fetchWakaTimeLanguagesData } from '../../../utils/thrdAPIs';
import { HTTPCode } from '../../../utils/constants';

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
        res.status(HTTPCode.OK).json({ dataPoints: validatedData });
      } else {
        const validatedData = await fetchWakaTimeLanguagesData(url);
        res.status(HTTPCode.OK).json({ dataPoints: validatedData });
      }
    } else {
      res.status(HTTPCode.BAD_REQUEST).send('Bad HTTP Request');
    }
  } catch (e) {
    console.error(e);
    res.status(HTTPCode.SERVER_ERROR).send('Server Error');
  }
});
