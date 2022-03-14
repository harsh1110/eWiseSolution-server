const mongoose = require('mongoose');

const PathSchema= mongoose.Schema({
    path: {
        type:String
    },
    section:{
        type:Array
    }
},{timestamps:true} )

module.exports = mongoose.model('Paths',PathSchema)    