const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('mssql/msnodesqlv8');
const team = require("./routes/team")

app.use(cors());
app.use(express.json());

const Donation = require('./routes/donation')
app.use("/team", team)
app.use("/donations",Donation)



app.listen(5000, () => {
  console.log('server is runing on port 5000');
});