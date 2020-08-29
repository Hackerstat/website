import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { SimpleGrid, Box, Flex, Text, Heading, Grid } from '@chakra-ui/core';
import UserCard from '../Components/Dashboard/UserCard';

import axios from 'axios';
import { useRouter } from 'next/router';
import Card from '../Components/Card';

const getUsers = async () => {
  const res = await axios.get('/api/batchusers');
  return res.data;
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
        <Grid
          flex={1}
          gridTemplateColumns={['repeat(auto-fit, 50%)', 'repeat(auto-fit, 220px)']}
          justifyItems={'stretch'}
        >
          {users.map((user) => {
            console.log(user);
            return (
              <UserCard
                key={user._id}
                photo={''}
                name={`Bobby Fisher`}
                username={user.username}
                status={'Alive'}
                onClick={() => {
                  router.push(`/${user.u}`);
                }}
              />
            );
          })}
        </Grid>
      </Flex>
    </PageBase>
  );
};

export default Dashboard;
