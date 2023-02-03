const express = require('express');
const router = express.Router();
const { getAllProperties,getPropertyById, deletePropertyById, addProperty, updateProperty } = require('../controller/propertyController');

router.get('/', getAllProperties);
router.get('/:property_id', getPropertyById);
router.delete('/:property_id', deletePropertyById);
router.post('/', addProperty);
router.patch('/:property_id', updateProperty);

module.exports = router;