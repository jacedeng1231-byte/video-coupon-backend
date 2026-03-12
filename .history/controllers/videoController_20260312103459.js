const Video = require("../models/Video")
const VideoView = require("../models/VideoView")

exports.getVideos = async (req, res) => {

  const videos = await Video.find()

  res.json(videos)

}