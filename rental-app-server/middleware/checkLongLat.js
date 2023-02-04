const checkLongLat = (req, res, next) => {
    const lat = req.query.latitude;
    const long = req.query.longitude;

    if (lat === undefined || long === undefined) {
        return next(new Error('Latitude and Longitude are required'));
    }

    next();
};

module.exports = checkLongLat;