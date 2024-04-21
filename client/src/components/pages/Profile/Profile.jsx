import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbarmain from "../../NavbarMain/Navbarmain";
import "./profile.css";
import Footer from "../footer/Footer";

function Profile() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://localhost:4040/profileroute/profile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setShowAlert(true);
        setTimeout(() => {
          navigate("/myaccount");
        }, 1000);
      } else {
        console.error("Failed to store data:", response.statusText);
        // Handle error or show error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error or show error message to the user
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <>
      <Navbarmain />
      <div className="profile-container">
        <form onSubmit={handleSubmit} className="profileForm" encType="multipart/form-data">
          <label htmlFor="name">Mother's Name</label>
          <input
            id="name"
            name="MotherName"
            placeholder="Enter your full name"
          />

          <label htmlFor="fatherName">Father's Name</label>
          <input
            id="fatherName"
            name="FatherName"
            placeholder="Enter father's name"
          />

          <label htmlFor="dateOfExpectancy">
            Provide below the date when you became expectant
          </label>
          <input
            id="dateOfExpectancy"
            name="DateOfExpectancy"
            type="date"
          />

          <label htmlFor="nameOfChild">Name of Child</label>
          <input
            id="nameOfChild"
            name="NameOfChild"
            placeholder="Enter the name of your child"
          />

          <label htmlFor="imageOfTheProfiler">
            Upload Your Profile Picture
          </label>
          <input
            id="imageOfTheProfiler"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {profilePicture && (
            <img
              id="profilePicturePreview"
              src={profilePicture}
              alt="Profile Preview"
            />
          )}

          <button type="submit">Submit</button>
        </form>
      </div>

      {showAlert && (
        <div className="modal">
          <div className="modal-content">
            <p>You are about to submit the details</p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
export default Profile;
