// const express = require('express')
// const sql = require('mssql/msnodesqlv8')
// var config = {
//   connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
// };

// module.exports = {
//    //  fetch appointments from the database
//    fetchAppointments: async (req, res) =>{
//     try {
//         await sql.connect(config);
//         const username = req.body.username
//         const result = await sql.query`SELECT * FROM Appointment where username = ${username}`;
//         return result.recordset;
//       } catch (err) {
//         console.error('Error fetching appointments:', err);
//       } 
//    },
//    //  add an appointment to the database
//    addAppointment: async(req, res)=>{
//     const appointment = req.body;
//     try {
//         await sql.connect(config);
//         await sql.query`
//           INSERT INTO Appointment (date, notes, prescription, physician, contact)
//           VALUES (${appointment.date}, ${appointment.notes}, ${appointment.prescription}, ${appointment.physician}, ${appointment.contact})
//           where username = ${appointment.username}
//         `;
//       } catch (err) {
//         console.error('Error adding appointment:', err);
//       }
//    },
//    // Update Appointment
//    updateAppointment: async (req,res)=>{
//     try {
//         const pool = await sql.connect(config);
//         const { id } = req.params;
//         const { date, notes, prescription, physician, contact } = req.body;
    
//         // Execute SQL query to update appointment
//         const result = await pool.request()
//           .query(`UPDATE Appointment SET 
//                   date = '${date}', 
//                   notes = '${notes}', 
//                   prescription = '${prescription}', 
//                   physician = '${physician}', 
//                   contact = '${contact}' 
//                   WHERE id = ${id}`);
    
//         res.send("Appointment updated successfully");
//       } catch (error) {
//         console.error('Error updating appointment:', error);
//         res.status(500).send("Internal Server Error");
//       }
//    },
//    // Delete Appointment
//    deleteAppointment: async (req,res) =>{
//    try {
//     const pool = await sql.connect(config);
//     const { id } = req.params;

//     // Execute SQL query to delete appointment
//     const result = await pool.request()
//       .query(`DELETE FROM Appointment WHERE id = ${id}`);

//     res.send("Appointment deleted successfully");
//   } catch (error) {
//     console.error('Error deleting appointment:', error);
//     res.status(500).send("Internal Server Error");
//   }
//  }
// }
const sql = require('mssql/msnodesqlv8')

// Configure database connection
var config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
};

// Example function to fetch appointments from the database
async function getAppointments() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Appointment`;
    return result.recordset;
  } catch (err) {
    console.error('Error fetching appointments:', err);
  } finally {
    sql.close();
  }
}

// Example function to add an appointment to the database
async function addAppointment(appointment) {
  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Appointment (date, notes, prescription, physician, contact)
      VALUES (${appointment.date}, ${appointment.notes}, ${appointment.prescription}, ${appointment.physician}, ${appointment.contact})
    `;
  } catch (err) {
    console.error('Error adding appointment:', err);
  } finally {
    sql.close();
  }
}