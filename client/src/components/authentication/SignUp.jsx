import React, { useEffect, useState } from "react";
import "./signUp.css";
import axios from "axios";
import {
  Box,
  Divider,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";

const initialValue = {
  fname: "",
  lname: "",
  email: "",
  username: "",
  password: "",
};

const Sign_Up_page = () => {
  const [user, setUser] = useState(initialValue);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SignUp Page";
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      user.fname === "" ||
      user.lname === "" ||
      user.email === "" ||
      user.password === "" ||
      user.username === ""
    ) {
      return toast({
        title: "Empty Field.",
        description: "Please enter all the fields.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        const res = await axios.post("http://localhost:4040/users/signup", user);
        if (res.status === 201) {
          navigate("/"); // Redirect to home page on successful signup
          toast({
            title: "Signup Successful",
            description: "You have successfully signed up.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Signup Failed",
          description: "Please try again later.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <VStack spacing={8} alignItems="flex-start">
      <Box>
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
          Sign Up
        </Text>
        <Divider />
      </Box>
      <form onSubmit={handleSignup}>
        <Stack spacing={4}>
          <Input
            type="text"
            name="fname"
            placeholder="First Name"
            value={user.fname}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={user.lname}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </Stack>
      </form>
       <VStack pt="100px" pb="100px"> <Text color="rgb(123,127,146)"> Already a member?{" "} <Link to={"/"}> <span className="signUp\_page\_signin\_link">Sign In</span> </Link>{" "} </Text> </VStack> </VStack>)

    
    
  
};

export default Sign_Up_page;
