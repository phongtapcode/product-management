const express = require('express')  
const controller = require("../../controller/admin/product.controller")
const routes = express.Router()
 
routes.get('/',controller.index)
module.exports = routes