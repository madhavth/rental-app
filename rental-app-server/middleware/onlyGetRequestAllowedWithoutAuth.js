const { requireAuthorization } = require("../middleware/authorization");

module.exports.onlyGetRequestWithoutAuth = async (req, res, next) => {
  if (req.method === "GET") {
    next();
  } else {
    await requireAuthorization(req, res, next);
  }
};
