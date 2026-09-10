const express = require("express");
const route = express.Router();
const config = require('../controllers/db');
const sql = require('mssql/msnodesqlv8');

route.get('/',(req,res)=>{

    res.send("mera naam mujtaba hai")
})



route.get("/Team", async (req,res)=>{
let pool = await sql.connect(config);

let result = await pool.request().query('SELECT count(*) as activevolunteers FROM MEMBERDATA')

let activevolunteers = result.recordset[0] ?.activevolunteers?? 0 ;

res.json({activevolunteers})

})


module.exports = route

