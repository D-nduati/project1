import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbarmain.css';
import logo from "../HomePageAssets/Growwithchildlogo.png";
import profilepic from "../HomePageAssets/profilepic.jpg";

const Navbarmain = () => {

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };


  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h5>Grow with child</h5>
      </div>
      <div className="dropdown" onMouseEnter={onMouseEnter} onMouseLeave={() => setIsHomeDropdownOpen(false)}>
        <Link to="/home" className="dropdown-btn">Home</Link>
      </div>
      <div className="dropdown" onMouseEnter={handleScheduleDropdownToggle} onMouseLeave={() => setIsScheduleDropdownOpen(false)}>
        <Link to="/schedule" className="dropdown-btn">Schedules</Link>
        {isScheduleDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/notify" className="dropdown-item">Notifications</Link>
            <Link to="/schedule" className="dropdown-item">Vaccine schedules</Link>
          </div>
        )}
      </div>

      <div className="dropdown" onMouseEnter={handleMedicalDropdownToggle} onMouseLeave={() => setIsMedicalDropdownOpen(false)}>
        <button className="dropdown-btn">Medical</button>
        {isMedicalDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/meetings" className="dropdown-item">MeetWithDoctor</Link>
            <Link to="/medicalrecords" className="dropdown-item">medicalrecords</Link>
            <Link to="/clinics" className="dropdown-item">clinics</Link>
          </div>
        )}
      </div>

      <div className="dropdown" onMouseEnter={handleMothersDropdownToggle} onMouseLeave={() => setIsMothersDropdownOpen(false)}>
        <button className="dropdown-btn">For Parents</button>
        {isMothersDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/education" className="dropdown-item">For mothers</Link>
            <Link to="/education" className="dropdown-item">For Fathers</Link>
          </div>
        )}
      </div>
      <div className="dropdown">
        <Link to="/devmiles" className="dropdown-btn">Devmilestones</Link>
      </div>
      <div className="dropdown">
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

