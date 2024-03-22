const express = require('express')
const bcrypt = require('bcrypt');
const sendMail = require('../services/sendmail')
const sql = require('mssql/msnodesqlv8')

module.exports = {
    //logging in 
    login:async (req, res) => {
      var config = {
        connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
    };
        const user = req.body;
        const pool = await sql.connect(config);
      
        try {
          if (pool.connected) {
            try {
              console.log("database connected")
              const result = await pool
                .query(`SELECT * FROM users WHERE username = '${user.username}'`);
      
              const hashedPwd = result.recordset[0]?.password;
              const userId = result.recordset[0]?.userid;
      
              if (hashedPwd && userId) {
                const comparisonPwd = await bcrypt.compare(user.password, hashedPwd);
      
                if (comparisonPwd === true) {
      
                  console.log("success")
                  res.status(200).json({
                    success: true,
                    message: 'Successfully logged in'
                  });
                } else {
                  res.status(402).json({
                    success: false,
                    message: 'Invalid credentials'
                  });
                }
              } else {
                res.status(404).json({
                  success: false,
                  message: 'User not found'
                });
              }
            } catch (error) {
              console.log(error);
              res.send(error);
            }
          }
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Server error' });
        }
      },
      //signing in
      signup: async (req, res) => {
        var config = {
          connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
      };
        const user = req.body
        const saltRounds = 8;
        try {
          const pool = await sql.connect(config)
          const hashed_pwd = await bcrypt.hash(user.password, saltRounds)
          if (pool.connected) {
            const result = await pool.request()
              .input('fname', user.fname)
              .input('lname', user.lname)
              .input('username', user.username)
              .input('email', user.email)
              .input('password', hashed_pwd)
              // .execute('createuser')
      
            const useremail = user.email;
            console.log(useremail)
            // console.log(result.recordset)
            
           await sendMail(useremail)
      
            res.status(201).send({
              message: 'Signup successful'
            });
          } else {
            console.log('internal server error')
          }
      
        } catch (err) {
          console.error(err);
          res.status(500).send({ message: 'Server error' });
        }
      },
      //changing password
      changepassword: async (req, res) => {
        var config = {
          connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
      };
        const { username, newpassword } = req.body;
        try {
          const pool = await sql.connect(config);
          const result = await pool.request()
            .input('username', username)
            .query('SELECT userid, email, username, password FROM users WHERE username = @username');
      
          if (result.recordset.length === 0) {
            return res.status(400).json({ message: "User not found" });
          }
      
          const user = result.recordset[0];
          const validPassword = await bcrypt.compare(newpassword, user.password);
      
          if (validPassword) {
            const saltRounds = 8;
            const hashed_new_pwd = await bcrypt.hash(newpassword, saltRounds);
            await pool.request()
              .input('password', hashed_new_pwd)
              .input('userid', user.userid)
              .query('UPDATE users SET password = @password WHERE userid = @userid');
            
            // Send email notification here if required
      
            return res.status(200).json({ message: "Password changed successfully" });
          } else {
            return res.status(400).json({ message: "Invalid password" });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Error processing request" });
        }
      }
}