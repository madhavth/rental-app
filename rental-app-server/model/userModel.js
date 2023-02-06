const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Property = require("./propertyModel");

const UserSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favorite_properties: [
      {
        type: String,
      },
    ],
    schedules: [
      {
        property_id: ObjectId,
        title: String,
        description: String,
        time: Date,
        owner_id: ObjectId,
        state: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
