import React, { FunctionComponent } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExternalLink from './ExternalLink';
import { Chart } from 'react-charts';
import { Package } from '../pages/settings/integrations/add/NPM';
import { faNpm } from '@fortawesome/free-brands-svg-icons';

interface NPMPackageProps {
  packageInfo: Package;
}

const NPMPackage: FunctionComponent<NPMPackageProps> = ({ packageInfo }) => {
  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    [],
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'time',
        position: 'bottom',
        show: false,
        // filterTicks: (ticks) =>
        //   ticks.filter((date) => +timeDay.floor(date) === +date),
      },
      { type: 'linear', position: 'left', show: false },
    ],
    [],
  );
  return (
    <Box
      key={packageInfo?.name}
      maxW={'lg'}
      borderRadius={'lg'}
      backgroundColor={'gray.800'}
      padding={3}
      borderWidth={2}
    >
      <Flex alignItems={'center'}>
        <FontAwesomeIcon icon={faNpm} size={'1x'} color={'white'} />
        <ExternalLink
          color={'white'}
          ml={2}
          href={packageInfo?.links?.npm || undefined}
          // isDisabled={!packageInfo?.links?.npm}
          fontWeight={'bold'}
        >
          {packageInfo?.name || '_______'}
        </ExternalLink>
      </Flex>
      <Box height={'200px'} maxW={['sm', 'md', 'lg']} color={'white'}>
        <Chart
          dark
          data={[
            {
              label: 'Downloads',
              data: packageInfo?.lastMonthDownloads?.downloads?.map((download) => {
                return { primary: new Date(download.day), secondary: +download?.downloads || 1 };
              }),
            },
          ]}
          series={series}
          axes={axes}
          tooltip
        />
      </Box>
    </Box>
  );
};

export default NPMPackage;
