const express = require("express");

const route = express.Router();


route.get('/',(req,res)=>{

    res.send("mera naam mujtaba hai")
})


module.exports = route

