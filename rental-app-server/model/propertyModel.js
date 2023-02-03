const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: String,
    location: {
        longitude: Number,
        latitude: Number
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
});

const property = mongoose.model('Property', propertySchema);

module.exports = property;