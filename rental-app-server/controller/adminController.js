const Property = require("../model/propertyModel");

module.exports.changePropertyVerification = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.property_id,
      { is_verified: true },
      { new: true }
    );

    const result = await Property.updateOne(
      {
        _id: req.params.property_id,
      },
      {
        $set: {
          is_verified: req.body.is_verified,
        },
      }
    );

    const success = result.modifiedCount !== 0;

    res.json({
      success: success,
      message: success
        ? "Changed successfully to " + req.body.is_verified
        : "Error changing property",
    });
  } catch (error) {
    next(new Error("Error in verifying property"));
  }
};

module.exports.listAllProperties = async (req, res, next) => {
  try {
    const query = {};

    if (req.query.is_verified !== undefined) {
      query.is_verified = req.query.is_verified;
    }

    const properties = await Property.find(query);
    res.json({ success: true, data: properties });
  } catch (error) {
    next(new Error("Error in listing all properties"));
  }
};
