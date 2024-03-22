import React from "react";
import { Routes, Route } from 'react-router-dom';
import Banner_homepage from '../components/pages/Lilhome/Home'
import Profile from '../components/pages/Profile/Profile';
import Schedule from '../components/pages/Schedule/Schedule';
import Devmiles from '../components/pages/Devmilestones/Devmiles';
import Login from '../components/authentication/login';
import SignUp from '../components/authentication/SignUp'
import MeetWithDoctor from "../components/pages/Medical/meetingswithdoctor";
import Abouts from "../components/pages/About/about";
import ChangePassword from "../components/authentication/ChangePassword";
import MyAccount from "../components/pages/Profile/MyAccount";
import Clinics from "../components/pages/Medical/clinics";
import MedicalRecords from "../components/pages/Medical/medicalrecords";
import Notifications from "../components/pages/Schedule/Notifications";
import EducationModule from "../components/pages/Educate/Educate";


const AllRoutes = () => {
  return (

    <div className="App">


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/home" element={<Banner_homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/notify" element={<Notifications />}/>
        <Route path="/devmiles" element={<Devmiles />} />
        <Route path="/education" element={<EducationModule />} />
        <Route path="/myaccount" element={<MyAccount />}/>
        <Route path="/meetings" element={<MeetWithDoctor />} />
        <Route path="/medicalrecords" element={<MedicalRecords />} />
        <Route path="/abouts" element={<Abouts />} />
        <Route path="/clinics" element={<Clinics />} />

      </Routes>
    </div>

  );
};

export default AllRoutes;
