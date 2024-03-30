const express = require('express');
const router = express.Router();
const sql = require('mssql/msnodesqlv8')

var config = {
    connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
  };
  
  // Create Appointment
  router.post('/appointments', async (req, res) => {
    try {
      const pool = await sql.connect(config);
      const { date, notes, prescription, physician, contact } = req.body;
  
      // Execute SQL query to insert new appointment
      const result = await pool.request()
        .query(`INSERT INTO Appointment (date, notes, prescription, physician, contact) 
                VALUES ('${date}', '${notes}', '${prescription}', '${physician}', '${contact}')`);
  
      res.status(201).send("Appointment created successfully");
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Read Appointments
  router.get('/appointments', async (req, res) => {
    try {
      const pool = await sql.connect(config);
  
      // Execute SQL query to retrieve all appointments
      const result = await pool.request().query('SELECT * FROM Appointment');
  
      res.json(result.recordset);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Update Appointment
  router.put('/appointments/:id', async (req, res) => {
    try {
      const pool = await sql.connect(config);
      const { id } = req.params;
      const { date, notes, prescription, physician, contact } = req.body;
  
      // Execute SQL query to update appointment
      const result = await pool.request()
        .query(`UPDATE Appointment SET 
                date = '${date}', 
                notes = '${notes}', 
                prescription = '${prescription}', 
                physician = '${physician}', 
                contact = '${contact}' 
                WHERE id = ${id}`);
  
      res.send("Appointment updated successfully");
    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Delete Appointment
  router.delete('/appointments/:id', async (req, res) => {
    try {
      const pool = await sql.connect(config);
      const { id } = req.params;
  
      // Execute SQL query to delete appointment
      const result = await pool.request()
        .query(`DELETE FROM Appointment WHERE id = ${id}`);
  
      res.send("Appointment deleted successfully");
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  module.exports = router;