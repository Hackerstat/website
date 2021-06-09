import React, { FunctionComponent, useState } from 'react';
import { faSchool, faEnvelope, faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Text, Flex, Skeleton, Box, BoxProps, Stack, Divider } from '@chakra-ui/react';
import ExternalLink from '../../ExternalLink';
import Card from '../../Card';

interface UserProfileInfoCardProps extends BoxProps {
  name: string;
  username: string;
  photo: string;
  status?: string;
  bio: string;
  website: string;
  email: string;
  school: string;
  location: string;
}

const colors = { light: 'gray.800', dark: 'white' };

/**
 * {!!email && (
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Icon color={color} name={'email'} />
          <ExternalLink ml={1} href={`mailto:${email}`}>
            <Text color={color}>{email}</Text>
          </ExternalLink>
        </Flex>
      )}
      {!!school && (
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Icon color={color} name={'info'} />
          <Text color={color} ml={1}>
            {school}
          </Text>
        </Flex>
      )}
      {!!location && (
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Icon color={color} name={'info'} />
          <Text color={color} ml={1}>
            {location}
          </Text>
        </Flex>
      )}
      {!!website && (
        <Flex flexDirection={'row'} alignItems={'center'}>
          <Icon color={color} name={'link'} />
          <ExternalLink ml={1} href={website}>
            <Text color={color}>{website}</Text>
          </ExternalLink>
        </Flex>
      )}
 */

const UserProfileInfoCard: FunctionComponent<Partial<UserProfileInfoCardProps>> = ({
  name,
  username,
  photo,
  bio,
  website,
  email,
  school,
  location,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [color, setColor] = useState(colors['dark']);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <Skeleton isLoaded={loaded}>
      <Card height="100%" p={1} px={4} {...rest} borderRadius={5} maxW={['sm', 'md', 'lg']}>
        <Flex alignItems={'center'} flexDirection={'row'} justifyContent={'flex-start'}>
          <Avatar mt={4} name={name} size={'2xl'} src={photo} onLoad={onLoad} mr={2} />
          <Box>
            <Text
              overflow={'hidden'}
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
              overflow={'hidden'}
              noOfLines={1}
              mt={-1}
              textTransform={'uppercase'}
              fontWeight={'bold'}
              letterSpacing={'wide'}
              color={color}
              fontSize={['sm', 'md', 'lg']}
            >
              {name}
            </Text>
          </Box>
        </Flex>
        <Box mt={2}>
          {/* <Text
            textTransform={'uppercase'}
            fontWeight={'bold'}
            letterSpacing={'wide'}
            color={color}
            fontSize={['sm', 'md', 'lg']}
          >
            {name}
          </Text> */}
          {!!email && (
            <>
              <Flex my={2}>
                <Stack isInline align={'center'} spacing={2}>
                  <Box w={7}>
                    <FontAwesomeIcon icon={faEnvelope} size={'1x'} color={color !== 'gray.800' ? color : 'black'} />
                  </Box>
                  <ExternalLink ml={1} href={`mailto:${email}`}>
                    <Text noOfLines={1} color={color}>
                      {email}
                    </Text>
                  </ExternalLink>
                </Stack>
              </Flex>
              <Divider />
            </>
          )}
          {!!school && (
            <>
              <Flex my={2}>
                <Stack isInline align={'center'} spacing={2}>
                  <Box w={7}>
                    <FontAwesomeIcon icon={faSchool} size={'1x'} color={color !== 'gray.800' ? color : 'black'} />
                  </Box>
                  <Text noOfLines={1} color={color}>
                    {school}
                  </Text>
                </Stack>
              </Flex>
              <Divider />
            </>
          )}
          {!!location && (
            <>
              <Flex my={2}>
                <Stack isInline align={'center'} spacing={2}>
                  <Box w={7}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} size={'1x'} color={color !== 'gray.800' ? color : 'black'} />
                  </Box>
                  <Text noOfLines={1} color={color}>
                    {location}
                  </Text>
                </Stack>
              </Flex>
              <Divider />
            </>
          )}
          {!!website && (
            <>
              <Flex my={2}>
                <Stack isInline align={'center'} spacing={2}>
                  <Box w={7}>
                    <FontAwesomeIcon icon={faInfoCircle} size={'1x'} color={color !== 'gray.800' ? color : 'black'} />
                  </Box>
                  <Text noOfLines={1} color={color}>
                    {website}
                  </Text>
                </Stack>
              </Flex>
              <Divider />
            </>
          )}
          {!!bio && (
            <>
              <Flex my={2}>
                <Stack isInline align={'center'} spacing={2}>
                  <Box w={7}>
                    <Text color={color}>Bio:</Text>
                  </Box>
                  <Text color={color}>{bio}</Text>
                </Stack>
              </Flex>
            </>
          )}
        </Box>
      </Card>
    </Skeleton>
  );
};

export default UserProfileInfoCard;
