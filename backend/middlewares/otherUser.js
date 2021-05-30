const User = require('../model/userModel')

const otherUser = (req, res, next) => {
  const { otherUserId } = req.params
  User.findById(otherUserId)
    .then(user => {
      if (user) {
        req.otherUser = user
        next()
      } else return res.status(404).send()
    })
    .catch(() => res.status(500).send())
}
module.exports = otherUser
