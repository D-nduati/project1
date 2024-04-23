import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import logo from "../HomePageAssets/Growwithchildlogo.png";
import './admin.css';
import GenerateReport from './GenerateReport'; // Import the GenerateReport component

const AdminPanel = () => {
  const [recentUsers, setRecentUsers] = useState([]);

  const fetchRecentUsers = async () => {
    try {
      const response = await fetch('http://localhost:4040/admin/recentUsers');
      if (response.ok) {
        const users = await response.json();
        setRecentUsers(users.data);
      } else {
        console.error('Failed to fetch recent users');
      }
    } catch (error) {
      console.error('Error fetching recent users:', error);
    }
  };

  return (
    <Box p={4}>
      <nav className="navbar">
        <div  className='navbar-logo' >
          <img src={logo} alt="Logo" />
          <h5>Grow with child ADMIN</h5>
        </div>
      </nav>
      <Button colorScheme="teal" onClick={fetchRecentUsers}>
        Fetch Recent Users
      </Button>
      {recentUsers.length > 0 && (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>User ID</Th>
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
      )}
      <GenerateReport /> 
    </Box>
  );
};

export default AdminPanel;
