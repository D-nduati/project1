import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarmain from "../../NavbarMain/Navbarmain";
import { Link } from "react-router-dom";
import { useUser } from "../../../userContext"
import "./MyAccount.css";

const MyAccount = () => {
  const { username } = useUser();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Set username to local storage if provided by useUser context
    if (username) {
      localStorage.setItem('username', username);
    } else {
      // Fetch username from local storage if useUser is null
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setProfileData(storedUsername);
      }
    }
  }, [username]); // Update effect when username changes

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(`http://localhost:4040/profileroute/myaccount/${username}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (username) {
      fetchProfileData();
    }
  }, [username]); // Fetches profile data when username changes

  return (
    <>
      <Navbarmain />
      <div className="my-account-container">
        <h2>My Account</h2>
        {profileData ? (
          <div className="profile-details">
            <img src={profileData.profilePicture} alt="Profile" />
            <p><strong>Name:</strong> {profileData.MotherName}</p>
            <p><strong>Father's Name:</strong> {profileData.FatherName}</p>
            <p><strong>Date of Expectancy:</strong> {profileData.DateOfExpectancy}</p>
            <p><strong>Name of Child:</strong> {profileData.NameOfChild}</p>
            <a href={profileData.profilePicture} target="_blank" rel="noopener noreferrer">
              Profile Picture Link
            </a>
          </div>
        ) : (
          <p>Loading profile data...</p>
        )}
        <Link to="/profile">
          <button>Edit Profile</button>
        </Link>
      </div>
    </>
  );
};

export default MyAccount;
