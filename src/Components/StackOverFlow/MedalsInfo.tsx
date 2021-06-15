import React, { FunctionComponent } from 'react';
import Card from '../Card';
import { BoxProps, Flex, Box, HStack, Text } from '@chakra-ui/react';
import { formatNums } from '../../utils/formatNums';
import { Badges } from '../../utils/utils';

enum Medals {
  gold = '#e5cb01',
  backgroundGold = '#b7a201',
  silver = '#D7D7D7',
  backgroundSilver = '#979797',
  bronze = '#A77044',
  backgroundBronze = '#754e30',
}

interface MedalProps {
  medalColor: Medals;
}

interface MedalsInfoProps extends BoxProps {
  badges: Badges;
}

interface MedalDataProps extends MedalProps {
  badgeNumber: number;
  medalBackground: Medals;
}

const Medal: FunctionComponent<MedalProps> = ({ medalColor }) => (
  <Box borderRadius={100} w={4} h={4} backgroundColor={medalColor}></Box>
);

const MedalCount: FunctionComponent<MedalDataProps> = ({ badgeNumber, medalColor, medalBackground }) => (
  <Flex
    alignItems="center"
    backgroundColor={medalBackground}
    p={1}
    borderRadius={10}
    border={`2px solid ${medalColor}`}
  >
    <Box mr={2}>
      <Medal medalColor={medalColor} />
    </Box>
    <Text color="black" fontWeight="bold" as="h5" fontSize="xs">
      {formatNums(badgeNumber)}
    </Text>
  </Flex>
);

export const MedalsInfo: FunctionComponent<MedalsInfoProps> = ({ badges, ...rest }) => (
  <Card minW="100%" {...rest}>
    <HStack minW="100%" justifyContent="flex-start" spacing={5}>
      {badges && badges.gold > 0 && (
        <MedalCount badgeNumber={badges.gold} medalColor={Medals.gold} medalBackground={Medals.backgroundGold} />
      )}
      {badges && badges.silver > 0 && (
        <MedalCount badgeNumber={badges.silver} medalColor={Medals.silver} medalBackground={Medals.backgroundSilver} />
      )}
      {badges && badges.bronze > 0 && (
        <MedalCount badgeNumber={badges.bronze} medalColor={Medals.bronze} medalBackground={Medals.backgroundBronze} />
      )}
    </HStack>
  </Card>
);
