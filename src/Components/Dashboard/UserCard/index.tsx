import React, { useState, useEffect, FunctionComponent } from 'react';
import { Avatar, Text, Flex, Skeleton, useColorMode, BoxProps, useBreakpointValue } from '@chakra-ui/react';
import Card from '../../Card';
import UserBadge from '../../UserBadge';

interface UserCardProps extends BoxProps {
  name: string;
  username: string;
  photo: string;
  status?: string;
  onClick?: () => void;
}
const colors = { light: 'gray.800', dark: 'white' };

/**
 * @name UserCard
 * @description This component displays a HackerStat user's username, first + last name, and Avatar Image.
 * @author @LouisIV
 * @param {UserCardProps} props This is the props for the component.
 * @param {string} props.name This is a HackerStat user's fullname.
 * @param {string} props.username This is a HackerStat user's username.
 * @param {string} props.photo This is a HackerStat user's Avatar Image URL.
 * @param {string} props.status This is a HackerStat user's current status.
 * @param {() => void} props.rest.onClick This is a function that is initiated when the component is clicked.
 * @returns {FunctionComponent<UserCardProps>}
 */
const UserCard: FunctionComponent<UserCardProps> = ({
  name = 'Louis Lombardo',
  username = 'Louisiv',
  photo = 'https://bit.ly/broken-link',
  status,
  ...rest
}) => {
  const { colorMode } = useColorMode();
  const [color, setColor] = useState(colors['dark']);
  const [loaded, setLoaded] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const variant = useBreakpointValue({ base: 'lg', md: '2xl' });

  // const onLoad = () => {
  //   console.log('sad');
  //   setLoaded(true);
  // };

  const onError = () => {
    console.log('Something went wrong');
    setIsHidden(true);
  };

  useEffect(() => {
    setColor(colors[colorMode]);
  }, [colorMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onError();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Skeleton isLoaded={loaded} display={!loaded && isHidden ? 'none' : 'unset'}>
      <Card borderTopLeftRadius={10} borderTopRightRadius={10} width="100%" height={'100%'} {...rest}>
        {!!status && <UserBadge>{status}</UserBadge>}
        <Flex alignItems={'center'} flexDirection={'column'} justifyContent={'center'} height={'100%'}>
          <Avatar mt={4} name={name} size={'2xl'} src={photo} variant={variant} />
          <Text
            mt={2}
            textTransform={'uppercase'}
            fontWeight={'bold'}
            letterSpacing={'wide'}
            color={color}
            fontSize={['xs', 'sm']}
            opacity={0.6}
          >
            @{username}
          </Text>
          <Text
            mt={0}
            textTransform={'uppercase'}
            fontWeight={'bold'}
            letterSpacing={'wide'}
            color={color}
            fontSize={['sm', 'md', 'lg']}
          >
            {name.toLowerCase()}
          </Text>
        </Flex>
      </Card>
    </Skeleton>
  );
};

export default UserCard;
