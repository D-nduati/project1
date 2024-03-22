import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbarmain.css';
import logo from "../HomePageAssets/Growwithchildlogo.png";
import profilepic from "../HomePageAssets/profilepic.jpg";

const Navbarmain = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav onMouseLeave={handleDropdownClose}>
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h5>Grow with child</h5>
      </div>
      <div className="dropdown" onMouseEnter={handleDropdownToggle}>
        <Link to="/home" className="dropdown-btn">Home</Link>
      </div>
      <div className="dropdown" onMouseEnter={handleDropdownToggle}>
        <Link to="/schedule" className="dropdown-btn">Schedules</Link>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/notify" className="dropdown-item">Notifications</Link>
            <Link to="/schedule" className="dropdown-item">Vaccine schedules</Link>
          </div>
        )}
      </div>

      <div className="dropdown" onMouseEnter={handleDropdownToggle}>
        <button className="dropdown-btn">Medical</button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/meetings" className="dropdown-item">MeetWithDoctor</Link>
            <Link to="/medicalrecords" className="dropdown-item">medicalrecords</Link>
            <Link to="/clinics" className="dropdown-item">clinics</Link>
          </div>
        )}
      </div>

      <div className="dropdown" onMouseEnter={handleDropdownToggle}>
        <Link to="/education" className="dropdown-item">For mothers</Link>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/education" className="dropdown-item">For mothers</Link>
            <Link to="/education" className="dropdown-item">For Fathers</Link>
          </div>
        )}
      </div>
      <div className="dropdown" onMouseEnter={handleDropdownToggle}>
        <Link to="/devmiles" className="dropdown-btn">Devmilestones</Link>
      </div>
      <div className="dropdown" onMouseEnter={handleDropdownToggle}>
        <Link to="/profile" className="dropdown-btn">Profile</Link>
      </div>
      <div className="user">
        <img src={profilepic} alt="user" />
        <h5><Link to="/myaccount"> My Account</Link></h5>
      </div>
    </nav>
  );
};

export default Navbarmain;
