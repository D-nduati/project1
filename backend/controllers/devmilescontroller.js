const express = require('express')
const sql = require('mssql/msnodesqlv8')
var config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
};

module.exports = {
    devmilestones: async (req, res) => {
        try {
            let pool = await sql.connect(config);
            if (pool.connected) {
                const result = await pool.request().query("SELECT * FROM checklist");
                const milestones = result.recordset.map(item => ({
                    id: item.id,
                    category: item.category,
                    actualitem: item.actualitem
                }));
                res.status(200).json({ milestones });
            } else {
                res.status(500).json({ message: "Database connection failed." });
            }
        } catch (error) {
            console.error("Error fetching development milestones:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
}