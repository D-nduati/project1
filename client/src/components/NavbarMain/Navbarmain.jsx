import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import Dropdown from './Dropdown';
import Dropdownmedi from './Dropdownmedi';
import logo from "../HomePageAssets/Growwithchildlogo.png";
import profilepic from "../HomePageAssets/profilepic.jpg";

function Navbarmain() {

  const [click, setClick] = useState(false);
  const [dropdowni, setDropdowni] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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

  const onMouseEnteri = () => {
    if (window.innerWidth < 960) {
      setDropdowni(false);
    } else {
      setDropdowni(true);
    }
  };

  const onMouseLeavei = () => {
    if (window.innerWidth < 960) {
      setDropdowni(false);
    } else {
      setDropdowni(false);
    }
  };
  return (
    <>
      <nav className="navbar">
        <Link to='/home' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={logo} alt="Logo" />
          <h5>Grow with child</h5>
        </Link>

        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/home'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Schedules
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnteri}
            onMouseLeave={onMouseLeavei}
          >
            <Link
              to='/meetings'
              className='nav-links'
              onClick={closeMobileMenu}
            >
             Medical
            </Link>
            {dropdowni && <Dropdownmedi />}
          </li>
          <li className='nav-item'>
            <Link
             to="/devmiles"
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Devmilestones
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to="/profile"
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          </li>
         
          
        <Link
         to="/myaccount"
         className='navbar-acc' onClick={closeMobileMenu}
         >      
         <img src={profilepic} alt="user" />
         <h5>My Account</h5>
         </Link>
         






        </ul>

      </nav>

    </>
  )
}

export default Navbarmain