const Property = require('../model/propertyModel');

const defaultPerPage = 20;

const paginatedResult =async (req, res, next, query) => {
    const page = req.query.page || 0;
    const size = req.query.size || defaultPerPage;
    
    return Property.find(query, {
        __v: 0
    }).limit(size)
        .skip(size * page);
}


module.exports.getAllProperties = async (req, res, next) => {
    try {
        
        const properties = await paginatedResult(req, res, next, {});
        res.json({success: true, data: properties});
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
        
        const properties = await paginatedResult(req, res, next, query);
        res.json({success: true, data: properties});
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
        res.json({success: true, data: properties});
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

