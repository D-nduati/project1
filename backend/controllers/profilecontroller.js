const express = require('express')
const sql = require('mssql/msnodesqlv8')
var config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
};

module.exports = {
  makeprofile: async (req, res) => {
    const { MotherName, FatherName, DateOfExpectancy, NameOfChild, ProfilePictureURL } = req.body
    try {
      let pool = await sql.connect(config)
      if (pool.connected) {
        let result = await sql.Request()
          .input('MotherName', MotherName)
          .input('FatherName', FatherName)
          .input('DateOfExpectancy', DateOfExpectancy)
          .input('NameOfChild', NameOfChild)
          .input('ProfilePictureURL', ProfilePictureURL)
          .exec('InsertProfileData')

        res.status(200).send("Data stored successfully!");

      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  myaccount: async (req, res) => {
    try {
      const { username } = req.params;
      console.log(username);
  
      // Query the database to find the profile data associated with the username
      let pool = await sql.connect(config);
      const result = await pool.request()
                            .input('username', sql.VarChar(255), username)
                            .query('SELECT * FROM Profiledata WHERE username = @username');
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.json(result.recordset[0]);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
