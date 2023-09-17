const express = require('express')  
const controller = require("../../controller/client/home.controller.js")
const routes = express.Router()
 
routes.get('/',controller.index)
module.exports = routes