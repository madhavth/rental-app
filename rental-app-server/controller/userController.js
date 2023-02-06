const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const Property = require("../model/propertyModel");
const {
  getUserOnlyProperties,
  paginatedResult,
} = require("./propertyController");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return next(new Error("Invalid Credentials"));
      }
      const accessToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          role: user.role,
          firstName: user.firstname,
          lastName: user.lastname,
        },
        process.env.SECRET
      );
      res.json({ success: true, data: accessToken });
    } else {
      return next(new Error("Invalid Credentials"));
    }
  } catch (error) {
    next(error);
  }
};
const signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const results = await userModel.create({
      ...newUser,
      password: hashedPassword,
    });
    res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

const userProperties = async (req, res, next) => {
  try {
    const result = await paginatedResult(
      Property,
      req,
      res,
      next,
      { user_id: req.userData.userId },
      {},
      true
    );
    res.json(result);
  } catch (e) {
    next(new Error("Error while fetching user properties"));
  }
};

module.exports = { login, signup, userProperties };
