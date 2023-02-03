const Property = require('../model/propertyModel');

module.exports.getAllProperties = async (req, res, next) => {
    try {
        const properties = await Property.find({}, {
            __v: 0
        });
        res.json({success: true, data: properties});
    } catch (e) {
        next(new Error('Error while fetching all properties'));
    }

};

module.exports.getPropertyById = async (req, res, next) => {
    try {
        const propertyId = req.params.property_id;
        const property = await Property.findOne({
            _id: propertyId
        }, {
            __v : 0
        });
        res.json({success: true, data: property});
    } catch (e) {
        next(new Error('Error while fetching property '));
    }

}

module.exports.deletePropertyById = async (req, res, next) => {
    try {
        const propertyId = req.params.property_id;
        await Property.deleteOne({_id: propertyId});
        res.json({success:true, message: 'Deleted property successfully'});
    } catch (e) {
        next(new Error('Error while deleting property'));
    }

}

module.exports.addProperty = async (req, res, next) => {
    try {
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

