import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import PageBase from '../Components/Page';
import { Flex, Heading, Grid } from '@chakra-ui/react';
import UserCard from '../Components/Dashboard/UserCard';

import axios from 'axios';
import { useRouter } from 'next/router';

const getUsers = async () => {
  const res = await axios.get('/api/batchusers');
  return res.data;
};

/**
 * @name Dashboard
 * @description This component is the page that shows all HackerStat users.
 * @author @LouisIV
 * @returns {NextPage}
 */
const Dashboard: NextPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(({ users: fetchedUsers }) => {
        console.log(fetchedUsers);
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <PageBase>
      <Heading my={4}>Dashboard</Heading>
      <Flex flexDirection={'row'} flexWrap={'wrap'}>
        <Grid
          flex={1}
          gridGap={8}
          gridTemplateColumns={['repeat(1, 220px)', 'repeat(2, 220px)', 'repeat(5, 220px)']}
          justifyItems={'stretch'}
        >
          {!!users &&
            users.map((user) => {
              return (
                <UserCard
                  py={8}
                  key={user._id}
                  photo={user?.picture}
                  name={`${user?.info?.firstName || ''} ${user?.info?.lastName || ''}`}
                  username={user.username}
                  onClick={() => {
                    router.push(`/${user.username}`);
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
