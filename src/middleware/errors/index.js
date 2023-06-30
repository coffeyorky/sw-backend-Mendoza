const { EErrors } = require("../../utils/errors/EErrors");
const { logger } = require("../../utils/logger");

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

