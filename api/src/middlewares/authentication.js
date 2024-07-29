"use strict"

const Token = require("../models/token")

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null
  const token = auth ? auth.split(" ")[1] : null

  if(token){
    const tokenData = await Token.findOne({ token }).populate("userId")
    req.user = tokenData.userId
  }

  next()
}