const express = require('express')
const app = express();
const cors = require('cors');
const config = require('./controllers/db');


app.use(express.json());

app.get('/',(req,res)=>{res.send('hello')})




app.post('/api',(req,res)=>{

res.send({name:'ali'})
console.log(req.body)

})


app.listen(5000,()=>{
    console.log('server is runing on port 5000')
})


