const { body, validationResult } = require('express-validator')

exports.inputValidate = (inputs) => {
    return async (req, res, next) => {
        const validations = inputs.map(input => body(input).not().isEmpty().withMessage(`Please check param ${input}`))
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        const resBody = {
            respCode: '101',
            respDesc: 'Connection fail',
            namespace: 'REDIS',
            error: errors
        }
        return res.status(400).send(resBody)
    }
}

exports.timeValidate = (req, res, next) => {
    req.connection.setTimeout(Number(req.body.timeout))
    next()
}
