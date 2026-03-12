const express = require("express")
const router = express.Router()

const videoController = require("../controllers/videoController")

router.get("/", videoController.getVideos)
router.post("/view", videoController.recordView)
router.post("/", videoController.createVideo)
router.put("/:id", videoController.updateVideo)

module.exports = router