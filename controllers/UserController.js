const User = require('../models/Users')
const errorHandler = require('../utils/ErrorHandler')
const validator = require('validator')
const AppError = require('../models/Error').ApplicationError

module.exports.create = async (req, res) => {

  try {
    //validation
    validate(req.body.email, req.body.name)

    // check if the user exists
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
      throw new AppError("User has already created", 400);
    } else {

      const user = await new User({
        name: req.body.name,
        email: req.body.email
      })
      await user.save()
      res.status(201).json(user)
    }
  } catch (e) {
    errorHandler(res, e)
  }
}


module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find()
      .limit(4)
    res.status(200).json(users)
  } catch (e) {
    errorHandler(res, e)
  }
}

const validate = (email, name) => {
  if (!validator.isEmail(email) || validator.isEmpty(email) || validator.isEmpty(name)) {
    throw new AppError("Validation Failed", 404);
  }
}
