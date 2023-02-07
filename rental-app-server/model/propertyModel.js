const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const propertySchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    overall_rating: Number,
    location: [Number],
    reviews: [
      {
        comment: String,
        rating: Number,
        user_id: String, //mongoose.Mongoose.SchemaTypes.ObjectId,
      },
    ],
    description: String,
    type: String,
    propertyImages: [{ img: { type: String } }],
    user_id: String, //mongoose.Mongoose.SchemaTypes.ObjectId
    view_count: {
      type: Number,
      default: 0,
    },
    property_features: {
      bedrooms: { type: Number, default: 0 },
      bathrooms: { type: Number, default: 0 },
      beds: { type: Number, default: 0 },
    },
    is_rented: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_rejected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

propertySchema.index({ location: "2d" });

const property = mongoose.model("Property", propertySchema);

property.createIndexes((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Indexes created");
  }
});

module.exports = property;
