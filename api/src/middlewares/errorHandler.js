"use strict"

module.exports = (error, req, res, next) => {
  
    res.status(res?.errorStatusCode || 500).send({
        error: true,
        message: error.message,
        cause: error.cause,
        body: req.body
    })

}