const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: String,
    location: {
        index: '2dsphere',
        type: [Number],
    },
    reviews: [
        {
            comment: String,
            rating: Number,
            user_id: String//mongoose.Mongoose.SchemaTypes.ObjectId,
        }
    ],
    description: String,
    type: String,
    user_id: String,//mongoose.Mongoose.SchemaTypes.ObjectId
    view_count: {
        type: Number,
        default: 0
    },
    property_features: {
        bedrooms: {type: Number, default: 0},
        bathrooms: {type: Number, default: 0},
        beds: {type: Number, default: 0}
    }
});

propertySchema.index({location: '2dsphere'});

const property = mongoose.model('Property', propertySchema);

module.exports = property;