import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarmain from '../../NavbarMain/Navbarmain';
import { useUser } from '../../../userContext';

const Notifications = () => {
  const { username } = useUser();
  const [pregnancyDate, setPregnancyDate] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPregnancyDate = async () => {
      try {
        const response = await axios.get(`http://localhost:4040/notify/profile/${username}`);
        setPregnancyDate(response.data.dateOfExpectancy);
      } catch (error) {
        console.error('Error fetching pregnancy date:', error);
      }
    };

    const fetchDevelopmentMilestonesNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:4040/notify/devMilestones', {
          params: { pregnancyDate, username }
        });
        setNotifications(response.data.returndata);
      } catch (error) {
        console.error('Error fetching development milestones notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPregnancyDate();
    fetchDevelopmentMilestonesNotifications();
  }, [username, pregnancyDate]);

  return (
    <div>
      <Navbarmain />
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {notifications.length === 0 ? (
            <li>No notifications</li>
          ) : (
            notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
