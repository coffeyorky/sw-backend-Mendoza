class CustomeError {
    static createError({name="Error", cause, message, code=1}){
        const error = new Error(message)
        error.name = name
        error.code = code
        error.cause = cause
        req.logger.error(error)
        throw error
    }
}

module.exports = CustomeError