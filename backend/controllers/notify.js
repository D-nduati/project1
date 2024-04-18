const express = require('express')
const sql = require('mssql/msnodesqlv8')
var config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
};

module.exports = {
  notifydateexpectant: async (req, res) => {

    const { username } = req.params

    try {

      const pool = await sql.connect(config)

      if (pool.connected) {
        const results = await pool.query(`SELECT DateOfExpectancy FROM ProfileData where username = ${username} `)
        
        if (results.length === 0) {
          res.status(500)
            .console.log('error in server');
        } else {
          console.log(results.recordset[0])

          res.status(200).json({
            success: true,
            result: results.recordset[0]
        })
      }

      }else{
        console.log('not connected');
      }
    } catch (error) {
      console.log(error)
    }


  }
  //     notifydevelopmentMilestones: async (req, res) => {

  //     },
  //     notifyclinicsNotify: async (req, res) => {

  //     }
}