const express = require("express")
const router = express.Router()

const couponController = require("../controllers/couponController")

router.post("/claim", couponController.claimCoupon)

router.get("/my/:userId", couponController.getMyCoupons)

router.post("/", couponController.createCoupon)

router.put("/:id", couponController.updateCoupon)

module.exports = router