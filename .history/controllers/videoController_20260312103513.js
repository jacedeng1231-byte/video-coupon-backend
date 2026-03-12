const Video = require("../models/Video")
const VideoView = require("../models/VideoView")

exports.getVideos = async (req, res) => {

  const videos = await Video.find()

  res.json(videos)

}

exports.recordView = async (req, res) => {

    const { userId, videoId } = req.body
  
    const view = await VideoView.create({
      userId,
      videoId
    })
  
    res.json(view)
  
  }