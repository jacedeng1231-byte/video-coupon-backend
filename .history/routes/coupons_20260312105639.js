const express = require("express")
const router = express.Router()

const couponController = require("../controllers/couponController")

router.post("/claim", couponController.claimCoupon)

router.get("/my", couponController.getMyCoupons)

module.exports = router