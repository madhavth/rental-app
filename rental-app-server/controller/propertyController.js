const { uploadImage } = require("../config/cloudinary");
const Property = require("../model/propertyModel");

const defaultPerPage = 10;

const applyFilters = (req, res) => {
    const query = {};

    if(!req.query.show_all) {
        query.user_id = {
            $ne: req.userData.userId
        }
    }
    
    if (req.query.view_count_lt) {
        query.view_count = {
            $lt: req.query.view_count_lt,
        };
    }

    if (req.query.view_count_gt) {
        query.view_count = {
            $gt: req.query.view_count_gt,
            ...query.view_count
        };
    }

    if (req.query.rating_gt) {
        query.overall_rating = {
            $gt: req.query.rating_gt,
        }
    }

    if (req.query.rating_lt) {
        query.overall_rating = {
            $lt: req.query.rating_lt,
            ...query.rating
        }
    }

    return query;
};

const getMetaData = async (Model, req, res) => {
    const page = +req.query.page || 0;
    const size = +req.query.size || defaultPerPage;

    const totalDocuments = await Model.countDocuments({});
    const remaining = totalDocuments - (page + 1) * size;

    return {
        page: page,
        size: +size,
        total: +totalDocuments,
        remaining: remaining > 0 ? remaining : 0
    };
}

const paginatedResult = async (Model, req, res, next, query, sort) => {
    const page = req.query.page || 0;
    const size = req.query.size || defaultPerPage;

    const queries = applyFilters(req, res);

    const properties = await Model.find({...query, ...queries}, {
        __v: 0
    }).limit(size)
        .skip(size * page);

    if (sort) {
        properties.sort(sort);
    }

    return {
        success: true,
        data: {
            properties: properties,
            metadata: await getMetaData(Property,req, res),
        }
    }
}


module.exports.getAllProperties = async (req, res, next) => {
    try {

        const result = await paginatedResult(Property, req, res, next, {});
        res.json(result);
    } catch (e) {
        next(new Error('Error while fetching all properties'));
    }
};

module.exports.getNearByProperties = async (req, res, next) => {
  try {
    const longitude = req.query.longitude;
    const latitude = req.query.latitude;

    const query = {
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

    const results = await paginatedResult(req, res, next, query);
    res.json(results);
  } catch (e) {
    next(new Error("Error while fetching nearby properties"));
  }
};

module.exports.getTrendingProperties = async (req, res, next) => {
    try {

        const results = await paginatedResult(Property, req, res, next, {}, {view_count: -1});
        res.json(results);
    } catch (e) {
        next(new Error('Error while fetching most viewed properties'));
    }
}


module.exports.getPropertyById = async (req, res, next) => {
  try {
    const propertyId = req.params.property_id;
    const property = await Property.findOne(
      {
        _id: propertyId,
      },
      {
        __v: 0,
      }
    );
    res.json({ success: true, data: property });
  } catch (e) {
    next(new Error("Error while fetching property"));
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

module.exports.addProperty = async (req, res, next) => {
  try {
    req.body.view_count = undefined;

    const property = new Property(req.body);
    await property.save();
    res.json({
      success: true,
      message: "Added new property successfully",
    });
  } catch (e) {
    next(new Error("Error while adding new property"));
  }
};

module.exports.getPropertyById = async (req, res, next) => {
  try {
    const propertyId = req.params.property_id;
    const property = await Property.findOne(
      {
        _id: propertyId,
      },
      {
        __v: 0,
      }
    );
    res.json({ success: true, data: property });
  } catch (e) {
    next(new Error("Error while fetching property "));
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

module.exports.addProperty = async (req, res, next) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.json({
      success: true,
      message: "Added new property successfully",
    });
  } catch (e) {
    next(new Error("Error while adding new property"));
  }
};

module.exports.uploadPropertyImages = async (req, res, next) => {
  try {
    const { _id } = req.body;
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
        res.json({ success: true, message: propertyImages });
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports.updateProperty = async (req, res, next) => {
  try {
    const id = req.params.property_id;

    const updatedInfo = req.body;

    await Property.updateOne(
      {
        _id: id,
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
