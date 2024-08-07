"use strict"

const router = require("express").Router()
const category = require("../controllers/category")

router.route("/")
.get(category.list)
.post(category.create)

router.route("/:categoryId")
.get(category.read)
.put(category.update)
.patch(category.update)
.delete(category.delete)

module.exports = router