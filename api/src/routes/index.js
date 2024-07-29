"use strict"


const router = require("express").Router()

//* auth:
router.use("/auth", require("./auth"))

//* user:
router.use("/users", require("./user"))

// token:
router.use('/tokens', require('./token'))

//* category:
router.use("/categories", require("./category"))

//* comment:
router.use("/comments", require("./comment"))

//*like:
router.use("/blogs/:blogId",require("./like"))

//* blog:
router.use("/blogs", require("./blog"))

// document:
router.use('/documents', require('./document'))



module.exports = router