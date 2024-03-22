import React, { useState } from 'react';
import { Box, Heading, Input, Button,  useToast } from '@chakra-ui/react';

const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async () => {
    if (!username || !newPassword || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'New password and confirm password do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4040/users/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          newpassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Password Changed',
          description: 'Your password has been successfully changed.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setUsername('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to change password.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} maxW="400px" mx="auto">
      <Heading mb={4}>Change Password</Heading>
      <Input
        placeholder="Username"
        mb={2}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="New Password"
        mb={2}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm New Password"
        mb={4}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button colorScheme="teal" isLoading={isLoading} onClick={handleSubmit}>
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePassword;
