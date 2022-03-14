const mongoose = require('mongoose');   

const ColumnSchema = mongoose.Schema({
    sectionName:{
        type:String
    },
    pathOfSection:{
        type:String
    },
    orederOfSection:{
        type:Number
    },
    tasks:{
        type:Array
    }
},{timestamps:true})

module.exports = mongoose.model("Column",ColumnSchema)