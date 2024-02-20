const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose=require('mongoose');
const cors=require('cors');
dotenv.config();
app.use(express.json())



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//      client.connect();
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     // Send a ping to confirm a successful connection
//     await client.db("user").command({ ping: 1 });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// app.use('/api/users/register', (req, res, next) => {
//   // Log database information

//   console.log('Database Name:', mongoose.connection.name);
//   console.log('Collections:', mongoose.connection.collections);

//   // You can also perform additional database-related tasks here if needed

//   // Continue to the next middleware or route handler
//   next();
// });

const authRoute = require('./routes/auth')

app.use(cors({
  origin:"*",
}))

app.use('/api/users',authRoute);

app.get('/',(req,res)=>{
res.send("koko")
})


  app.listen("4000",()=>{
    console.log("Connected to Backend: 4000 PORT");
  })