// GET, POST, PATCH, DELETE for reviews
const Property = require("../model/propertyModel");
const mongoose = require("mongoose");

const recalculateRating = async (property_id) => {
  const results = await Property.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(property_id),
      },
    },
    { $unwind: "$reviews" },
    {
      $group: {
        _id: { _id: "$_id" },
        rating: {
          $avg: "$reviews.rating",
        },
      },
    },
  ]);

  if (results.length > 0) {
    const result = await Property.updateOne(
      { _id: property_id },
      { overall_rating: results[0].rating }
    );
  }

  return results;
};

module.exports.getAllReviews = async (req, res, next) => {
  try {
    const result = await Property.findOne(
      { _id: req.params.property_id },
      { reviews: 1 }
    );

    res.json({ success: true, data: result ? result.reviews : [] });
  } catch (e) {
    next(new Error("Error while fetching reviews"));
  }
};

module.exports.removeReviewById = async (req, res, next) => {
  try {
    await Property.updateOne(
      { _id: req.params.property_id },
      { $pull: { reviews: { _id: req.params.review_id } } }
    );

    await recalculateRating(req.params.property_id);

    res.json({ success: true, message: "Deleted review successfully" });
  } catch (e) {
    next(new Error("Error while deleting review"));
  }
};

module.exports.addReview = async (req, res, next) => {
  try {
    const result = await Property.updateOne(
      { _id: req.params.property_id },
      { $push: { reviews: req.body } }
    );

    const newRes = await recalculateRating(req.params.property_id);

    const success = result.modifiedCount !== 0;

    res.json({
      success: success,
      message: !success ? "Failed to add review" : "Added review successfully",
    });
  } catch (e) {
    console.log(e);
    next(new Error("Error while adding review"));
  }
};

module.exports.updateReview = async (req, res, next) => {
  try {
    const result = await Property.updateOne(
      { _id: req.params.property_id, "reviews._id": req.params.review_id },
      { $set: { "reviews.$": req.body } }
    );

    const success = result.modifiedCount !== 0;
    res.json({
      success: success,
      message: !success
        ? "Error updating review"
        : "Updated review successfully",
    });
  } catch (e) {
    next(new Error("Error while updating review"));
  }
};
