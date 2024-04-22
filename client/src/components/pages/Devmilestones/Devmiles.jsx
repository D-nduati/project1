import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Box, Text, Checkbox, VStack } from '@chakra-ui/react';
import Navbarmain from '../../NavbarMain/Navbarmain';
import Footer from '../footer/Footer';
import axios from 'axios';

import{useUser} from "../../../userContext"

const DevelopmentMilestones = () => {
    const { username } = useUser();
    console.log(username)
    const [checklist, setChecklist] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchChecklist = async () => {
            try {
                const response = await axios.get(`http://localhost:4040/devmiles/devmilestones`);
                console.log(response.data)
                setChecklist(response.data.milestones.map(item => ({
                    ...item,
                    checked: item.checkedState === 1 // Set checked based on checkedState
                })));
                setLoaded(true);
            } catch (error) {
                console.error('Error fetching checklist data:', error);
            }
        };

        fetchChecklist();
    }, [username]); // Fetch checklist when username changes

    const handleCheckboxChange = async (itemId) => {
        try {
            const updatedChecklist = checklist.map(item => {
                if (item.itemId === itemId) {
                    const updatedItem = { ...item, checked: !item.checked }; // Toggle checked state
                    // Update the checked state in the database
                    axios.put(`http://localhost:4040/devmiles/devmilestones/updateChecklistItem/${itemId}`, { checked: updatedItem.checked ? 1 : 0 });
                    return updatedItem;
                }
                return item;
            });
            setChecklist(updatedChecklist);
        } catch (error) {
            console.error('Error updating checklist item:', error);
        }
    };

    return (
        <>
            <Navbarmain />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -20 }}
                transition={{ duration: 0.5 }}
            >
                <Box p="4" maxW="800px" mx="auto" borderRadius="md" bg="white" boxShadow="md" mb="4">
                    <Text fontSize="2xl" fontWeight="bold" mb="4">
                        Development Milestones
                    </Text>
                    <Text mb="4">
                        Here are some development milestones and checklists:
                    </Text>

                    <VStack align="start" spacing="2">
                        {checklist.map((item) => (
                            <motion.div
                                key={item.itemId}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Checkbox
                                    isChecked={item.checked}
                                    onChange={() => handleCheckboxChange(item.itemId)}
                                    colorScheme="teal"
                                >
                                    {item.category}: {item.actualitem}
                                </Checkbox>
                            </motion.div>
                        ))}
                    </VStack>
                </Box>
            </motion.div>
            <Footer />
        </>
    );
};

export default DevelopmentMilestones;

