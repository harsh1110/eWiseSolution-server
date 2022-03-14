const Column = require("../models/Column");
const Tasks = require("../models/Tasks");

exports.CreateTask = async (req, res) => {
    try {

        const {
            taskName,
            sectionIndex,
            path
        } = req.body
        var CreateNewTask = await Tasks.create({
            taskName: taskName,
            taskDescription: "",
            dueDate: "No Due Date",
            taskPriority: "",
            taskStatus: false
        })
        CreateNewTask.save()
        if (CreateNewTask) {
            var addTaskToColumn = await Column.findOne({
                pathOfSection: path,
                orederOfSection: sectionIndex
            }).lean()
            if (addTaskToColumn) {
                addTaskToColumn.tasks.push(CreateNewTask._id)
                await Column.updateOne({
                    pathOfSection: path,
                    orederOfSection: sectionIndex
                }, addTaskToColumn);
                res.send({
                    msg: "success"
                })
            }
        }
    } catch (error) {
        res.send({
            msg: error
        })
    }
}
exports.AllTask = async (req, res) => {
    try {
        const Alltasks = await Tasks.find({}).lean()
        res.send(Alltasks)
    } catch (error) {
        res.json({
            msg: error
        })
    }
}
exports.TaskById = async (req, res) => {
    try {
        const id = req.params.id
        const Task = await Tasks.findOne({
            _id: id
        }).lean()
        res.send(Task)
    } catch (error) {
        res.json({
            msg: error
        })
    }
}


exports.EditTask = async (req, res) => {
    try {
        const {
            taskId,
            dueDate,
            taskDescription,
            taskPriority
        } = req.body
        var task = await Tasks.findOne({
            _id: taskId
        }).lean()
        task.dueDate = dueDate
        task.taskDescription = taskDescription
        task.taskPriority = taskPriority
        var newTask = await Tasks.findOneAndUpdate({
            _id: taskId
        }, task).lean()
        if (newTask) {
            res.send({
                msg: "success"
            })
        }
    } catch (error) {
        res.send({
            msg: "error"
        })
    }
}


exports.EditTaskName = async (req, res) => {
    try {
        const {
            taskId,
            taskName
        } = req.body
        var task = await Tasks.findOne({
            _id: taskId
        }).lean()
        task.taskName = taskName
        var newTask = await Tasks.findOneAndUpdate({
            _id: taskId
        }, task).lean()
        if (newTask) {
            res.send({
                msg: "success"
            })
        }
    } catch (error) {
        res.send({
            msg: "error"
        })
    }
}


exports.EditTaskStatus = async (req, res) => {
    try {
        const {
            taskId,
            taskStatus
        } = req.body
        const response = await Tasks.updateOne({
            _id: taskId
        }, {
            $set: {
                taskStatus: taskStatus,
            }
        });
        if (response) {
            res.send({
                msg: "success"
            })
        }
    } catch (error) {
        res.send({
            msg: "error"
        })
    }
}