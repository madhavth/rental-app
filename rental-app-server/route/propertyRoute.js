const express = require('express');
const router = express.Router();
const {
    getAllProperties,
    getPropertyById,
    deletePropertyById,
    addProperty,
    updateProperty,
    getNearByProperties,
    getTrendingProperties
} = require('../controller/propertyController');

router.get('/', getAllProperties);
router.get('/nearby', getNearByProperties);
router.get('/trending', getTrendingProperties);

router.get('/:property_id', getPropertyById);
router.delete('/:property_id', deletePropertyById);
router.post('/', addProperty);
router.patch('/:property_id', updateProperty);

module.exports = router;