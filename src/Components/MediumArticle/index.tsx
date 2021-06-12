import React, { FunctionComponent } from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

interface MediumArticleProps {
  title: string;
  link: string;
  date: string;
}

/**
 * @name MediumArticle
 * @description It is a component that display the title and date of a Medium Article.
 * @author @Cgunter1
 * @param {string} title It is the title of the Medium Article.
 * @param {string} link It is the URL to the Medium Article.
 * @param {string} date It is the date of the Medium Article.
 * @returns {FunctionComponent<MediumArticleProps>}
 */
const MediumArticle: FunctionComponent<MediumArticleProps> = ({ title, link, date }) => {
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
