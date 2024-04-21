import React, { useState, useEffect, useContext } from 'react';
import{useUser} from '../../../userContext' // Import your UserContext
import axios from 'axios';
import Navbarmain from '../../NavbarMain/Navbarmain';


const Notifications = () => {
  const { username } = useUser();
  const [pregnancyDate, setPregnancyDate] = useState('');
  const [notifications, setNotifications] = useState([]);
console.log(username)
  useEffect(() => {
    // Fetch pregnancy date from the database
    const fetchPregnancyDate = async () => {
      try {
        const response = await axios.get(`http://localhost:4040/notify/profile/${username}`);
        setPregnancyDate(response.data.dateOfExpectancy);
        console.log(username)
      } catch (error) {
        console.error('Error fetching pregnancy date:', error);
      }
    };

    // Fetch notifications from development milestones
    const fetchDevelopmentMilestonesNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:4040/notify/devMilestones', {
          params: { pregnancyDate, username }
        });
        setNotifications(prevNotifications => [
          ...prevNotifications,
          ...response.data.notifications
        ]);
      } catch (error) {
        console.error('Error fetching development milestones notifications:', error);
      }
    };

    // Fetch notifications from clinics
   

    fetchPregnancyDate();
    fetchDevelopmentMilestonesNotifications();
   
  }, [username]); 

  return (
    <div>
      <Navbarmain />
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
