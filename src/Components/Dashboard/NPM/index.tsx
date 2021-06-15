import React, { useState, useEffect, FunctionComponent } from 'react';
import { Grid, useColorMode } from '@chakra-ui/react';
import NPMPackage from '../../NPMPackage';
import { Package } from '../../../pages/settings/integrations/add/NPM';
import Axios from 'axios';
import { NPM } from '../../../utils/constants';
import IntegrationWrapperCard from '../IntegrationWrapperCard';

interface NPMCardProps {
  username: string;
}

const colors = { light: 'gray.800', dark: 'white' };
const backgroundColors = { light: 'white', dark: 'gray.800' };

/**
 * @name NPMCard
 * @description It is a component that displays on a user's profile to show their NPM packages and daily downloads.
 * @author @LouisIV
 * @param {MediumCardProps} props It is the prop object of the component.
 * @param {string} props.username It is the NPM username of the HackerStat user.
 * @returns {FunctionComponent<NPMCardProps>}
 */
const NPMCard: FunctionComponent<NPMCardProps> = ({ username }) => {
  const { colorMode } = useColorMode();
  const [packages, setPackages] = useState<Array<Package>>();
  const [fetchError, setFetchError] = useState<string>();

  const [color, setColor] = useState(colors['dark']);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[colorMode]);

  const GetNPMPackages = async (username) => {
    try {
      if (!username) {
        setFetchError('Required');
        return;
      }

      const result = await Axios.get(`/api/npm/remote`, {
        params: {
          username: username,
        },
      });

      if (result?.data?.error) {
        setFetchError(result?.data?.error);
        throw new Error(result?.data?.error);
      }

      setFetchError(null);

      if (result?.data?.length === 0) {
        setPackages([]);
      } else {
        console.log(result);

        setPackages(result?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!username) {
      return;
    }
    GetNPMPackages(username);
  }, [username]);

  useEffect(() => {
    setColor(colors[colorMode]);
    setBackgroundColor(backgroundColors[colorMode]);
  }, [colorMode]);

  return (
    <IntegrationWrapperCard icon={NPM} username={username} link={`https://www.npmjs.com/${username}`}>
      <Grid
        mt={2}
        gap={2}
        gridTemplateColumns={'repeat(auto-fit, 400px)'}
        maxH={'lg'}
        maxW={['xs', 'sm', 'md']}
        overflowY={'scroll'}
        borderRadius={'lg'}
      >
        {!!packages &&
          packages.map((packageInfo) => {
            return <NPMPackage key={packageInfo.name} packageInfo={packageInfo} />;
          })}
      </Grid>
    </IntegrationWrapperCard>
  );
};

export default NPMCard;
