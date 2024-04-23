import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel,useToast } from "@chakra-ui/react";


const GenerateReport = () => {
  const [username, setUsername] = useState('');
  const toast = useToast();
  const generateReport = async () => {
    if (!username) {
      toast.error('Please enter a username');
      return;
    }

    try {
      const response = await fetch('http://localhost:4040/admin/generateReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        const reportData = await response.json();
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
