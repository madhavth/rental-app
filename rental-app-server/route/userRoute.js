const express = require("express");
const {
  login,
  signup,
  userProperties,
} = require("../controller/userController");
const { requireAuthorization } = require("../middleware/authorization");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/properties", requireAuthorization, userProperties);

module.exports = router;
