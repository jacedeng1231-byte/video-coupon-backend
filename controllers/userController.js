const User = require("../models/User")

exports.login = async (req, res) => {
  try {
    const { lineUserId, name, pictureUrl } = req.body

    let user = await User.findOne({ lineUserId })

    if (!user) {
      user = await User.create({
        lineUserId,
        name,
        pictureUrl
      })
    } else {
      // 每次登入都更新一下名字與大頭貼，確保同步
      user.name = name
      user.pictureUrl = pictureUrl
      await user.save()
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const VideoView = require("../models/VideoView")
    const CouponClaim = require("../models/CouponClaim")
    
    // 徹底刪除：連同觀看紀錄、領取紀錄與用戶本身
    await VideoView.deleteMany({ userId: id })
    await CouponClaim.deleteMany({ userId: id })
    await User.findByIdAndDelete(id)
    
    res.json({ message: "User and all associated records deleted" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

exports.resetUser = async (req, res) => {
  try {
    const { id } = req.params
    const VideoView = require("../models/VideoView")
    const CouponClaim = require("../models/CouponClaim")
    
    // 重置：僅刪除紀錄，保留用戶資料
    await VideoView.deleteMany({ userId: id })
    await CouponClaim.deleteMany({ userId: id })
    
    res.json({ message: "User progress reset successful" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}