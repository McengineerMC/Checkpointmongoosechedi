const express=require('express');
const connectDB = require('./config/connectdb');
const mongoose = require('mongoose');
const person = require('./routes/person');

const app=express();

app.use(express.json());
app.use('/persons', person)

//connect to database
connectDB();

//run server
const port = process.env.PORT || 4000;
app.listen(port,(err)=>{
    if(err) {console.log('server not run')}
    else { console.log( `server run on port ${port}`);}
    })


