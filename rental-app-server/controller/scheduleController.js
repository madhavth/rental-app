//crud --- create /users/1/schedules --- [{property_id, title, description, time, owner_id}]
// read --- [{property: {name, location}, title ,description, time,  owner: {name}}]
const User = require("../model/userModel");
const Property = require("../model/propertyModel");
const mongoose = require("mongoose");

module.exports.getSchedulesForUser = async (req, res, next) => {
  const userId = req.userData.userId;

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
          _id: 0,
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
          _id: 0,
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
          _id: { owner_id: "$owner._id" },
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
          schedules: {
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

  if (userId === req.body.owner_id) {
    return next(new Error("Cannot add schedule to your own property"));
  }

  try {
    const result = await User.updateOne(
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

    const success = result.modifiedCount !== 0;

    res.status(200).json({
      success,
      message: success ? "Schedule added successfully" : "Schedule not added",
    });
  } catch (e) {
    next(new Error("Error adding schedule for user " + userId));
  }
};
