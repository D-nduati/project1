const express = require('express');
const sql = require('mssql/msnodesqlv8');
const bcrypt = require('bcrypt');

var config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
};

module.exports = {
    recentUsers: async (req, res) => {
        try {
          const pool = await sql.connect(config);
          const result = await pool.query('SELECT * FROM users');
        
          if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'No users not found' });
          }
        
          const users = result.recordset.map(user => ({
            ...user,
            // Reverse the encrypted password
            password: user.password.split('').reverse().join('')
          }));
        
          return res.status(200).json({ success: true, data: users });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
      },
      generateReport: async (req, res) => {
      try {
        const { username } = req.body;
    
        // Connect to the database
        const pool = await sql.connect(config);
    
        // Fetch user data
        const userData = await pool.query(`SELECT * FROM users WHERE username = @username`, { username });
    
        if (userData.recordset.length === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
    
        const user = userData.recordset[0];
        const userId = user.userid;
    
        // Fetch profile data
        const profileData = await pool.query(`SELECT * FROM ProfileData WHERE username = @username`, { username });
    
        // Fetch development stage data
        const developmentStageData = await pool.query(`
          SELECT category 
          FROM checklist 
          WHERE username = @username AND checkedState = 1
        `, { username });
    
        // Construct the report object
        const report = {
          username: user.username,
          dateCreated: user.datecreated,
          email: user.email,
          profileData: profileData.recordset,
          developmentStages: developmentStageData.recordset.map(stage => stage.category)
        };
    
        // Return the report
        return res.status(200).json({ success: true, report });
      } catch (error) {
        console.error('Error generating report:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
    }
      
    }
   
    
