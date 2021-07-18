const NPM_URL_COUNT = 'https://api.npmjs.org/downloads/range/last-month';
import npmUserPackages from 'npm-user-packages';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleRes, StatusTypes, HttpCodes } from '../../../utils';

const MAX_COUNT = 10;

const retrieveNPMInfo = async (packageName: string) => {
  const res = await fetch(`${NPM_URL_COUNT}/${packageName}`);
  return await res.json();
};

const retrievePackagesFromUser = async (userName: string | string[]) => {
  const res = await npmUserPackages(userName as string);
  return res;
};

// Do server side rendering for the first request.

/**
 * @name remoteNPMRetrieval
 * @description This function retrieves an user's NPM contributions w/out being authenticated.
 * @author @LouisIV
 */
export default async function remoteNPMRetrieval(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === HttpCodes.GET) {
    try {
      const { username: passedUsername } = req.query;
      const packages = await retrievePackagesFromUser(passedUsername);
      const packageInfo = [];
      const returnResults = [];

      const packagePromises = [];
      const packageNames = [];

      if (!packages) {
        const message = 'Could not get packages';
        handleRes({ res, status: StatusTypes.NOT_FOUND, message });
        return;
      }

      for (let i = 0; i <= Math.min(packages.length, MAX_COUNT); ++i) {
        if (!packages[i]) {
          console.log('Package', i, packages[i]);
          console.error('Package not there!');
          continue;
        }

        packageInfo.push(packages[i]);
        packageNames.push(packages[i].name);
        packagePromises.push(retrieveNPMInfo(packages[i].name));
      }

      const packageResults = await Promise.all(packagePromises);

      for (let i = 0; i <= Math.min(packageResults.length, MAX_COUNT); ++i) {
        returnResults.push({ ...packageInfo[i], lastMonthDownloads: packageResults[i] });
      }

      returnResults.pop();

      if (!passedUsername) {
        // await getRemoteNPM(req, username, packageNames);
      }

      handleRes({ res, status: StatusTypes.OK, jsonData: returnResults });
    } catch (e) {
      console.log(e);
      handleRes({ res, status: StatusTypes.BAD_REQUEST });
    }
  }
}
