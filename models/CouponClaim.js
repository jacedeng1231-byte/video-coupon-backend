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

  claimedAt: {
    type: Date,
    default: Date.now
  }

})

CouponClaimSchema.index({ userId: 1, couponId: 1 }, { unique: true })

module.exports = mongoose.model("CouponClaim", CouponClaimSchema)