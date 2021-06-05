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
