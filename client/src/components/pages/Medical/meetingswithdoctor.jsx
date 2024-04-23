// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './meetingswithdoctor.css';
// import Navbarmain from '../../NavbarMain/Navbarmain';
// import Footer from '../footer/Footer';

// const MeetWithDoctor = () => {
//   const [appointments, setAppointments] = useState([]);
//   const initialRows = 13;

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = () => {
//     axios.get('http://localhost:4040/api/appointments')
//       .then(response => {
//         setAppointments(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching appointments:', error);
//       });
//   };

//   const createEmptyAppointment = (index) => {
//     const currentDate = new Date();
//     const newDate = new Date(currentDate);
//     newDate.setDate(currentDate.getDate() + index); 
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

//   const handleAddAppointment = () => {
//     axios.post('http://localhost:4040/api/appointments', createEmptyAppointment(appointments.length))
//       .then(response => {
//         fetchAppointments(); 
//       })
//       .catch(error => {
//         console.error('Error adding appointment:', error);
//       });
//   };

//   const handleEdit = (id, field, value) => {
//     const updatedAppointments = appointments.map(appointment =>
//       appointment.id === id ? { ...appointment, [field]: value } : appointment
//     );

//     setAppointments(updatedAppointments);

//     // Update appointment on the server
//     axios.put(`http://localhost:4040/api/appointments/${id}`, { [field]: value })
//       .catch(error => {
//         console.error('Error updating appointment:', error);
//       });
//   };

//   return (
//     <div className="meet-with-doctor">
//       <Navbarmain />
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
//           {appointments.map(appointment => (
//             <tr key={appointment.id}>
//               <td>{appointment.date}</td>
//               <td
//                 contentEditable
//                 onBlur={e => handleEdit(appointment.id, 'notes', e.target.innerText)}
//               >
//                 {appointment.notes}
//               </td>
//               <td
//                 contentEditable
//                 onBlur={e => handleEdit(appointment.id, 'prescription', e.target.innerText)}
//               >
//                 {appointment.prescription}
//               </td>
//               <td
//                 contentEditable
//                 onBlur={e => handleEdit(appointment.id, 'physician', e.target.innerText)}
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
//       <Footer />
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
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
    prescription: '',
    physician: '',
    contact: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get('http://localhost:4040/api/appointments')
      .then(response => {
        setAppointments(response.data);
        if (response.data.length > 0) {
          // Set initial form data to the latest appointment
          const latestAppointment = response.data[response.data.length - 1];
          setFormData({
            date: latestAppointment.date,
            notes: latestAppointment.notes,
            prescription: latestAppointment.prescription,
            physician: latestAppointment.physician,
            contact: latestAppointment.contact
          });
        }
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4040/api/appointments', formData)
      .then(response => {
        fetchAppointments();
      })
      .catch(error => {
        console.error('Error adding appointment:', error);
      });
  };

  return (
    <div className="meet-with-doctor">
      <Navbarmain />
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
        <label>Doctor's Notes:</label>
        <input type="text" name="notes" value={formData.notes} onChange={handleInputChange} />
        <label>Prescription/Tests Prescribed:</label>
        <input type="text" name="prescription" value={formData.prescription} onChange={handleInputChange} />
        <label>Physician's Name:</label>
        <input type="text" name="physician" value={formData.physician} onChange={handleInputChange} />
        <label>Contact:</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
        <button type="submit">Submit and save </button>
      </form>

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
              <td>{appointment.notes}</td>
              <td>{appointment.prescription}</td>
              <td>
                {appointment.physician}
                <br />
                {appointment.contact}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Footer />
    </div>
  );
};

export default MeetWithDoctor;
