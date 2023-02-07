const { uploadImage } = require("../config/cloudinary");
const Property = require("../model/propertyModel");
const fs = require("fs");

const defaultPerPage = 10;

const applyFilters = (req, res, show_all = req.query.show_all) => {
  const query = {};
  show_all = show_all ? show_all : show_all === "true";

  if (!show_all && req.userData) {
    query.user_id = {
      $ne: req.userData.userId,
    };
  }

  if (req.query.name) {
    query.name = {
      $regex: req.query.name,
      $options: "i",
    };
  }

  if (req.query.view_count_lt) {
    query.view_count = {
      $lte: req.query.view_count_lt,
    };
  }

  if (req.query.view_count_gt) {
    query.view_count = {
      $gte: req.query.view_count_gt,
      ...query.view_count,
    };
  }

  if (req.query.rating_gt) {
    query.overall_rating = {
      $gte: req.query.rating_gt,
    };
  }

  if (req.query.rating_lt) {
    query.overall_rating = {
      $lte: req.query.rating_lt,
      ...query.rating,
    };
  }

  return query;
};

const getMetaData = async (Model, req, res, query = {}) => {
  const page = +req.query.page || 0;
  const size = +req.query.size || defaultPerPage;

  const totalDocuments = await Model.countDocuments(query);
  const remaining = totalDocuments - (page + 1) * size;

  return {
    page: page,
    size: +size,
    total: +totalDocuments,
    remaining: remaining > 0 ? remaining : 0,
  };
};

const paginatedResult = async (Model, req, res, next, query, sort, showAll) => {
  const page = req.query.page || 0;
  const size = req.query.size || defaultPerPage;

  const queries = applyFilters(req, res, showAll);

  const properties = await Model.find(
    { ...query, ...queries },
    {
      __v: 0,
      schedules: 0,
    }
  )
    .limit(size)
    .skip(size * page)
    .sort(sort);

  return {
    success: true,
    data: {
      properties: properties,
      metadata: await getMetaData(Property, req, res, { ...query, ...queries }),
    },
  };
};

module.exports.paginatedResult = paginatedResult;

module.exports.getAllProperties = async (req, res, next) => {
  try {
    const result = await paginatedResult(Property, req, res, next, {
      is_verified: true,
      is_rented: false,
    });
    res.json(result);
  } catch (e) {
    next(new Error("Error while fetching all properties"));
  }
};

module.exports.getNearByProperties = async (req, res, next) => {
  try {
    const longitude = +req.query.longitude;
    const latitude = +req.query.latitude;

    const query = {
      is_verified: true,
      is_rented: false,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    };

    const results = await paginatedResult(Property, req, res, next, query);
    res.json(results);
  } catch (e) {
    console.log(e);

    next(new Error("Error while fetching nearby properties"));
  }
};

module.exports.getTrendingProperties = async (req, res, next) => {
  try {
    const results = await paginatedResult(
      Property,
      req,
      res,
      next,
      {
        is_verified: true,
        is_rented: false,
      },
      { view_count: -1 }
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    next(new Error("Error while fetching most viewed properties"));
  }
};

module.exports.getPropertyById = async (req, res, next) => {
  try {
    const propertyId = req.params.property_id;
    const property = await Property.findOneAndUpdate(
      {
        _id: propertyId,
      },
      {
        $inc: {
          view_count: 1,
        },
      }
    );
    res.json({ success: true, data: property });
  } catch (e) {
    console.log(e);
    next(new Error("Error while fetching property"));
  }
};

module.exports.deletePropertyById = async (req, res, next) => {
  try {
    const propertyId = req.params.property_id;
    await Property.deleteOne({ _id: propertyId, user_id: req.userData.userId });
    res.json({ success: true, message: "Deleted property successfully" });
  } catch (e) {
    next(new Error("Error while deleting property"));
  }
};

module.exports.addProperty = async (req, res, next) => {
  try {
    // don't allow to update these fields
    req.body.view_count = undefined;
    req.body.is_verified = undefined;
    req.body.is_rejected = undefined;

    req.body.user_id = req.userData.userId;

    const property = new Property(req.body);
    const result = await property.save();

    const success = result !== undefined && result !== null;

    res.json({
      success: success,
      message: success
        ? "Added new property successfully"
        : "Error while adding new property",
    });
  } catch (e) {
    next(new Error("Error while adding new property"));
  }
};

module.exports.deletePropertyById = async (req, res, next) => {
  try {
    const propertyId = req.params.property_id;
    await Property.deleteOne({ _id: propertyId });
    res.json({ success: true, message: "Deleted property successfully" });
  } catch (e) {
    next(new Error("Error while deleting property"));
  }
};

module.exports.uploadPropertyImages = async (req, res, next) => {
  try {
    const { _id } = req.body;

    if (!fs.existsSync("assets/pics")) {
      fs.mkdir("assets/pics");
    }

    let propertyImages = [];
    if (req.files !== undefined) {
      if (req.files.length > 0) {
        for (var i = 0; i < req.files.length; i++) {
          var locaFilePath = req.files[i].path;
          var result = await uploadImage(locaFilePath);
          propertyImages.push({ img: result.secure_url });
        }
      }
      if (propertyImages.length > 0) {
        await Property.findOneAndUpdate(
          {
            _id,
          },
          {
            $set: { propertyImages },
          }
        );
        res.json({ success: true, data: propertyImages });
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports.updateProperty = async (req, res, next) => {
  try {
    const id = req.params.property_id;

    // don't allow to change these fields from users side
    req.body.is_verified = undefined;
    req.body.is_rejected = undefined;

    await Property.updateOne(
      {
        _id: id,
        user_id: req.userData.userId,
      },
      {
        $set: {
          ...req.body,
        },
      }
    );
    res.json({
      success: true,
      message: `updated property successfully`,
    });
  } catch (e) {
    next(new Error("Error while updating property"));
  }
};
