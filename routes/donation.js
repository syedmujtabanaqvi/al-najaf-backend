const express = require("express");
const router = express.Router();
const config = require('../controllers/db');
const sql = require('mssql/msnodesqlv8');


router.get('/', (req, res) => {
  res.send('hello');
});

router.post('/api', async (req, res) => {
  const { Amount, Purpose, Name, Phone, City, Message } = req.body;

  if (!Name || !Amount) {
    return res.status(400).json({
      success: false,
      message: 'Name and Amount are required'
    });
  }

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('AMOUNT', sql.Int, parseInt(Amount, 10))
      .input('DPURPOSE', sql.VarChar(100), Purpose)
      .input('NAME', sql.VarChar(100), Name)
      .input('CITY', sql.VarChar(50), City)
      .input('MESSAGE', sql.VarChar(500), Message || '')
      .input('PHONE', sql.VarChar(20), Phone ? Phone.toString() : '')
      .query(`
        INSERT INTO DONATION (AMOUNT, DPURPOSE, NAME, CITY, MESSAGE, PHONE) 
        VALUES (@AMOUNT, @DPURPOSE, @NAME, @CITY, @MESSAGE, @PHONE)
      `);

    const newuser = {
      Amount,
      Purpose,
      Name,
      Phone,
      City,
      Message
    };

    console.log('Saved Record:', newuser);

    return res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: newuser
    });

  } catch (error) {
    console.error('SQL Execution Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Database error',
      error: error.message
    });
  }
});




router.get('/totaldonation', async (req,res)=>{

try {

let pool = await sql.connect(config)

let result = await pool.request().query(
  `select count(DONARID) AS T , SUM(AMOUNT) AS TOTALAMOUNT from DONATION`)
 //return res.json(result.recordset);

  let DONARid = result.recordset[0]?.T  ?? 0; 
  let amount = result.recordset[0]?.TOTALAMOUNT ?? 0;
  
  

        res.json({ TOTALAMOUNT: amount , DONARid  });


}
catch(err){

  res.send(err)

  console.error('SQL Execution Error:', err);

}

})

module.exports = router