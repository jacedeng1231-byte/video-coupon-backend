const Video = require("../models/Video")
const VideoView = require("../models/VideoView")

exports.getVideos = async (req, res) => {

  const videos = await Video.find()

  res.json(videos)

}

exports.recordView = async (req, res) => {

    const { userId, videoId } = req.body
  
    const existing = await VideoView.findOne({
      userId,
      videoId
    })
  
    if (existing) {
      return res.json(existing)
    }
  
    const view = await VideoView.create({
      userId,
      videoId
    })
  
    res.json(view)
  
  }