const express = require('express')
const { CreateTask, AllTask, TaskById, EditTask, EditTaskName, EditTaskStatus } = require('../Controller/TaskController')
const router = express.Router()

router.get("/all", AllTask)
router.get("/:id", TaskById)
router.post("/add", CreateTask)
router.post("/edit", EditTask)
router.post("/edit-name", EditTaskName)
router.post("/edit-status", EditTaskStatus)

module.exports = router