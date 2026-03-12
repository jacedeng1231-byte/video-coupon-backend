const User = require("../models/User")

exports.login = async (req, res) => {

  const { lineUserId, name } = req.body

  let user = await User.findOne({ lineUserId })

  if (!user) {
    user = await User.create({
      lineUserId,
      name
    })
  }

  res.json(user)
}