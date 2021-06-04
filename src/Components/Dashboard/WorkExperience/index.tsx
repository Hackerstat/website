import React, { useState, useEffect, FunctionComponent } from 'react';
import { Package } from '../../../pages/settings/integrations/add/NPM';
import Axios from 'axios';

interface WorkExperienceProps {
  username: string;
}

const WorkExperienceCard: FunctionComponent<WorkExperienceProps> = ({ username }) => {
  const [fetchError, setFetchError] = useState<string>();
  const [packages, setPackages] = useState<Array<Package>>();
  const getWorkExperience = async (username) => {
    try {
      if (!username) {
        setFetchError('Required');
        return;
      }
      const result = await Axios.get(`/api/settings/workexperience`, {
        params: {
          username: username,
        },
      });
      if (result?.data?.error) {
        setFetchError(result?.data?.error);
        throw new Error(result?.data?.error);
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export default WorkExperienceCard;
