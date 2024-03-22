import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarmain from "../../NavbarMain/Navbarmain";
import { Link } from "react-router-dom";
import{useUser} from "../../../userContext"
//import Footer from './Footer'
import "./MyAccount.css";

const MyAccount = () => {
  const { username } = useUser();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost/:4040/profileroute/myaccount/${username}`);
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
            <p><strong>Name:</strong> {profileData.mothername}</p>
            <p><strong>Father's Name:</strong> {profileData.fathername}</p>
            <p><strong>Date of Expectancy:</strong> {profileData.dateofexpectancy}</p>
            <p><strong>Name of Child:</strong> {profileData.nameofchild}</p>
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

