import React, { useState, useEffect, FunctionComponent } from 'react';
import { Box, Text, Stack, useColorMode, BoxProps, Skeleton } from '@chakra-ui/react';
import Axios from 'axios';
import IntegrationWrapperCard from '../IntegrationWrapperCard';
import { IntegrationTypes } from '../../../types';

interface MediumCardProps extends BoxProps {
  user: string;
  verified: boolean;
}
interface FeatureProps extends BoxProps {
  color: string;
  title: string;
  date: string;
  link: string;
}

/**
 * @name Feature
 * @description It is a component that displays the title and date of a Medium Article that is wrapped in a link to the article.
 * @author @Cgunter1
 * @param {FeatureProps} props It is the prop object of the component.
 * @param {string} props.color It is the font color of the Medium Article.
 * @param {string} props.title It is the title of the Medium Article.
 * @param {string} props.date It is the published date of the Medium Article.
 * @param {string} props.link It is the URL link to the Medium Article.
 * @param {string} props.rest It is the rest of the BoxProps props to include for the outermost Box attributes (i.e. width, height, etc).
 * @returns {FunctionComponent<FeatureProps>}
 */
const Feature: FunctionComponent<FeatureProps> = ({ color, title, date, link, ...rest }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Box
        _hover={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filter: 'brightness(120%)',
        }}
        transition={'all .1s'}
        p={2}
        shadow="md"
        borderWidth="1px"
        borderRadius={'lg'}
        {...rest}
      >
        <Text color={color} fontSize={['sm', 'md', 'lg']}>
          {title}
        </Text>
        <Text color={color} fontSize={'xs'} opacity={0.5} mt={2}>
          {date}
        </Text>
      </Box>
    </a>
  );
};

const colors = { light: 'gray.800', dark: 'white' };
const backgroundColors = { light: 'white', dark: 'gray.800' };

/**
 * @name MediumCard
 * @description It is a component that displays on a user's profile to show their Medium articles.
 * @author @LouisIV @compile10
 * @param {MediumCardProps} props It is the prop object of the component.
 * @param {string} props.user It is the Medium username of the HackerStat user.
 * @param {boolean} props.verified It is the boolean value that determines if the Medium Account is verified to belong to the HackerStat user.
 * @param {string} props.rest It is the rest of the BoxProps props to include for the outermost Box attributes (i.e. width, height, etc).
 * @returns {FunctionComponent<MediumCardProps>}
 */
const MediumCard: FunctionComponent<MediumCardProps> = ({ user, verified, ...rest }) => {
  const { colorMode } = useColorMode();
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);

  const [color, setColor] = useState(colors['dark']);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[colorMode]);

  useEffect(() => {
    setColor(colors[colorMode]);
    setBackgroundColor(backgroundColors[colorMode]);
  }, [colorMode]);

  useEffect(() => {
    if (!user) {
      return;
    }

    Axios.get('/api/medium/fetchArticles', {
      params: {
        user: user,
      },
    })
      .then(function (response) {
        setArticles(response.data.articles);
        setisLoaded(true);
      })
      .catch(function (error) {
        console.error(error);
        setError(true);
      });
  }, [user]);

  return (
    <>
      {!error ? (
        <IntegrationWrapperCard
          {...rest}
          icon={IntegrationTypes.MEDIUM}
          link={`https://www.medium.com/${user}`}
          username={user}
          verified={verified}
        >
          <Skeleton isLoaded={isLoaded}>
            <Stack spacing={2} mt={2} maxH={'lg'} overflowY={'scroll'} borderRadius={'lg'}>
              {!!articles &&
                articles.map((item, index) => (
                  <Feature
                    backgroundColor={backgroundColor}
                    color={color}
                    title={item.title}
                    date={item.date}
                    link={item.link}
                    key={index}
                  />
                ))}
            </Stack>
          </Skeleton>
        </IntegrationWrapperCard>
      ) : (
        <></>
      )}
    </>
  );
};

export default MediumCard;
