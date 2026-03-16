const Coupon = require("../models/Coupon")
const CouponClaim = require("../models/CouponClaim")

exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().lean()
        for (const coupon of coupons) {
            coupon.issuedCount = await CouponClaim.countDocuments({ couponId: coupon._id })
        }
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
        const { userId, couponId, fromVideoId } = req.body

        const existing = await CouponClaim.findOne({
            userId,
            couponId
        })

        if (existing) {
            return res.status(400).json({ message: "Already claimed" })
        }

        const claim = await CouponClaim.create({
            userId,
            couponId,
            fromVideoId
        })

        res.json(claim)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.useCoupon = async (req, res) => {
    try {
        const { userId, couponId } = req.body

        // 1. 查找領取記錄
        const claim = await CouponClaim.findOne({ userId, couponId }).populate("couponId")
        if (!claim) {
            return res.status(404).json({ message: "Coupon not found in your collection" })
        }

        if (claim.isUsed) {
            return res.status(400).json({ message: "Coupon already used" })
        }

        const coupon = claim.couponId

        // 2. 檢查過期
        if (coupon.expireDate && new Date(coupon.expireDate) < new Date()) {
            return res.status(400).json({ message: "Coupon expired" })
        }

        // 3. 檢查使用上限
        if (coupon.maxUse > 0 && coupon.usedCount >= coupon.maxUse) {
            return res.status(400).json({ message: "Coupon usage limit reached" })
        }

        // 4. 更新狀態
        claim.isUsed = true
        await claim.save()

        coupon.usedCount += 1
        await coupon.save()

        res.json({ message: "Coupon used successfully", claim })
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