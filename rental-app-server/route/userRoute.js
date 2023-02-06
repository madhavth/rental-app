const express = require("express");
const favoriteRoute = require("../route/favoriteRoute");

const {
  login,
  signup,
  userProperties,
} = require("../controller/userController");
const { requireAuthorization } = require("../middleware/authorization");
const schedulesRoute = require("./scheduleRoute");
const router = express.Router({ mergeParams: true });

router.post("/login", login);
router.post("/signup", signup);
router.get("/properties", requireAuthorization, userProperties);
router.use("/favorites", favoriteRoute);

router.use("/schedules", schedulesRoute);

module.exports = router;
