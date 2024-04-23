import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import axios from 'axios';

const GenerateReport = () => {
  const [username, setUsername] = useState('');

  const generateReport = async () => {
    if (!username) {
      console.error('Please enter a username');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4040/admin/generateReport', { username }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const reportData = response.data;
        console.log(reportData);
      } else {
        console.error('Failed to generate report');
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="username">Enter Username:</FormLabel>
        <Input type="text" id="username" value={username} onChange={handleInputChange} />
      </FormControl>
      <Button colorScheme="blue" onClick={generateReport}>
        Generate Report
      </Button>
    </>
  );
};

export default GenerateReport;
