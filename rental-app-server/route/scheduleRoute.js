const express = require("express");
const { requireAuthorization } = require("../middleware/authorization");
const {
  getSchedulesForUser,
  addScheduleForUser,
  updateScheduleForUser,
} = require("../controller/scheduleController");

const router = express.Router({ mergeParams: true });

router.use(requireAuthorization);

router.get("/", getSchedulesForUser);
router.post("/", addScheduleForUser);
router.patch("/:schedule_id", updateScheduleForUser);

module.exports = router;
