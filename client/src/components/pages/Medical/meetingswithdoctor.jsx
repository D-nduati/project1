// import React, { useState } from 'react';
// import './meetingswithdoctor.css'
// import Navbarmain from '../../NavbarMain/Navbarmain';
// import Footer from '../footer/Footer';
// const MeetWithDoctor = () => {
//   const initialRows = 13; 

//   // Move the function declaration above its usage
//   const createEmptyAppointment = (index) => {
//     const currentDate = new Date();
//     const newDate = new Date(currentDate);
//     newDate.setDate(currentDate.getDate() + index); // Increment date based on the index
//     const formattedDate = newDate.toISOString().split('T')[0];
  
//     return {
//       id: index,
//       date: formattedDate,
//       notes: '',
//       prescription: '',
//       physician: '',
//       contact: '',
//     };
//   };

//   const [appointments, setAppointments] = useState(
//     Array.from({ length: initialRows }, (_, index) => createEmptyAppointment(index))
//   );

//   const handleAddAppointment = () => {
//     setAppointments((prevAppointments) => [
//       ...prevAppointments,
//       createEmptyAppointment(prevAppointments.length),
//     ]);
//   };

//   const handleEdit = (id, field, value) => {
//     setAppointments((prevAppointments) =>
//       prevAppointments.map((appointment) =>
//         appointment.id === id ? { ...appointment, [field]: value } : appointment
//       )
//     );
//   };

//   return (
//     <div className="meet-with-doctor">
//       <Navbarmain/>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Doctor's Notes</th>
//             <th>Prescription/Tests Prescribed</th>
//             <th>Physician's Name & Contacts</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map((appointment) => (
//             <tr key={appointment.id}>
//               <td>{appointment.date}</td>
//               <td
//                 contentEditable
//                 onBlur={(e) => handleEdit(appointment.id, 'notes', e.target.innerText)}
//               >
//                 {appointment.notes}
//               </td>
//               <td
//                 contentEditable
//                 onBlur={(e) => handleEdit(appointment.id, 'prescription', e.target.innerText)}
//               >
//                 {appointment.prescription}
//               </td>
//               <td
//                 contentEditable
//                 onBlur={(e) => handleEdit(appointment.id, 'physician', e.target.innerText)}
//               >
//                 {appointment.physician}
//                 <br />
//                 {appointment.contact}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button onClick={handleAddAppointment}>Add Appointment</button>
//       <Footer/>
//     </div>
//   );
// };

// export default MeetWithDoctor;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './meetingswithdoctor.css';
import Navbarmain from '../../NavbarMain/Navbarmain';
import Footer from '../footer/Footer';

const MeetWithDoctor = () => {
  const [appointments, setAppointments] = useState([]);
  const initialRows = 13;

  useEffect(() => {
    // Fetch appointments data from the backend when the component mounts
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get('/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  };

  const createEmptyAppointment = (index) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + index); // Increment date based on the index
    const formattedDate = newDate.toISOString().split('T')[0];

    return {
      id: index,
      date: formattedDate,
      notes: '',
      prescription: '',
      physician: '',
      contact: '',
    };
  };

  const handleAddAppointment = () => {
    axios.post('/api/appointments', createEmptyAppointment(appointments.length))
      .then(response => {
        fetchAppointments(); // Fetch updated appointments after adding
      })
      .catch(error => {
        console.error('Error adding appointment:', error);
      });
  };

  const handleEdit = (id, field, value) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, [field]: value } : appointment
    );

    setAppointments(updatedAppointments);

    // Update appointment on the server
    axios.put(`/api/appointments/${id}`, { [field]: value })
      .catch(error => {
        console.error('Error updating appointment:', error);
      });
  };

  return (
    <div className="meet-with-doctor">
      <Navbarmain />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Doctor's Notes</th>
            <th>Prescription/Tests Prescribed</th>
            <th>Physician's Name & Contacts</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td
                contentEditable
                onBlur={e => handleEdit(appointment.id, 'notes', e.target.innerText)}
              >
                {appointment.notes}
              </td>
              <td
                contentEditable
                onBlur={e => handleEdit(appointment.id, 'prescription', e.target.innerText)}
              >
                {appointment.prescription}
              </td>
              <td
                contentEditable
                onBlur={e => handleEdit(appointment.id, 'physician', e.target.innerText)}
              >
                {appointment.physician}
                <br />
                {appointment.contact}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddAppointment}>Add Appointment</button>
      <Footer />
    </div>
  );
};

export default MeetWithDoctor;
