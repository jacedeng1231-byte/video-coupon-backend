const mongoose = require("mongoose")

const CouponClaimSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  couponId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon"
  },
  fromVideoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },

  claimedAt: {
    type: Date,
    default: Date.now
  },
  isUsed: {
    type: Boolean,
    default: false
  }

})

CouponClaimSchema.index({ userId: 1, couponId: 1 }, { unique: true })

module.exports = mongoose.model("CouponClaim", CouponClaimSchema)