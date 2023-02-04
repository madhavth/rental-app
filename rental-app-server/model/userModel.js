const mongoose = require("mongoose");
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
