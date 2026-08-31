const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./controllers/db');
const sql = require('mssql/msnodesqlv8');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/api', async (req, res) => {
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




app.get('/totaldonation', async (req,res)=>{

try {

let pool = await sql.connect(config)

let result = await pool.request().query("select SUM(AMOUNT) AS TOTALAMOUNT from DONATION")
 //return res.json(result.recordset);

  let latestId = result.recordset[0].TOTALAMOUNT;

        res.json({ TOTALAMOUNT: latestId });

}
catch(err){

  res.send(error.message)



}

})


app.listen(5000, () => {
  console.log('server is runing on port 5000');
});