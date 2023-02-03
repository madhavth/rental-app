const Property = require('../model/propertyModel');

const defaultPerPage = 1;

const getMetaData = async (req, res) => {
    const page = req.query.page || 0;
    const size = req.query.size || defaultPerPage;

    const totalDocuments = await Property.countDocuments({});
    const remaining = totalDocuments - (((+page) + 1) * (+size));

    return {
        page: req.query.page || 0,
        size: req.query.size || defaultPerPage,
        total: await Property.countDocuments({}),
        remaining: remaining > 0 ? remaining : 0
    };
}

const paginatedResult = async (req, res, next, query) => {
    const page = req.query.page || 0;
    const size = req.query.size || defaultPerPage;

    const properties = await Property.find(query, {
        __v: 0
    }).limit(size)
        .skip(size * page);

    return {
        success: true,
        data: {
            properties: properties,
            metadata: await getMetaData(req, res)
        }
    }
}


module.exports.getAllProperties = async (req, res, next) => {
    try {

        const result = await paginatedResult(req, res, next, {});
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
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        };

        const results = await paginatedResult(req, res, next, query);
        res.json(results);
    } catch (e) {
        next(new Error('Error while fetching nearby properties'));
    }
}

module.exports.getTrendingProperties = async (req, res, next) => {
    try {
        const page = req.query.page || 0;
        const size = req.query.size || defaultPerPage;

        const properties = await Property.find({}, {
            __v: 0
        }).sort({view_count: -1})
            .limit(size)
            .skip(size * page);
        res.json({success: true, data: properties, metadata: await getMetaData(req, res)});
    } catch (e) {
        next(new Error('Error while fetching most viewed properties'));
    }
}


module.exports.getPropertyById = async (req, res, next) => {
    try {
        const propertyId = req.params.property_id;
        const property = await Property.findOne({
            _id: propertyId
        }, {
            __v: 0
        });
        res.json({success: true, data: property});
    } catch (e) {
        next(new Error('Error while fetching property'));
    }

}

module.exports.deletePropertyById = async (req, res, next) => {
    try {
        const propertyId = req.params.property_id;
        await Property.deleteOne({_id: propertyId});
        res.json({success: true, message: 'Deleted property successfully'});
    } catch (e) {
        next(new Error('Error while deleting property'));
    }

}

module.exports.addProperty = async (req, res, next) => {
    try {
        req.body.view_count = undefined;

        const property = new Property(req.body);
        await property.save();
        res.json({
            success: true, message: 'Added new property successfully'
        })
    } catch (e) {
        next(new Error('Error while adding new property'));
    }
}

module.exports.updateProperty = async (req, res, next) => {
    try {

        const id = req.params.property_id;

        const updatedInfo = req.body;

        await Property.updateOne({
            _id: id,
        }, {
            $set: {
                ...req.body
            }
        });
        res.json({
            success: true,
            message: `updated property successfully`
        })
    } catch (e) {
        next(new Error('Error while updating property'));
    }
}

