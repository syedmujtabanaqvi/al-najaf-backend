const express = require('express')
const app = express();
const cors = require('cors');
const config = require('./controllers/db');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{res.send('hello')})




app.post('/api',(req,res)=>{


const { Amount , Purpose , Name ,Phone , City , Message }= req.body

if(!Name){

return res.status(400).json({

success : fail ,
message : 'naam add kar lore'

})}

const newuser = {
 Amount :Amount , 
 Purpose:Purpose , 
 Name : Name ,
 Phone : Phone, 
 City : City , 
 Message : Message
}

console.log('New User Object:', newuser);

return res.status(201).json ({

    success : true ,
    message : 'ab sahi add kiya na naam lore'

})
})


app.listen(5000,()=>{
    console.log('server is runing on port 5000')
})


