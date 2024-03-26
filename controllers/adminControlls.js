const User = require('../models/User');
const bcrypt=require('bcryptjs');
const dummyDb=require('../database/dummyDB.json');
const fs = require('fs');
const path = require('path');
const { request } = require('http');
const jsonFilePath = path.join(__dirname, '..', 'database', 'dummyDB.json');

const addUser = async (req, res) => {
  const { name, email, password, creatorId,creatorEmail } = req.body;

  console.log(jsonFilePath)
    try {
      // Check if user already exists
      const existingUser = dummyDb.find(user => user.email === email);
      if (existingUser) {
        return res.status(400).send("User already registered");
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      
      for(var c=0;dummyDb[c];c++){
        if(dummyDb[c].email == creatorEmail){
          dummyDb[c].usersCreated.push(email);
          console.log(dummyDb[c].usersCreated)
      }
    }       
      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashPassword,
        creatorId: creatorId,
        creatorEmail:creatorEmail
      });

      // Save user to the database or dummy DB in your case
      dummyDb.push(newUser);
      // Save the updated dummy DB back to the file
      fs.writeFile(jsonFilePath, JSON.stringify(dummyDb, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error saving user data.');
        }
        console.log('User data saved successfully.');
        res.status(201).send("User registered successfully.");
      });
      
      // Respond with success message
      res.status(201).send("User registered successfully.");
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

const getCreatedUsers = async(req,res)=>{

const usersCreated=[];

try{
for( let key in dummyDb){

console.log(req.body.email)
if(dummyDb[key].creatorEmail===req.body.email){

  usersCreated.push(dummyDb[key]);

}} 
}

catch(err){
  res.status(401).send("You have not created any users");
}

console.log(usersCreated);
res.status(200).send(usersCreated);
}

const assignUserRoles = async(req,res)=>{
  try{
    for( let key in dummyDb){
    
    // console.log(dummyDb[key])
    if(dummyDb[key].email===req.body.email){
    
      dummyDb[key].role=req.body.role;
    
    }
     console.log(dummyDb[key])
  } 
    }
    catch(err){
      res.status(401).send("You have not created any users");
    }
            // Save the updated dummy DB back to the file
            fs.writeFile(jsonFilePath, JSON.stringify(dummyDb, null, 2), (err) => {
              if (err) {
                console.error(err);
                return res.status(500).send('Error saving user data.');
              }
              console.log('User data saved successfully.');
              res.status(201).send("User registered successfully.");
            });
  res.status(200).send("role updated")
  } 
//i am gonna restart the server after every delete execution to save the file, somwhow it is not saving the normal way  
const { exec } = require('child_process');

const deleteUser = async (req, res) => {
    try {
        const updatedDummyDb = dummyDb.filter(user => user.email !== req.body.email);
        console.log("Updated Dummy DB:", updatedDummyDb);

        // Save the updated dummy DB back to the file synchronously
        try {
            fs.writeFileSync(jsonFilePath, JSON.stringify(updatedDummyDb, null, 2));
            console.log("User Deleted Successfully.");
            res.status(201).send("User Deleted Successfully.");

            // Restart the server using a child process
            exec(rs, (error, stdout, stderr) => {
                if (error) {
                    console.error("Error restarting server:", error);
                    return;
                }
                console.log("Server restarted successfully:", stdout);
            });
        } catch (writeError) {
            console.error("Error saving updatedDummyDb to file:", writeError);
            res.status(500).send("Error saving user data.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user.");
    }
};



const updateUserRole = async(req, res) => {
  for(let key in dummyDb){
    if(dummyDb[key].email===req.body.email){
      dummyDb[key].role=req.body.role;
    }
  }
// Save the updated dummy DB back to the file
            fs.writeFile(jsonFilePath, JSON.stringify(dummyDb, null, 2), (err) => {
              if (err) {
                console.error(err);
                return res.status(500).send('Error saving user data.');
              }
              res.status(201).send("User role updated");
            });
  }

module.exports = {addUser,getCreatedUsers,assignUserRoles, deleteUser, updateUserRole}
