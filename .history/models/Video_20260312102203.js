const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({

  title: String,

  youtubeId: String,

  rewardCoupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon"
  }

})

module.exports = mongoose.model("Video", VideoSchema)