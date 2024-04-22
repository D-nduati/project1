
import React, { useEffect, useState } from "react";
import { Box, Divider, Input, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 
import { useUser } from '../../userContext'; 

const initialLogin = {
  username: "",
  password: "",
};

const Login_page = () => {
  const [login, setLogin] = useState(initialLogin);
  const { setUsername } = useUser(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const handleLogin = async () => {
    if (login.username === "" || login.password === "") {
      toast.warning("Please enter all the fields"); 
      return;
    }
    try {
      const response = await fetch('http://localhost:4040/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json(); 
        setUsername(userData.username);
        console.log()
        
        if (userData.username=== "admin") {
          // Redirect to admin panel
          navigate("/admin");
        } else {
          // Redirect to regular user dashboard
          navigate("/home");
        }
        toast("Login successful");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or other issues
      toast.error("An error occurred while attempting to log in.");
    }
  };

  return (
    <Stack width={"100%"} textAlign="center" h={"100vh"} px={"3%"}>
      <Box mt="100px" mb="30px">
        <Text fontSize={"25px"}>Sign In</Text>
      </Box>
      <Box
        display={["block", "block", "flex", "flex", "flex"]}
        justifyContent="center"
        gap="10px"
      ></Box>
      <Box
        display={"flex"}
        justifyContent="center"
        px={["3%", "3%", "10%", "10%", "10%"]}
        alignItems={"center"}
      >
        <Divider />
        <Text px="10px" fontSize={"14px"} fontWeight="500">
          OR
        </Text>
        <Divider />
      </Box>
      <Box display={"flex"} justifyContent="center" alignItems="center">
        <Box w="350px">
          <form m="auto" mt={"20px"} borderRadius="1px" fontFamily={"sans-serif"}>
            <Input
              isRequired
              mb="20px"
              type="text"
              placeholder="Username"
              name="username"
              value={login.username}
              onChange={handleChange}
              required
            />
            <Input
              isRequired
              mb="20px"
              type="password"
              placeholder="Password"
              name="password"
              value={login.password}
              onChange={handleChange}
              required
            />

            <Input
              textAlign="center"
              w="350px"
              bgColor={"rgb(65,152,203)"}
              color="rgb(255 255 255)"
              _hover={{
                bgGradient: "linear(to right,rgb(48,179,205), rgb(63,154,203))",
                cursor: "pointer",
              }}
              onClick={handleLogin}
              value="Sign in"
              type="button" 
            />
          </form>
          <Text mt={"30px"}>
            Not signed up ?{" "}
            <Link style={{ color: "teal" }} to={"/signup"}>
              Sign up
            </Link>{" "}
          </Text>
          <Text mt={"30px"}>
            Forgot password ?{" "}
            <Link style={{ color: "teal" }} to={"/changepassword"}>
              Change password
            </Link>{" "}
          </Text>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login_page;
