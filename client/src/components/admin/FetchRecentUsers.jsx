import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const RecentUsersTable = ({ recentUsers }) => {
  return (
    <Table variant="striped" colorScheme="teal" size="sm">
      <Thead>
        <Tr>
          <Th>UserID</Th>
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th>Username</Th>
          <Th>Email</Th>
          <Th>Date Created</Th>
        </Tr>
      </Thead>
      <Tbody>
        {recentUsers.map(user => (
          <Tr key={user.userid}>
            <Td>{user.userid}</Td>
            <Td>{user.fname}</Td>
            <Td>{user.lname}</Td>
            <Td>{user.username}</Td>
            <Td>{user.email}</Td>
            <Td>{user.datecreated}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RecentUsersTable;
