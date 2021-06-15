import React, { FunctionComponent, useState, useEffect } from 'react';
import { useColorMode, Box, Text, Flex, Stack, HStack } from '@chakra-ui/react';
import { WorkExperienceType } from '../../../utils/utils';
// import { MONTHS } from '../../../utils/constants';
import Card from '../../Card';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const colors = { light: 'gray.800', dark: 'white' };
interface WorkExperienceCardProps {
  listOfWorkExperiences: Array<WorkExperienceType>;
}

interface WorkExperienceItemProps {
  workExperience: WorkExperienceType;
}

const formatDate = (date: string) => {
  const [year, month] = date.split('-');
  console.log(year, MONTHS[parseInt(month) - 1]);
  return `${MONTHS[parseInt(month) - 1]}, ${year}`;
  return '';
};

/**
 * @name WorkExperienceItem
 * @description This component displays an individual HackerStat user's work experience.
 * @author @Cgunter1
 * @param {WorkExperienceCardProps} props This is the props for the component.
 * @param {Array<WorkExperienceType>} props.workExperience This is a workExperience item's data object.
 * @returns {FunctionComponent<WorkExperienceCardProps>}
 */
const WorkExperienceItem: FunctionComponent<WorkExperienceItemProps> = ({ workExperience }) => (
  <Box w="100%" borderWidth="1px" borderRadius={'lg'} p={2}>
    <Flex justifyContent="space-between">
      <Text fontWeight="bold" fontSize={['sm', 'md', 'lg']}>
        {workExperience.companyName}
      </Text>
      <HStack spacing={0.5} alignItems={'center'} fontSize={'xs'}>
        <Text>{`${formatDate(workExperience.startingDate)}`}</Text>
        <Text>-</Text>
        <Text>{`${formatDate(workExperience.endDate)}`}</Text>
      </HStack>
    </Flex>
    <Box p={1} fontSize={['xs', 'sm', 'sm']}>
      <Text fontWeight="semibold" noOfLines={1}>
        {workExperience.position}
      </Text>
      <Text fontWeight="light" noOfLines={4}>
        {workExperience.details}
      </Text>
    </Box>
  </Box>
);

/**
 * @name WorkExperienceCard
 * @description This component displays a HackerStat user's work experience.
 * @author @Cgunter1
 * @param {WorkExperienceCardProps} props This is the props for the component.
 * @param {Array<WorkExperienceType>} props.listOfWorkExperiences This is the list of the HackerStat user's work experiences.
 * @returns {FunctionComponent<WorkExperienceCardProps>}
 */
const WorkExperienceCard: FunctionComponent<WorkExperienceCardProps> = ({ listOfWorkExperiences }) => {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState(colors['dark']);

  useEffect(() => {
    setColor(colors[colorMode]);
  }, [colorMode]);

  return (
    <>
      {listOfWorkExperiences && (
        <Card
          overflowY={'scroll'}
          borderRadius={'lg'}
          padding={2}
          minW={['xs', 'sm', 'lg']}
          maxW={['xs', 'sm', 'lg']}
          mt={3}
          color={color}
        >
          <Flex alignItems={'center'} opacity={0.8}>
            <Text
              fontSize={['sm', 'md', 'lg']}
              fontWeight="bold"
              textTransform={'uppercase'}
              letterSpacing={'wide'}
              color={color}
            >
              Work Experience
            </Text>
          </Flex>
          <Stack spacing={2} mt={2} maxH={'xs'} overflowY={'scroll'} borderRadius={'lg'}>
            {listOfWorkExperiences.map((wEI: WorkExperienceType) => (
              <React.Fragment key={`${wEI.companyName}${wEI.startingDate}${wEI.endDate}${wEI.position}`}>
                <WorkExperienceItem workExperience={wEI} />
              </React.Fragment>
            ))}
          </Stack>
        </Card>
      )}
    </>
  );
};

export default React.memo(WorkExperienceCard);
