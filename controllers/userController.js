const User = require("../models/User")

exports.login = async (req, res) => {
  try {
    const { lineUserId, name } = req.body

    let user = await User.findOne({ lineUserId })

    if (!user) {
      user = await User.create({
        lineUserId,
        name
      })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}