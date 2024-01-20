const express = require('express')  
const multer  = require('multer');
const upload = multer();
const validate = require("../../validates/admin/account.validate.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controller/admin/account.controller")
const routes = express.Router()
routes.get('/',controller.index);
routes.get('/create',controller.create);
routes.post('/create',
            upload.single("avatar"),
            uploadCloud.upload,
            validate.createPost,
            controller.createPost
);
module.exports = routes;