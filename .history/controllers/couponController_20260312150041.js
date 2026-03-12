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
    console.log(req)

    const { userId } = req.params

    const coupons = await CouponClaim.find({ userId })
        .sort({ createdAt: -1 })
        .populate("couponId")

    res.json(coupons)

}

exports.createCoupon = async (req, res) => {

    const coupon = await Coupon.create(req.body)

    res.json(coupon)

}

exports.updateCoupon = async (req, res) => {

    const coupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.json(coupon)

}