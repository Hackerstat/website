import React, { useState, useEffect } from 'react';
import { Box, Avatar, Text, Flex, Skeleton, useColorMode } from '@chakra-ui/core';
import Card from '../../Card';
import UserBadge from '../../UserBadge';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const TwitterCard = ({ screenName }) => {
  const { colorMode } = useColorMode();
  const [loaded, setLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const color = { light: 'gray.800', dark: 'white' };

  const onLoad = () => {
    setLoaded(true);
  };

  const onError = () => {
    console.log('Something went wrong');
    setIsHidden(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onError();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card mt={2} maxH={'lg'} height={'100%'} maxW={'md'}>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={screenName}
        theme={'dark'}
        options={{ height: '32rem' }}
        onComplete={onLoad}
      />
    </Card>
  );
};

export default TwitterCard;
