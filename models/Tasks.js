const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema({
    taskName: {
        type: String,
        index:true,
        default:null,
        
    },
    taskDescription: {
        type: String
    },
    dueDate: {
        type: String
    },
    taskPriority: {
        type: String
    },
    taskStatus: {
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model('Tasks', TasksSchema)   