const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose=require('mongoose');
const cors=require('cors');
dotenv.config();
app.use(express.json())





const authRoute = require('./routes/auth')
const adminRoutes = require('./routes/adminControls')

app.use(cors({
  origin:"*",
}))

app.use('/api/users',authRoute);
app.use('/api/admin',adminRoutes);


app.get('/',(req,res)=>{
res.send("koko")
})


  app.listen("4000",()=>{
    console.log("Connected to Backend: 4000 PORT");
  })