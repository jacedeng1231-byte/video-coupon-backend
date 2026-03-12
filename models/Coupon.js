const mongoose = require("mongoose")

const CouponSchema = new mongoose.Schema({

  title: String,

  code: String,

  expireDate: Date,

  maxUse: Number

})

module.exports = mongoose.model("Coupon", CouponSchema)