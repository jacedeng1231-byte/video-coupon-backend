const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.post("/login", userController.login)
router.get("/", userController.getUsers)
router.delete("/:id", userController.deleteUser)
router.post("/:id/reset", userController.resetUser)

module.exports = router