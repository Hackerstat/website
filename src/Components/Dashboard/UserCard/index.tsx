import React, { useState, useEffect } from 'react';
import { Box, Avatar, Text, Flex, Skeleton, useColorMode } from '@chakra-ui/core';
import Card from '../../Card';
import UserBadge from '../../UserBadge';

const UserCard = ({ name = 'Louis Lombardo', username = 'Louisiv', photo, status, ...rest }) => {
  const { colorMode } = useColorMode();
  const [loaded, setLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const color = { light: 'gray.800', dark: 'white' };

  const onLoad = () => {
    setLoaded(true);
  };

  // const onError = () => {
  //   console.log('Something went wrong');
  //   setIsHidden(true);
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onError();
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Skeleton isLoaded={loaded} display={!loaded && isHidden ? 'none' : 'unset'}>
      <Card height={'240px'} {...rest}>
        {!!status && <UserBadge>{status}</UserBadge>}
        <Flex alignItems={'center'} flexDirection={'column'} justifyContent={'center'} height={'100%'}>
          <Avatar mt={4} name={name} size={'2xl'} src={photo} onLoad={onLoad} />
          <Text
            mt={2}
            textTransform={'uppercase'}
            fontWeight={'bold'}
            letterSpacing={'wide'}
            color={'gray.500'}
            fontSize={['xs', 'sm']}
          >
            @{username}
          </Text>
          <Text
            mt={-1}
            textTransform={'uppercase'}
            fontWeight={'bold'}
            letterSpacing={'wide'}
            color={color[colorMode]}
            fontSize={['sm', 'md', 'lg']}
          >
            {name}
          </Text>
        </Flex>
      </Card>
    </Skeleton>
  );
};

export default UserCard;
