const {customAPIError} = require('../errors/customError')

const errorHandler = (error, req, res, next) => {
    if(error instanceof customAPIError){
        return res.status(error.statusCode).json({msg:`Custom error handling (middleware + fct wrapper) ${error.message}`})
    }
    return res.status(500).json({msg:`Custom error : Someting went wrong , try again later`})
}

module.exports = errorHandler