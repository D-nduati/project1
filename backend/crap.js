const sql = require('mssql');

// Configure database connection
const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server', // You may need to replace this with your database server address
  database: 'your_database',
  options: {
    encrypt: true // If you're using Azure SQL, you may need this
  }
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

// You can similarly write functions for updating and deleting appointments


const express = require('express');
const app = express();
const appointmentsRouter = require('./routes/appointments');

app.use(express.json());
app.use('/api', appointmentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Configure MSSQL connection
const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost', // Your SQL Server host
  database: 'your_database_name',
  options: {
    encrypt: true // If you're using Azure SQL, set to true
  }
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


const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Assuming you have a model for appointments

// Create a new appointment
router.post('/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single appointment by ID
router.get('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }
    res.send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an appointment by ID
router.patch('/appointments/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['date', 'notes', 'prescription', 'physician', 'contact'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!appointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }
    res.send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an appointment by ID
router.delete('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }
    res.send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

