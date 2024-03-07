const User = require('../models/User');
const bcrypt=require('bcryptjs');
const dummyDb=require('../database/dummyDB.json');
const fs = require('fs');
const jwt =require('jsonwebtoken')
const path = require('path');
const jsonFilePath = path.join(__dirname, '..', 'database', 'dummyDB.json');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);   
    console.log("kokok")

    try {
      // Check if user already exists
      const existingUser = dummyDb.find(user => user.email === email);
      if (existingUser) {
        return res.status(400).send("User already registered");
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashPassword
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


   const login = async (req, res) => {
    //checking if the user already exists
    let emailExist = false;

    const email = req.body.email;
    for (let i = 0; i < dummyDb.length; i++) {
      if (email === dummyDb[i].email) { 
        emailExist = true;
        //Checking the password
        const validPass=await bcrypt.compare(req.body.password,dummyDb[i].password);
        if (validPass) {
          // Password is correct, so remove password field and send user data
          const userData = { ...dummyDb[i] };
     
          delete userData.password;
          const token = jwt.sign({ user: userData}, process.env.JWT_SECRET,{ expiresIn: '6h' });
          
          return res.status(200).send({token});
        } else {
          // Password is incorrect
          return res.status(400).send("Wrong Password!");
        }
      }
    }
    
    // Email not found
    if (!emailExist) {
      return res.status(400).send("Email Doesn't Exist!");
    }
  }

  module.exports = { register, login };
