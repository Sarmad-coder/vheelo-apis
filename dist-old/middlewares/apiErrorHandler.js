"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import logger from '../util/logger'
function default_1(error, req, res, next) {
    // if (error.source) {
    //   logger.error(error.source)
    // }
    res.status(error.statusCode).json({
        status: 'error',
        statusCode: error.statusCode,
        message: error.message,
    });
}
exports.default = default_1;
