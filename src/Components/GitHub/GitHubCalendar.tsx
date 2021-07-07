import React, { FunctionComponent, useState } from 'react';
import { Box, Stack, useColorMode, Text } from '@chakra-ui/react';
import { ContributionsCalendarType, ContributionWeekType, MONTHS } from '../../utils';

interface GitHubCalendarProps {
  gitHubCalendarEvents: ContributionsCalendarType;
}

interface CalendarEventBoxProps {
  color: string;
  contributionCount: number;
  date: string;
}

const emptyEventColor = { light: 'gray.200', dark: 'gray.700' };
const backgroundColors = { light: 'white', dark: 'gray.800' };
const whiteColor = '#ebedf0';

const dateFilter = (date: string): number => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, month, day] = date.split('-');
  if (parseInt(day) === 1) {
    return parseInt(month);
  }
};

const dateFormat = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${MONTHS[parseInt(month) - 1]} ${day}, ${year}`;
};

const CalendarEventBox: FunctionComponent<CalendarEventBoxProps> = ({ color, contributionCount, date }) => {
  const { colorMode } = useColorMode();
  const [popUpShown, setPopUpShown] = useState(false);
  return (
    <Box overflow="visible" position="relative">
      <Box right={1} bottom={2} position="absolute" zIndex="100">
        <Box
          p={1}
          borderRadius={5}
          backgroundColor="black"
          maxW="100%"
          display={popUpShown ? 'block' : 'none'}
          opacity={popUpShown ? 100 : 0}
          transition="opacity 1s ease-out"
          zIndex={1}
          color="white"
        >
          <Text fontSize="xs">{`Contributions:${contributionCount}`}</Text>
          <Text fontSize="xs">{`${dateFormat(date)}`}</Text>
        </Box>
      </Box>
      <Box
        onMouseEnter={() => {
          setPopUpShown(true);
        }}
        onMouseLeave={() => {
          setPopUpShown(false);
        }}
        borderRadius={3}
        h={3}
        w={3}
        backgroundColor={color === whiteColor ? emptyEventColor[colorMode] : color}
      ></Box>
    </Box>
  );
};

const CalendarWeekColumn: FunctionComponent<ContributionWeekType> = ({ contributionDays }) => (
  <Stack direction="column" spacing={'3px'}>
    {contributionDays.map((day) => (
      <React.Fragment key={`${day.contributionCount}${day.date}`}>
        <CalendarEventBox {...day} />
      </React.Fragment>
    ))}
  </Stack>
);

export const GitHubCalendar: FunctionComponent<GitHubCalendarProps> = ({ gitHubCalendarEvents }) => {
  if (!gitHubCalendarEvents?.weeks) {
    return <></>;
  }
  const events = gitHubCalendarEvents.weeks.map((event) => {
    const returnMonths = event.contributionDays
      .map(({ date }) => dateFilter(date))
      .filter((month) => month !== undefined);
    if (!returnMonths.length) {
      return { ...event, month: null };
    }
    return { ...event, month: MONTHS[returnMonths[0] ? returnMonths[0] - 1 : 11] };
  });

  return gitHubCalendarEvents ? (
    <Stack overflowX={'scroll'} overflowY={'visible'}>
      <Text py={1} fontWeight={'bold'} fontSize={'md'}>
        Contributions
      </Text>
      <Stack pt={6} overflow={'visible'} spacing={'3px'} direction="row" w="100%">
        {events.map((event) => (
          <React.Fragment key={`${event.contributionDays[0].date}`}>
            <Stack direction="column">
              {event.month && (
                <Text mt={-8} mr={-8}>
                  {event.month}
                </Text>
              )}
              <CalendarWeekColumn contributionDays={event.contributionDays} />
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  ) : (
    <></>
  );
};
