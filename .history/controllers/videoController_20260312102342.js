const Video = require("../models/Video")

exports.getVideos = async (req, res) => {

  const videos = await Video.find()

  res.json(videos)

}