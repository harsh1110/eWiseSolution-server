const mongoose=require("mongoose")
require("dotenv").config()


const dbconnection = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        autoIndex:false,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then((res) =>  {
        console.log("connect to database");
    }).catch((err) => {
        console.log(err);
    })
    }
    module.exports = dbconnection;
