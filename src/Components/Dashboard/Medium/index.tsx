import React, { useState, useEffect } from 'react';
import { Heading, Box, Text, Stack, Flex, useColorMode } from '@chakra-ui/react';
import Card from '../../Card';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
import ExternalLink from '../../ExternalLink';

function Feature({ color, title, date, link, ...rest }) {
  return (
    <ExternalLink href={link}>
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
        <Text color={color}>{title}</Text>
        <Text color={color} fontSize={'xs'} opacity={0.5} mt={2}>
          {date}
        </Text>
      </Box>
    </ExternalLink>
  );
}

const colors = { light: 'gray.800', dark: 'white' };
const backgroundColors = { light: 'white', dark: 'gray.800' };

const MediumCard = ({ user, ...rest }) => {
  const { colorMode } = useColorMode();
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

    Axios.get('/api/Medium/fetchArticles', {
      params: {
        user: user,
      },
    }).then(function (response) {
      setArticles(response.data.articles);
    });
  }, [user]);

  return (
    <Card mt={3} borderRadius={'lg'} padding={2} maxW={'lg'} minW={['sm', 'md', 'lg']} {...rest}>
      <Flex alignItems={'center'} opacity={0.8}>
        <FontAwesomeIcon icon={faMedium} size={'1x'} color={color !== 'gray.800' ? color : 'black'} />
        <ExternalLink
          color={color}
          ml={2}
          href={`https://www.medium.com/${user}` || undefined}
          // isDisabled={!user}
          fontWeight={'bold'}
        >
          {user || '_______'}
        </ExternalLink>
      </Flex>
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
    </Card>
  );
};

export default MediumCard;
