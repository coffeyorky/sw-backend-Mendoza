const { logger } = require("../../config/logger.config");
const { EErrors } = require("../../utils/errors/EErrors");

module.exports = (error, req, res, next) => {
    logger.info(error.causa)
    switch (error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            res.send({status: "error", error: error.name})
            break;
        default:
            res.send({status: "error", error: "Unhandled error"})
        }
}

