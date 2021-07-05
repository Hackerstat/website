import React, { FunctionComponent } from 'react';
import { Flex, Box, Avatar, BoxProps } from '@chakra-ui/react';
import { Badges, StackOverflowUserInfoType } from '../../utils/utils';
import { formatNums } from '../../utils/formatNums';
import { MedalsInfo } from './MedalsInfo';

interface UserInfoProps extends StackOverflowUserInfoType, BoxProps {
  badges: Badges;
}

export const UserInfo: FunctionComponent<UserInfoProps> = ({
  displayName,
  reputation,
  profileImage,
  badges,
  color,
  ...rest
}) => (
  <Box {...rest} color={color}>
    <Flex justifyContent="flex-start" alignItems="center">
      <Avatar size="lg" name={displayName} src={profileImage} />
      <Box p={2}>
        <Box as="h3" fontWeight="bold">
          {displayName}
        </Box>
        <Box overflowX="hidden" fontWeight="semibold" fontSize="sm" as="h3" opacity={0.8}>
          Reputation {formatNums(reputation)}
        </Box>
      </Box>
    </Flex>
    <MedalsInfo mt={3} color={color} badges={badges} />
  </Box>
);
