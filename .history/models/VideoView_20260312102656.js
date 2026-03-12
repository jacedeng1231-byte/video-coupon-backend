const mongoose = require("mongoose")

const VideoViewSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },

  viewedAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("VideoView", VideoViewSchema)