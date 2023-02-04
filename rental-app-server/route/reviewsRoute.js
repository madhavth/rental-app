const express = require("express");
const {
  getAllReviews,
  addReview,
  updateReview,
  removeReviewById,
} = require("../controller/reviewsController");

const router = express.Router({ mergeParams: true });

router.get("/", getAllReviews);
router.post("/", addReview);
router.patch("/:review_id", updateReview);
router.delete("/:review_id", removeReviewById);

module.exports = router;
