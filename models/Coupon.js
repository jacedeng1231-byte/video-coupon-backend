const mongoose = require("mongoose")

const CouponSchema = new mongoose.Schema({

  title: String,

  code: String,

  expireDate: Date,

  maxUse: Number,
  usedCount: {
    type: Number,
    default: 0
  }

})

module.exports = mongoose.model("Coupon", CouponSchema)