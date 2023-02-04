const Property = require("../model/propertyModel");
const User = require("../model/userModel");

module.exports.getAllFavorites = async (req, res, next) => {
  try {
    const result = await User.findOne({ _id: req.userData.userId });
    const favorites = result.favorite_properties || [];
    const properties = await Property.find({
      _id: { $in: favorites },
      is_verified: true,
    });
    res.json({ success: true, data: properties });
  } catch (err) {
    next(new Error("Error while fetching favorites"));
  }
};

module.exports.addToFavorites = async (req, res, next) => {
  try {
    const property = await Property.findOne({
      _id: req.body.property_id,
      user_id: {
        $ne: req.userData.userId,
      },
    });
    if (!property) {
      return next(new Error("Property not found"));
    }

    const result = await User.updateOne(
      {
        _id: req.userData.userId,
      },
      {
        $addToSet: { favorite_properties: req.body.property_id },
      }
    );

    const success = result.modifiedCount !== 0;
    res.json({
      success,
      message: success ? "Added to favorites" : "Already in favorites",
    });
  } catch (e) {}
};

module.exports.removeFromFavorites = async (req, res, next) => {
  try {
    const property = await Property.findOne({ _id: req.body.property_id });

    if (!property) {
      return next(new Error("Property not found"));
    }

    const result = await User.updateOne(
      {
        user_id: req.userData.userId,
      },
      {
        $pull: { favorite_properties: req.params.property_id },
      }
    );

    const success = result.modifiedCount !== 0;
    res.json({
      success,
      message: success ? "Removed from favorites" : "Not in favorites",
    });
  } catch (e) {}
};
