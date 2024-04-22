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
      generateReport:async(req,res)=>{
        res.status(200).json({success:true})
      }
      
    }
   
    
