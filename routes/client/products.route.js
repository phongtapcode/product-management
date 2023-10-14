const express = require('express')  
const controller = require("../../controller/client/products.controller.js")
const routes = express.Router()
 
routes.get('/',controller.index);
routes.get(`/:slug`,controller.detail);
module.exports = routes