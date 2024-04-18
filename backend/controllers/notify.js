const express = require('express');
const sql = require('mssql/msnodesqlv8');
const devMilestones = require('./devmilescontroller');
const config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
};

module.exports = {
  notifydateexpectant: async (req, res) => {
    const { username } = req.params;

    try {
      const pool = await sql.connect(config);

      if (pool.connected) {
        const result = await pool.query(`SELECT DateOfExpectancy FROM ProfileData where username = @username`, { username });
        
        if (result.recordset.length === 0) {
          return res.status(500).json({ error: 'No data found for the user' });
        } else {
          return res.status(200).json({
            success: true,
            result: result.recordset[0]
          });
        }
      } else {
        console.log('not connected');
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  notifydevelopmentMilestones: async (req, res) => {
    const { username, pregnancyDate } = req.params;

    try {
      const pool = await sql.connect(config);

      if (pool.connected) {
        const result = await pool.query(`SELECT DateOfExpectancy FROM ProfileData where username = @username`, { username });

        if (result.recordset.length === 0) {
          return res.status(500).json({ error: 'No data found for the user' });
        } else {
          const DateOfExpectancy = result.recordset[0].DateOfExpectancy;
          const currentDate = new Date();
          const changeDays = Math.floor((currentDate - DateOfExpectancy) / (1000 * 60 * 60 * 24)); // Difference in days

          const result = await pool.request().query("SELECT * FROM checklist");
          const milestones = result.recordset.map(item => ({
            id: item.id,
            category: item.category,
            actualitem: item.actualitem
          }));

          let returndata;
          if (changeDays <= 90) {
            returndata = milestones.filter(item => item.category.includes('first show'));
          } else if (changeDays > 90 && changeDays <= 180) {
            returndata = milestones.filter(item => item.category.includes('second show'));
          } else {
            returndata = milestones.filter(item => item.category.includes('third show'));
          }

          return res.status(200).json({ returndata });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};
