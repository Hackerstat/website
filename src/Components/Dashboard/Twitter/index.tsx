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
    <Card height={['650px', '300px']}>
      <Flex alignItems={'center'} flexDirection={'column'} justifyContent={'center'} height={'100%'}>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={screenName}
          options={{ height: 600 }}
          onComplete={onLoad}
        />
      </Flex>
    </Card>
  );
};

export default TwitterCard;
