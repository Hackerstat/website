import React, { useState, useEffect, FunctionComponent } from 'react';
import { Grid, Skeleton, useColorMode } from '@chakra-ui/react';
import NPMPackage from '../../NPMPackage';
import { Package } from '../../../pages/settings/integrations/add/NPM';
import Axios from 'axios';
import { NPM } from '../../../utils/constants';
import IntegrationWrapperCard from '../IntegrationWrapperCard';

interface NPMCardProps {
  username: string;
  verified: boolean;
}

const colors = { light: 'gray.800', dark: 'white' };
const backgroundColors = { light: 'white', dark: 'gray.800' };

/**
 * @name NPMCard
 * @description It is a component that displays on a user's profile to show their NPM packages and daily downloads.
 * @author @LouisIV
 * @param {MediumCardProps} props It is the prop object of the component.
 * @param {string} props.username It is the NPM username of the HackerStat user.
 * @param {boolean} props.verified It is the boolean value that shows if the NPM account displayed has already been verified to belong to the HackerStat user.
 * @returns {FunctionComponent<NPMCardProps>}
 */
const NPMCard: FunctionComponent<NPMCardProps> = ({ verified, username }) => {
  const { colorMode } = useColorMode();
  const [packages, setPackages] = useState<Array<Package>>();
  const [error, setError] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  const [color, setColor] = useState(colors[colorMode]);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[colorMode]);

  const GetNPMPackages = async (username: string) => {
    try {
      if (!username) {
        setError('Required');
        return;
      }

      const result = await Axios.get(`/api/npm/remote`, {
        params: {
          username: username,
        },
      });

      if (result?.data?.error) {
        setError(result?.data?.error);
        throw new Error(result?.data?.error);
      }

      setError(null);

      if (result?.data?.length === 0) {
        setPackages([]);
      } else {
        console.log(result);

        setPackages(result?.data);
      }
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
      setError(err);
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
    <>
      {!error ? (
        <IntegrationWrapperCard
          verified={verified}
          pr={-3}
          icon={NPM}
          username={username}
          link={`https://www.npmjs.com/${username}`}
        >
          <Skeleton isLoaded={isLoaded}>
            <Grid
              mt={2}
              gap={2}
              gridTemplateColumns={'repeat(auto-fit, 400px)'}
              maxH={'lg'}
              maxW={['xs', 'sm', 'md']}
              overflowY={'scroll'}
              overflowX={'hidden'}
              borderRadius={'lg'}
            >
              {!!packages &&
                packages.map((packageInfo) => {
                  return <NPMPackage key={packageInfo.name} packageInfo={packageInfo} />;
                })}
            </Grid>
          </Skeleton>
        </IntegrationWrapperCard>
      ) : (
        <></>
      )}
    </>
  );
};

export default NPMCard;
