

const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const config = require('./controllers/db'); // Ensure this file is named db.js

const app = express();
app.use(cors());

async function connectandQuery() {
    try {
        let pool = await sql.connect(config);
        
        let result = await pool.request().query('SELECT * FROM MEMBERDATA');
        
        console.log("Data retrieved:");
        console.table(result.recordset); 

    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        await sql.close();
    }
}

connectandQuery();