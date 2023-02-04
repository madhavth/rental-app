const express = require("express");
const {
  getAllFavorites,
  addToFavorites,
  removeFromFavorites,
} = require("../controller/favoriteController");
const { requireAuthorization } = require("../middleware/authorization");

const router = express.Router({ mergeParams: true });

router.use(requireAuthorization);

// get user favorite properties
router.get("/", getAllFavorites);
router.post("/", addToFavorites);
router.delete("/:property_id", removeFromFavorites);

module.exports = router;
