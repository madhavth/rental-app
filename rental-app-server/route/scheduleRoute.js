const express = require("express");
const { requireAuthorization } = require("../middleware/authorization");
const {
  getSchedulesForUser,
  addScheduleForUser,
} = require("../controller/scheduleController");

const router = express.Router({ mergeParams: true });

router.use(requireAuthorization);

router.get("/", getSchedulesForUser);
router.post("/", addScheduleForUser);

module.exports = router;
