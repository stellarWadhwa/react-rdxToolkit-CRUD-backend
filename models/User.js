const mongoose = require('mongoose');

//Here we created the structure of user or schema of user
const userSchema = new mongoose.Schema({
    name:{
        type: String,
required: true,
min:6
    },
    email:{
        type: String,
        required: true,
        max:255
    },
    password:{
        type: String,
        required: true,
        max:1024,
        min:6
    },
    role:{
        type: String,
        default:'defaultRole'

    },
    creatorId:{
type: String,
default:null

    },
    creatorEmail:{
        type: String,
default:null
    },
    usersCreated:{
        default:null,
        type:Array
    },
    date:{
        type: Date,
        default: Date.now
    }
})



module.exports=mongoose.model('User',userSchema);


//Schema is structure of a database.