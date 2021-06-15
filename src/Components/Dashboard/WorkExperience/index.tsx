import React, { FunctionComponent } from 'react';
import { WorkExperienceType } from '../../../utils/utils';

interface WorkExperienceCardProps {
  listOfWorkExperiences: Array<WorkExperienceType>;
}

const WorkExperienceCard: FunctionComponent<WorkExperienceCardProps> = ({ listOfWorkExperiences }) => {
  console.log(listOfWorkExperiences);
  return <>{listOfWorkExperiences && <></>}</>;
};

export default React.memo(WorkExperienceCard);
