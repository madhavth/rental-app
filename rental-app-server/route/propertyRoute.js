const express = require("express");
const {upload} = require("../config/multer");
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

router.get("/", getAllProperties);
router.get("/nearby", getNearByProperties);
router.get("/trending", getTrendingProperties);

router.get("/:property_id", getPropertyById);
router.delete("/:property_id", deletePropertyById);
router.post("/", addProperty);
router.patch("/:property_id", updateProperty);

router.patch("/upload-property-images", upload.array("image", 5), uploadPropertyImages);

module.exports = router;
