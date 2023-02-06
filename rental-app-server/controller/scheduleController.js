//crud --- create /users/1/schedules --- [{property_id, title, description, time, owner_id}]
// read --- [{property: {name, location}, title ,description, time,  owner: {name}}]
const User = require("../model/userModel");
const Property = require("../model/propertyModel");
const mongoose = require("mongoose");

module.exports.getSchedulesForUser = async (req, res, next) => {
  const userId = req.userData.userId;

  const time = new Date(req.query.time);

  // check if time is valid
  if (time.toString() === "Invalid Date") {
    return next(new Error("Valid time required"));
  }

  // get start of the date month
  const startOfMonthDate = new Date(time.getFullYear(), time.getMonth(), 1);
  const endOfMonthDate = new Date(
    time.getFullYear(),
    time.getMonth() + 1,
    -1,
    23,
    59,
    59
  );

  console.log(startOfMonthDate, " ", endOfMonthDate);

  try {
    // get user schedule as property owner, get user schedule as a potential renter
    // get user schedule and populate property and owner
    const resultBuyer = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$schedules",
      },
      {
        $match: {
          "schedules.time": {
            $gte: startOfMonthDate,
            $lte: endOfMonthDate,
          },
        },
      },
      {
        $lookup: {
          from: "properties",
          localField: "schedules.property_id",
          foreignField: "_id",
          as: "property",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "schedules.owner_id",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $project: {
          schedule_id: "$schedules._id",
          property: {
            $arrayElemAt: ["$property", 0],
          },
          title: "$schedules.title",
          description: "$schedules.description",
          time: "$schedules.time",
          state: "$schedules.state",
          owner: {
            $arrayElemAt: ["$owner", 0],
          },
        },
      },
      {
        $project: {
          _id: 0,
          schedule_id: 1,
          property: {
            _id: 1,
            name: 1,
            location: 1,
          },
          state: 1,
          title: 1,
          description: 1,
          time: 1,
          owner: {
            _id: 1,
            firstname: 1,
            lastname: 1,
          },
        },
      },
    ]);

    const resultOwner = await User.aggregate([
      {
        $match: {
          "schedules.owner_id": mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$schedules",
      },
      {
        $match: {
          "schedules.time": {
            $gte: startOfMonthDate,
            $lte: endOfMonthDate,
          },
        },
      },
      {
        $lookup: {
          from: "properties",
          localField: "schedules.property_id",
          foreignField: "_id",
          as: "property",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "schedules.owner_id",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $project: {
          schedule_id: "$schedules._id",
          property: {
            $arrayElemAt: ["$property", 0],
          },
          title: "$schedules.title",
          description: "$schedules.description",
          time: "$schedules.time",
          state: "$schedules.state",
          buyer: {
            _id: "$_id",
            firstname: "$firstname",
            lastname: "$lastname",
          },
          owner: {
            $arrayElemAt: ["$owner", 0],
          },
        },
      },
      {
        $group: {
          _id: { owner_id: "$owner._id", schedule_id: "$_id" },
          schedules: {
            $push: {
              property: "$property",
              title: "$title",
              description: "$description",
              state: "$state",
              time: "$time",
              buyer: "$buyer",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          schedule_id: "$_id.schedule_id",
          schedules: {
            time: 1,
            property: {
              name: 1,
              location: 1,
            },
            title: 1,
            description: 1,
            state: 1,
            buyer: 1,
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        owner: resultOwner,
        buyer: resultBuyer,
      },
    });
  } catch (e) {
    res.json({ success: false, message: e.message });
    // next(new Error("Error getting schedules for user " + userId));
  }
};

module.exports.addScheduleForUser = async (req, res, next) => {
  const userId = req.userData.userId;

  req.body.state = "pending";

  // parse date string to date object
  const time = new Date(req.body.time);

  // check if time is valid
  if (time.toString() === "Invalid Date") {
    return next(new Error("Invalid time"));
  }

  // if time is before today
  if (time < new Date()) {
    return next(new Error("Time cannot be before today"));
  }

  const property = await Property.findOne({
    _id: req.body.property_id,
  });

  if (property === undefined || property === null) {
    return next(new Error("Property does not exist"));
  }

  if (userId === property.user_id) {
    return next(new Error("Cannot add schedule to your own property"));
  }

  req.body.owner_id = property.user_id;

  try {
    const result = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          schedules: {
            ...req.body,
          },
        },
      }
    );

    const success = result !== undefined && result !== null;

    res.status(200).json({
      success,
      message: success ? "Schedule added successfully" : "Schedule not added",
    });
  } catch (e) {
    next(new Error("Error adding schedule for user " + userId));
  }
};

module.exports.updateScheduleForUser = async (req, res, next) => {
  const userId = req.userData.userId;

  const scheduleId = req.params.schedule_id;
  const accept = req.body.accept;

  if (accept === undefined) {
    return next(new Error("required param accept"));
  }

  if (accept !== false && accept !== true) {
    return next(new Error("param accept must be boolean"));
  }

  req.body.accept = accept ? "accepted" : "rejected";

  try {
    const result = await User.findOneAndUpdate(
      {
        "schedules._id": scheduleId,
        "schedules.owner_id": userId,
      },
      {
        $set: {
          "schedules.$.state": req.body.accept,
        },
      }
    );

    const success = result !== undefined && result !== null;

    res.status(200).json({
      success,
      message: success
        ? "Schedule updated successfully"
        : "Schedule not updated",
    });
  } catch (e) {
    next(new Error("Error updating schedule for user " + userId));
  }
};
