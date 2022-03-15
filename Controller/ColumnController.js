const Column = require("../models/Column");
const Path = require("../models/Path");
const Tasks = require("../models/Tasks")

exports.AllColumns = async (req, res) => {
    try {
        var Allcolumns = await Column.find({}).lean()
        if (Allcolumns) {
            res.send(Allcolumns)
        }
    } catch (error) {
        res.send({
            msg: error
        })
    }
}
exports.FindOneColumns = async (req, res) => {
    try {
        const {
            path,
            index
        } = req.params
        var onecolumns = await Column.findOne({
            pathOfSection: path,
            orederOfSection: index
        }).lean()
        if (onecolumns) {
            res.send(onecolumns)
        }
    } catch (error) {
        res.send({
            msg: error
        })
    }
}
exports.TaskOfColumn = async (req, res) => {
    try {
        const {
            path,
            index
        } = req.params
        const query = {
            pathOfSection: path,
            orederOfSection: index
        }
        var Allcolumns = await Column.findOne(query)
        if (Allcolumns) {
            res.send(Allcolumns.tasks)
        }
    } catch (error) {
        res.send({
            msg: error
        })
    }
}


exports.ChangeTask = async (req, res) => {
    try {
        const {
            columnPath,
            oldcolumnOrder,
            taskSourceIndex,
            taskDestinationIndex,
            newcolumnOrder
        } = req.body
        const oldQuery = {
            pathOfSection: columnPath,
            orederOfSection: oldcolumnOrder,

        }
        const newQuery = {
            pathOfSection: columnPath,
            orederOfSection: newcolumnOrder
        }
        var oldColumn = await Column.findOne(oldQuery).lean()
        var newColumn = await Column.findOne(newQuery).lean()
        await newColumn.tasks.splice(taskDestinationIndex, 0, oldColumn.tasks[taskSourceIndex])
        var newColumnSave = await Column.findOneAndUpdate(newQuery, newColumn).lean()
        oldColumn.tasks.splice(taskSourceIndex, 1)
        var oldColumnSave = await Column.findOneAndUpdate(oldQuery, oldColumn).lean()
        if (oldColumnSave && newColumnSave) {
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
exports.ChangeTaskSameColumn = async (req, res) => {
    try {
        const {
            columnPath,
            columnOrder,
            SourceIndex,
            DestinationIndex,
            task
        } = req.body
        const taskData = await Tasks.findOne({
            _id: task
        })
        console.log(req.body);
        const Query = {
            pathOfSection: columnPath,
            orederOfSection: columnOrder,
        }
        console.log(SourceIndex, DestinationIndex);
        var ColumnData = await Column.findOne(Query)
        console.log(ColumnData.tasks);
        ColumnData.tasks.splice(SourceIndex, 1);
        ColumnData.tasks.splice(DestinationIndex, 0, taskData._id);
        await Column.findOneAndUpdate(Query, ColumnData)
        res.send({
            msg: "success"
        })
    } catch (error) {
        res.send({
            msg: "error"
        })
    }
}


exports.ChangeColumn = async (req, res) => {
    try {
        const {
            path,
            sourceOrder,
            destinationOrder
        } = req.body
        var sourceColumn = await Column.findOne({
            pathOfSection: path,
            orederOfSection: sourceOrder
        }).lean()
        var destinationColumn = await Column.findOne({
            pathOfSection: path,
            orederOfSection: destinationOrder
        }).lean()
        const tempVar = sourceColumn.tasks
        sourceColumn.tasks = destinationColumn.tasks
        destinationColumn.tasks = tempVar
        await Column.findOneAndUpdate({
            pathOfSection: path,
            orederOfSection: sourceOrder
        }, sourceColumn)
        await Column.findOneAndUpdate({
            pathOfSection: path,
            orederOfSection: destinationOrder
        }, destinationColumn)
        var pathSection = await Path.findOne({
            path: path
        }).lean()
        var sourceSection = pathSection.section[sourceOrder]
        var destinationSection = pathSection.section[destinationOrder]
        pathSection.section[sourceOrder] = destinationSection
        pathSection.section[destinationOrder] = sourceSection
        await Path.findOneAndUpdate({
            path: path
        }, pathSection)
        res.send({
            msg: "success"
        })
    } catch (error) {
        res.send({
            msg: error
        })
    }
}