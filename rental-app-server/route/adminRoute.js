const express = require("express");
const {
  checkAdmin,
  requireAuthorization,
} = require("../middleware/authorization");
const {
  listUnverifiedProperties,
  changePropertyVerification,
  listAllProperties,
} = require("../controller/adminController");

const router = express.Router({ mergeParams: true });

router.use(requireAuthorization);
router.use(checkAdmin);

router.get("/properties", listAllProperties);
router.patch("/properties/:property_id", changePropertyVerification);

module.exports = router;
