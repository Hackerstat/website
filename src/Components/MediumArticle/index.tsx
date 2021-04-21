import React, { FunctionComponent } from 'react';
import { Box, Text, Link } from '@chakra-ui/core';
import { convertMonthToName } from '../../utils/time';

interface MediumArticleProps {
  title: string;
  link: string;
  date: string;
}

const MediumArticle = ({ title, link, date }: MediumArticleProps): JSX.Element => {
  const hours = new Date(date).getHours();
  const [hour, isAM] = hours + 1 < 12 ? [hours + 1, true] : [(hours + 1) % 13, false];
  const minute = new Date(date).getMinutes();
  date = date.slice(0, date.length - 7);
  date = `${date.slice(0, date.length - 6)} ${hour}:${minute}${isAM ? 'PM' : 'AM'}`;
  return (
    <Box borderRadius={'lg'} borderWidth={2} pl={4} py={4}>
      <Link href={link}>
        <Text fontSize="lg">{title}</Text>
      </Link>
      <Text fontSize="xs" color={'gray.300'}>
        {date}
      </Text>
    </Box>
  );
};

export default MediumArticle;
