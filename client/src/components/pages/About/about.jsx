import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Navbarmain from '../../NavbarMain/Navbarmain';
import Footer from '../footer/Footer'
const Abouts = () => {
  return (
    <>
      <Navbarmain />
      <Box p="4" maxW="800px" mx="auto" borderRadius="md" bg="white" boxShadow="md" mb="4">
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="teal">
          About Us
        </Text>
        <Text mb="4">
          As your child grows, so does our commitment to supporting you every
           step of the way. Our application is designed with love and care to
            assist you in creating a nurturing environment for your little one.
             Whether it's tracking developmental milestones, providing valuable 
             parenting tips, or simply being a virtual companion, "Grow with Child" 
             is here to make your parenting journey smoother and more delightful.
        </Text>
        <Text mb="4">
          Thank you for choosing us to be a part of your parenting adventure. We look forward to continuing this wonderful journey with you until your little one reaches the age of five and beyond!
        </Text>
      </Box>
      <Footer />
    </>
  );
};

export default Abouts;
