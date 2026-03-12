const Coupon = require("../models/Coupon")
const CouponClaim = require("../models/CouponClaim")

exports.claimCoupon = async (req, res) => {

    const { userId, couponId } = req.body

    const existing = await CouponClaim.findOne({
        userId,
        couponId
    })

    if (existing) {
        return res.json({ message: "Already claimed" })
    }

    const claim = await CouponClaim.create({
        userId,
        couponId
    })

    res.json(claim)

}

exports.getMyCoupons = async (req, res) => {

    const { userId } = req.params

    const coupons = await CouponClaim.find({ userId })
        .populate("couponId")

    res.json(coupons)

}