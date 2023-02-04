const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { databaseConnection } = require("./database/database");
const userRoute = require("./route/userRoute");
const propertyRoute = require("./route/propertyRoute");
const { requireAuthorization } = require("./middleware/authorization");
const adminRoute = require("./route/adminRoute");

dotenv.config({
  path: "./.env",
});
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use("/assets/pics", express.static(path.join(__dirname, "assets/pics")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

databaseConnection();
app.use(
  router.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Home Page",
    });
  })
);
// app.use("/api/users", );
app.use("/api/users", userRoute);

app.use("/api/properties", propertyRoute);

app.use("/api/admin", adminRoute);

app.all("*", (req, res, next) => {
  next(new Error(`Route Not found`));
});

app.use((error, req, res, next) => {
  res.status(400).json({ success: false, error: error.message });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, console.log(`Running on port : ${PORT}`));
