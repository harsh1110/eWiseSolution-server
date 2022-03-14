const express = require('express')
const { AllPath, CreatePath, FindPath, AddSectionToPath, RemoveSectionToPath } = require('../Controller/PathController')
const router = express.Router()

router.get("/all",AllPath)
router.post("/create",CreatePath)
router.get("/:path",FindPath)
router.post("/add-section",AddSectionToPath)
router.post("/remove-section",RemoveSectionToPath)

module.exports = router
