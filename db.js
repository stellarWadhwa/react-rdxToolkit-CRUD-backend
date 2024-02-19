const { MongoClient } = require("mongodb")

let dbConnection

module.exports={
    connectToDb:(cb)=>{
MongoClient.connect('mongodb://localhost:27017/user')
.then((client)=>{
    dbConnection = client.db()
    console.log('db connected')
    return cb()
}).catch(err=>{
    console.log(err);
    return cb(err);
})
    },getDb:()=>dbConnection
}