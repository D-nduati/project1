import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbarmain from "../../NavbarMain/Navbarmain";
import "./profile.css";
import Footer from "../footer/Footer";
import axios from 'axios'; // Import axios
import { useUser } from "../../../userContext";

function Profile() {
  const { username } = useUser();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      MotherName: event.target.MotherName.value,
      FatherName: event.target.FatherName.value,
      DateOfExpectancy: event.target.DateOfExpectancy.value,
      NameOfChild: event.target.NameOfChild.value,
      username: username
    };

    try {
      const response = await axios.post(`http://localhost:4040/profileroute/profile/${username}`, formData);

      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          navigate("/myaccount");
        }, 1000);
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while processing your request. Please try again later.");
    }
  };

  return (
    <>
      <Navbarmain />
      <div className="profile-container">
        <form onSubmit={handleSubmit} className="profileForm">
          <label htmlFor="MotherName">Mother's Name</label>
          <input
            id="MotherName"
            name="MotherName"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="FatherName">Father's Name</label>
          <input
            id="FatherName"
            name="FatherName"
            placeholder="Enter father's name"
            required
          />

          <label htmlFor="DateOfExpectancy">
            Provide below the date when you became expectant
          </label>
          <input
            id="DateOfExpectancy"
            name="DateOfExpectancy"
            type="date"
            required
          />

          <label htmlFor="NameOfChild">Name of Child</label>
          <input
            id="NameOfChild"
            name="NameOfChild"
            placeholder="Enter the name of your child"
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      {showAlert && (
        <div className="modal">
          <div className="modal-content">
            <p>You have successfully submitted your details.</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Profile;
