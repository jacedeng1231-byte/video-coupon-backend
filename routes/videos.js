const express = require("express")
const router = express.Router()

const videoController = require("../controllers/videoController")

router.get("/", videoController.getVideos)
router.post("/view", videoController.recordView)

router.put("/:id", videoController.updateVideo)
router.post("/", videoController.createVideo)
router.delete("/:id", videoController.deleteVideo)

module.exports = router