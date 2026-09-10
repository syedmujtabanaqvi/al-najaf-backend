const express = require("express");
const route = express.Router();
const config = require('../controllers/db');
const sql = require('mssql/msnodesqlv8');
const router = require("./donation");

route.get('/',(req,res)=>{

    res.send("mera naam mujtaba hai")
})



route.get("/Team", async (req,res)=>{
let pool = await sql.connect(config);

let result = await pool.request().query('SELECT count(*) as activevolunteers FROM MEMBERDATA')

let activevolunteers = result.recordset[0] ?.activevolunteers?? 0 ;

res.json({activevolunteers})

})



route.get("/detail",async(req,res)=>{
try{
let pool = await sql.connect(config);
let result = await pool.request().query('select DONARID ,AMOUNT , DPURPOSE ,DATE ,NAME ,CITY ,MESSAGE ,PHONE from DONATION')

res.status(200).json(result.recordset)
}
catch(error){

res.status(404).json({error: error.message})

}



})



module.exports = route

