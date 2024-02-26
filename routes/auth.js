const { register, login } = require("../controllers/auth");

const router = require("express").Router();

router.post('/register',register);

//LOGIN
router.post('/login', login);



















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