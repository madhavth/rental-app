// GET, POST, PATCH, DELETE for reviews
const Property = require("../model/propertyModel");

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

    const success = result.modifiedCount !== 0;

    res.json({
      success: success,
      message: !success ? "Failed to add review" : "Added review successfully",
    });
  } catch (e) {
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
