const express = require("express")
const router = express.Router()

const couponController = require("../controllers/couponController")

router.post("/claim", couponController.claimCoupon)
router.get("/my/:userId", couponController.getMyCoupons)
router.get("/", couponController.getCoupons)

router.post("/", couponController.createCoupon)
router.put("/:id", couponController.updateCoupon)
router.delete("/:id", couponController.deleteCoupon)


module.exports = router