const express = require("express")
const router = express.Router()

const couponController = require("../controllers/couponController")

router.post("/claim", couponController.claimCoupon)
router.get("/my/:userId", couponController.getMyCoupons)
router.get("/", couponController.getCoupons)

router.post("admin/", couponController.createCoupon)
router.put("admin/:id", couponController.updateCoupon)
router.delete("admin/:id", couponController.deleteCoupon)


module.exports = router