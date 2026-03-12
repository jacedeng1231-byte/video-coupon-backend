const express = require("express")
const router = express.Router()

const videoController = require("../controllers/videoController")

router.get("/", videoController.getVideos)
router.post("/view", videoController.recordView)

module.exports = router