const express = require("express");
const route = express.Router();
const config = require('../controllers/db');
const sql = require('mssql/msnodesqlv8');
const router = require("./donation");

route.get('/',(req,res)=>{

    res.send("mera naam mujtaba hai")
})

route.post("/GETTEAMDATA" , async (req,res)=>{
    try{
    const { NAME , CNIC } = req.body
 
    const pool = await sql.connect(config);
    await pool.request()
    .input('NAME', sql.VarChar(50), NAME)
    .input('BLOODGROUP', sql.VarChar(3), NAME)
    .input('CNIC', sql.Int, CNIC)
    .query(`
        INSERT INTO MEMBERDATA (NAME , CNIC , BLOODGROUP) VALUES (@NAME, @CNIC, @BLOODGROUP) `);

return res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: result.recordset[0] 
    });
    }
    catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Database error"
    })

}})

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

