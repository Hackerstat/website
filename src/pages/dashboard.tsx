import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { SimpleGrid, Box, Flex, Text, Heading } from '@chakra-ui/core';
import UserCard from '../Components/Dashboard/UserCard';

import axios from 'axios';
import { useRouter } from 'next/router';
import Card from '../Components/Card';

const getUsers = async () => {
  return (await axios.get('/api/dashboard')).data;
};

const Dashboard: NextPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(({ users: fetchedUsers }) => {
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <PageBase>
      <Heading>Dashboard</Heading>
      <Flex flexDirection={'row'} flexWrap={'wrap'}>
        <Flex mr={3} width={'100%'} minW={'xs'} maxW={'md'} mb={3}>
          <Card height={'fit-content'} padding={3}>
            <Heading>Alerts</Heading>
            <Flex flexDirection={'column'} width={'100%'}>
              <Text color={'black'}>Ji</Text>
              <Text color={'black'}>Ji</Text>
              <Text color={'black'}>Ji</Text>
              <Text color={'black'}>Ji</Text>
              <Text color={'black'}>Ji</Text>
              <Text color={'black'}>Ji</Text>
              <Text color={'black'}>Ji</Text>
            </Flex>
          </Card>
        </Flex>
        <SimpleGrid minW={'lg'} minChildWidth="240px" spacing={3} flex={1} flexWrap={'wrap'}>
          {users.map((user) => {
            return (
              <UserCard
                key={user.u}
                photo={user.p}
                name={user.n}
                username={user.u}
                status={user.s}
                onClick={() => {
                  router.push(`/${user.u}`);
                }}
              />
            );
          })}
        </SimpleGrid>
      </Flex>
    </PageBase>
  );
};

export default Dashboard;