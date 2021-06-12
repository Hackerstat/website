import React, { FunctionComponent } from 'react';
import { Box, Text, Button, Stack } from '@chakra-ui/react';
import { getMonthYear } from '../../utils/time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface ExperienceProps {
  companyName: string;
  position: string;
  startingDate: Date;
  endDate?: Date;
  details: string;
  onEdit?: () => void;
}

/**
 * @name Experience
 * @description This component displays a HackerStat user's work experience item including the Company Name, Position Name, starting date, and etc..
 * @author @LouisIV
 * @param {ExperienceProps} props This is the props for the component.
 * @param {string} props.companyName This is the company name of the work experience item.
 * @param {string} props.position This is the position name (i.e. engineer, developer).
 * @param {string} props.startingDate This is the starting date of the work experience.
 * @param {string} props.endDate This is the end date of the work experience.
 * @param {string} props.details This is extra details of the work experience.
 * @param {() => void} props.onEdit This is the function that runs when the edit button is pressed.
 * @returns {FunctionComponent<ExperienceProps>}
 */
const Experience: FunctionComponent<ExperienceProps> = ({
  companyName,
  position,
  startingDate,
  endDate,
  details,
  onEdit,
}) => (
  <Box borderRadius={'lg'} borderWidth={2} p={4}>
    <Text fontSize={'lg'} fontWeight={'bold'} letterSpacing={'wide'}>
      {companyName}
    </Text>
    <Text>{position}</Text>
    <Stack isInline>
      <Text fontSize={'sm'} color={'gray.300'}>
        {getMonthYear(startingDate as unknown as string)}
      </Text>
      <Text fontSize={'sm'} color={'gray.300'}>
        {'-'}
      </Text>
      <Text fontSize={'sm'} color={'gray.300'}>
        {!!endDate ? endDate : 'Current'}
      </Text>
    </Stack>
    <Text fontSize={'md'}>{details}</Text>
    {!!onEdit && (
      <Button mt={2} onClick={onEdit} leftIcon={<FontAwesomeIcon icon={faEdit} />}>
        Edit Experience
      </Button>
    )}
  </Box>
);

export default Experience;
