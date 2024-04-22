// const express = require('express')
// const sql = require('mssql/msnodesqlv8')
// var config = {
//   connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
// };

// module.exports = {
//     devmilestones: async (req, res) => {
//         try {
//             let pool = await sql.connect(config);
//             if (pool.connected) {
//                 const result = await pool.request().query("SELECT * FROM checklist");
//                 const milestones = result.recordset
            
//                 res.status(200).json({ milestones });
//             } else {
//                 res.status(500).json({ message: "Database connection failed." });
//             }
//         } catch (error) {
//             console.error("Error fetching development milestones:", error);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     },
//     updateChecklistItem: async (req, res) => {
//         const itemId = req.params.itemId;
//         const { checked } = req.body;
    
//         try {
//             let pool = await sql.connect(config);
//             if (pool.connected) {
//                 const result = await pool.request()
//                     .input('itemId', itemId)
//                     .input('checkedState', checked ? 1 : 0) 
//                     .query("UPDATE checklist SET checkedState = @checkedState WHERE itemId = @itemId");
    
//                 res.status(200).json({ message: "Checklist item updated successfully" });
//             } else {
//                 res.status(500).json({ message: "Database connection failed." });
//             }
//         } catch (error) {
//             console.error("Error updating checklist item:", error);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
    
// }
const express = require('express');
const sql = require('mssql/msnodesqlv8');

var config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
};

module.exports = {
    devmilestones: async (req, res) => {
        try {
            let pool = await sql.connect(config);
            if (pool.connected) {
                const result = await pool.request().query("SELECT * FROM checklist");
                const milestones = result.recordset;
            
                res.status(200).json({ milestones });
            } else {
                res.status(500).json({ message: "Database connection failed." });
            }
        } catch (error) {
            console.error("Error fetching development milestones:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    updateChecklistItem: async (req, res) => {
        const itemId = req.params.itemId;
        const { checked } = req.body;
    
        try {
            let pool = await sql.connect(config);
            if (pool.connected) {
                const result = await pool.request()
                    .input('itemId', itemId)
                    .input('checkedState', checked ? 1 : 0) 
                    .query("UPDATE checklist SET checkedState = @checkedState WHERE itemId = @itemId");
    
                res.status(200).json({ message: "Checklist item updated successfully" });
            } else {
                res.status(500).json({ message: "Database connection failed." });
            }
        } catch (error) {
            console.error("Error updating checklist item:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
