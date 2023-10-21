const express = require('express');
const multer  = require('multer');
const upload = multer();
const routes = express.Router();
const controller = require("../../controller/admin/products-category.controller");
const validate = require("../../validates/admin/product-category.validate.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

routes.get("/",controller.index);
routes.get("/create",controller.create);
routes.post('/create',
            upload.single("thumbnail"),
            uploadCloud.upload,
            validate.createPost,
            controller.createPost
);
module.exports = routes;