const httpStatusCodes = require('./http-status-codes')
const BaseError = require('./base-error')

class Api500Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        description = 'Internal server error.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = Api500Error