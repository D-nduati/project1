// const express = require('express');
// const app = express();
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');


// const { profileroute } = require('./routescontrollers/profilerouter');
// const { usersroute } = require('./routescontrollers/usersroutes');
// const { devmilesroute } = require('./routescontrollers/devmilesroutes');
// const { notify } = require('./routescontrollers/notificationsrouter');
// const router = require('./routescontrollers/medicalroutes');
// const {adminroute}= require('./routescontrollers/adminroutes')
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
//   try {
//     const decoded = jwt.verify(token, 'your_secret_key');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };
// // Admin-only route example
// app.get('/admin/dashboard', verifyToken, (req, res) => {
//   if (!req.user.isAdmin) {
//     return res.status(403).json({ error: 'Access denied' });
//   }
//   // If user is admin, serve admin dashboard
//   res.json({ message: 'Admin dashboard' });
// });

// // Other routes
// app.use('/users', usersroute);
// app.use('/profileroute', profileroute);
// app.use('/devmiles', devmilesroute);
// app.use('/notify', notify);
// app.use('/api', router);
// app.use('/admin', adminroute);


// // File upload route
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Save files to the uploads directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use original file name
//   }
// });
// const upload = multer({ storage: storage });
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }
//   res.status(200).json({ message: 'File uploaded successfully' });
// });

// const port = 4040;
// app.listen(port, () => console.log(`Server started on port ${port}`));


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbarmain from "../../NavbarMain/Navbarmain";
import "./profile.css";
import Footer from "../footer/Footer";

function Profile() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
        const errorMessage = await response.text(); // Get error message from response
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while processing your request. Please try again later.");
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
          <label htmlFor="MotherName">Mother's Name</label>
          <input
            id="MotherName"
            name="MotherName"
            placeholder="Enter your full name"
          />

          <label htmlFor="FatherName">Father's Name</label>
          <input
            id="FatherName"
            name="FatherName"
            placeholder="Enter father's name"
          />

          <label htmlFor="DateOfExpectancy">
            Provide below the date when you became expectant
          </label>
          <input
            id="DateOfExpectancy"
            name="DateOfExpectancy"
            type="date"
          />

          <label htmlFor="NameOfChild">Name of Child</label>
          <input
            id="NameOfChild"
            name="NameOfChild"
            placeholder="Enter the name of your child"
          />

          <label htmlFor="ProfilePictureURL">
            Upload Your Profile Picture
          </label>
          <input
            id="ProfilePictureURL"
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
