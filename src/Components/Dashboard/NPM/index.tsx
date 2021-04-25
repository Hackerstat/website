import React, { useState, useEffect, FunctionComponent } from 'react';
import Card from '../../Card';
import { Grid, useColorMode, Flex } from '@chakra-ui/core';
import NPMPackage from '../../NPMPackage';
import { Package } from '../../../pages/settings/integrations/add/NPM';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExternalLink from '../../ExternalLink';
import { faNpm } from '@fortawesome/free-brands-svg-icons';

interface NPMCardProps {
  username: string;
}

const colors = { light: 'gray.800', dark: 'white' };
const backgroundColors = { light: 'white', dark: 'gray.800' };

const NPMCard: FunctionComponent<NPMCardProps> = ({ username }) => {
  const { colorMode } = useColorMode();
  const [articles, setArticles] = useState([]);
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
    <Card borderRadius={'lg'} padding={2} minW={['sm', 'md']} maxW={'lg'} width={'100%'} mt={3} color={color}>
      <Flex alignItems={'center'} opacity={0.8}>
        <FontAwesomeIcon icon={faNpm} size={'1x'} color={color !== 'gray.800' ? color : 'black'} />
        <ExternalLink
          color={color}
          ml={2}
          href={`https://www.npmjs.com/${username}` || undefined}
          isDisabled={!username}
          fontWeight={'bold'}
        >
          {username || '_______'}
        </ExternalLink>
      </Flex>
      <Grid
        mt={2}
        gap={2}
        gridTemplateColumns={'repeat(auto-fit, 400px)'}
        maxH={'lg'}
        minW={'sm'}
        maxW={'lg'}
        overflowY={'scroll'}
        borderRadius={'lg'}
      >
        {!!packages &&
          packages.map((packageInfo) => {
            return <NPMPackage key={packageInfo.name} packageInfo={packageInfo} />;
          })}
      </Grid>
    </Card>
  );
};

export default NPMCard;
