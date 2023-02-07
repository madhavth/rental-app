const mongoose = require("mongoose");
module.exports.databaseConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    const result = await mongoose.connect(
      process.env.MONGO_URI ||
      process.env.LOCAL_DATABASE_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connected to : ${result.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
