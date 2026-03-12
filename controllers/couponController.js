const Coupon = require("../models/Coupon")
const CouponClaim = require("../models/CouponClaim")

exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find()
        res.json(coupons)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body)
        res.json(coupon)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.claimCoupon = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.getMyCoupons = async (req, res) => {
    try {
        const { userId } = req.params

        const coupons = await CouponClaim.find({ userId })
            .sort({ createdAt: -1 })
            .populate("couponId")

        res.json(coupons)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json(coupon)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id)
        res.json({ message: "deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}