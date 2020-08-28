import React, { useState, useEffect } from 'react';
import { Heading, Box, Avatar, Text, Stack, Flex, Skeleton, useColorMode } from '@chakra-ui/core';
import Card from '../../Card';
import UserBadge from '../../UserBadge';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Axios from 'axios';
import { propNames } from '@chakra-ui/system';

function Feature({ title, date, ...rest }) {
  return (
    <Box p={2} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={2}>{date}</Text>
    </Box>
  );
}

const MediumCard = ({ user, ...rest }) => {
  const { colorMode } = useColorMode();
  const [articles, setArticles] = useState([]);

  const color = { light: 'gray.800', dark: 'white' };
  useEffect(() => {
    Axios.get('/api/Medium/fetchArticles?user=' + user).then(function (response) {
      setArticles(response.data.articles);
    });
  });

  return (
    <Card height={['1100px', '300px']}>
      <Flex alignItems={'center'} flexDirection={'column'} justifyContent={'center'} height={'100%'}>
        <Stack spacing={8}>
          {articles.map((item, index) => (
            <Feature title={item.title} date={item.date} key={index} />
          ))}
        </Stack>
      </Flex>
    </Card>
  );
};

export default MediumCard;
