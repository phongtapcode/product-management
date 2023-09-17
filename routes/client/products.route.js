const express = require('express')  
const controller = require("../../controller/client/products.controller.js")
const routes = express.Router()
 
routes.get('/',controller.index)
module.exports = routes