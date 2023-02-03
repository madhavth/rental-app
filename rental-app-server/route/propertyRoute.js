const express = require("express");
const { upload } = require("../config/multer");
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  deletePropertyById,
  addProperty,
  updateProperty,
  uploadPropertyImages,
} = require("../controller/propertyController");

router.get("/", getAllProperties);
router.get("/:property_id", getPropertyById);
router.patch(
  "/upload-property-images",
  upload.array("image", 5),
  uploadPropertyImages
);
router.delete("/:property_id", deletePropertyById);
router.post("/", addProperty);
router.patch("/:property_id", updateProperty);

module.exports = router;
