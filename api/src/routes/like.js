"use strict"

const router = require("express").Router()
const like = require("../controllers/like")

router.route("/postLike")
.post(like.likeStatus)

router.route("/getLike")
.get(like.getLikeInfo)




module.exports = router