import * as React from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Heading, Stack, Box, Text, Flex, Avatar, Button } from '@chakra-ui/core';
import WakaTime from '../Components/Dashboard/WakaTime/index';

const IndexPage: NextPage = () => (
  <PageBase>
    <Stack shouldWrapChildren alignItems={'center'} spacing={32}>
      {/* INTEGRATIONS */}
      <Flex flexWrap={'wrap-reverse'}>
        <Box width={'100%'} minW={'xs'} maxW={'lg'} alignSelf={'center'} justifySelf={'center'} mr={3}>
          <Heading display={'flex'} fontSize={'5xl'} justifySelf={'flex-start'} mb={2}>
            Show Off More than Just Your GitHub
          </Heading>
          <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
          </Text>
          <Button mt={3} variant={'solid'} variantColor={'green'}>
            See Integrations
          </Button>
        </Box>
        <Stack
          spacing={3}
          shouldWrapChildren
          isInline
          flexWrap={'wrap'}
          maxW={['100%', '100%', '250px']}
          width={'100%'}
        >
          <Box height={'100px'} width={'100px'} bg={'salmon'}></Box>
          <Box height={'100px'} width={'100px'} bg={'salmon'}></Box>
          <Box height={'100px'} width={'100px'} bg={'salmon'}></Box>
          <Box height={'100px'} width={'100px'} bg={'salmon'}></Box>
          <Box height={'100px'} width={'100px'} bg={'salmon'}></Box>
          <Box height={'100px'} width={'100px'}>
            <Flex justifyContent={'center'} alignItems={'center'} flex={1} height={'100%'} width={'100%'}>
              <Text fontSize={'3xl'} fontWeight={'bold'} letterSpacing={'wide'} fontFamily={'mono'}>
                +7
              </Text>
            </Flex>
          </Box>
        </Stack>
      </Flex>
      <Flex flexWrap={'wrap'}>
        <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} padding={4}>
          <Heading display={'flex'} fontSize={'3xl'} textAlign={'center'} mb={4}>
            1,233,524 Hackers and Growing!
          </Heading>
          <Stack spacing={3} shouldWrapChildren isInline flexWrap={'wrap'}>
            <Avatar size={'xl'} />
            <Avatar size={'xl'} />
            <Avatar size={'xl'} />
            <Avatar size={'xl'} />
            <Avatar size={'xl'} />
          </Stack>
        </Flex>
        <Box width={'100%'} minW={'xs'} maxW={'lg'} alignSelf={'center'} justifySelf={'center'}>
          <Heading display={'flex'} fontSize={'5xl'} justifySelf={'flex-start'} mb={2}>
            Find Your Community
          </Heading>
          <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
          </Text>
          <Button mt={3} variant={'solid'} variantColor={'green'}>
            Explore HackerStat
          </Button>
        </Box>
      </Flex>
    </Stack>
  </PageBase>
);

export default IndexPage;
