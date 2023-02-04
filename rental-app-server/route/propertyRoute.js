const express = require("express");
const { upload } = require("../config/multer");
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  deletePropertyById,
  addProperty,
  updateProperty,
  getNearByProperties,
  getTrendingProperties,
  uploadPropertyImages,
} = require("../controller/propertyController");
const checkLongLat = require("../middleware/checkLongLat");
const reviewsRoute = require("../route/reviewsRoute");
const {
  onlyGetRequestWithoutAuth,
} = require("../middleware/onlyGetRequestAllowedWithoutAuth");

router.use(onlyGetRequestWithoutAuth);

router.get("/", getAllProperties);
router.get("/nearby", checkLongLat, getNearByProperties);
router.get("/trending", getTrendingProperties);

router.patch(
  "/upload-property-images",
  upload.array("image", 5),
  uploadPropertyImages
);

router.get("/:property_id", getPropertyById);
router.delete("/:property_id", deletePropertyById);
router.post("/", addProperty);
router.patch("/:property_id", updateProperty);

router.use("/:property_id/reviews", reviewsRoute);

module.exports = router;
