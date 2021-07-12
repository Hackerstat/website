import { NextApiResponse } from 'next';
import { HTTPCode } from '../constants';
import { StatusTypes } from '../utils';

interface HandleResType {
  res: NextApiResponse;
  status: StatusTypes;
  message?: string;
  jsonData?: any;
}

export const handleRes = ({ res, status, message, jsonData }: HandleResType): void => {
  jsonData
    ? res.status(HTTPCode[status][0]).json(jsonData)
    : res.status(HTTPCode[status][0]).send(message || HTTPCode[status][0]);
};
