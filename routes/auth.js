const router = require("express").Router();
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const dummyDb=require('../database/dummyDB.json');
const fs = require("fs");


const testlistJson = JSON.stringify(dummyDb);

router.post('/register',async(req,res)=>{
setTimeout(()=>{

},1000)
  const email = req.body.email;
  //check if user alreadty exists
  try{
for(var i=0;i<dummyDb.length;i++){
if (email==dummyDb[i].email) return res.status(400).send("User already registered");

}
  }
  catch(err){
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }


//Hash The password
 const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(req.body.password, salt);
//create new user
    const user = new User({
     name: req.body.name,
     email: req.body.email,
     password: hashPassword
 });
 console.log(dummyDb)
const su=JSON.stringify(user)
console.log( JSON.stringify(user))
 try {
   const savedUser =  dummyDb.push(su);
   console.log(dummyDb);
   fs.writeFileSync("../dummyDB.json", dummyDb, "utf8");
     res.sendStatus(savedUser);
 }
 catch (err) {
res.status(404).send(err);
 }

})

//LOGIN
router.post('/login',async (req,res) => {
//checking if the user already exists
let emailExist = true;
var i=0

const email=req.body.email;
for(i;i<dummyDb.length;i++){
  if(email!=dummyDb[i].email){
    emailExist = false; 
}else{emailExist=true;
break;}
}
if(!emailExist) return res.status(400).send("Email Doesn't Exist!");
console.log(i)

//Checking the password

const password=req.body.password;
  if(password!=dummyDb[i].password) 
 return res.status(400).send("Wrong Password!");
else res.status(200).send(dummyDb[i])
 
})



















// router.post('/register', async (req,res) => {

// //checking if the user already exists
// console.log(req.body.email);
// // try {
// //     const user = await User.find();
// //     if (user) {
// //       return res.status(400).send(user);
// //     }
  
// //     // Rest of your code...
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).send('Internal Server Error');
// //   }
  

// // //Hash the password
// // const salt = await bcrypt.genSalt(10);
// // const hashPassword = await bcrypt.hash(req.body.password, salt);
// // //create new user
// //     const user = new User({
// //      name: req.body.name,
// //      email: req.body.email,
// //      password: hashPassword
// //  });
// //  try {
// //    const savedUser = await user.save();
// //    res.send(savedUser);
// //  }
// //  catch (err) {
// // res.status(404).send(err);
// //  }
// })

// //LOGIN
// router.post('/login',async (req,res) => {

// //checking if the user already exists
// const user = await User.findOne({email: req.body.email});
// if(!user) return res.status(400).send("Email Doesn't Exist!");
// //Checking the password
// const validPass=await bcrypt.compare(req.body.password,user.password);
// if(!validPass) return res.status(400).send("Invalid Password!");
// res.send(user)
// });


module.exports = router;