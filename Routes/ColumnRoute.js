const express = require('express')
const {
    AllColumns,
    TaskOfColumn,
    ChangeTask,
    FindOneColumns,
    ChangeColumn,
    ChangeTaskSameColumn
} = require('../Controller/ColumnController')
const router = express.Router()

router.get("/all", AllColumns)
router.get("/:path/:index", FindOneColumns)
router.get("/task/:path/:index", TaskOfColumn)
router.post("/change-task", ChangeTask)
router.post("/change-task-same-column", ChangeTaskSameColumn)
router.post("/change-column", ChangeColumn)

module.exports = router