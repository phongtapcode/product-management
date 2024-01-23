const express = require('express')  
const controller = require("../../controller/admin/auth.controller")
const validates = require("../../validates/admin/auth.validate");
const routes = express.Router()
routes.get('/login',controller.login);
routes.post('/login',
            validates.loginPost,
            controller.loginPost
);
routes.get('/logout',controller.logout);
module.exports = routes;