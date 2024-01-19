const express = require('express');
const multer  = require('multer');
const controller = require("../../controller/admin/product.controller");
// const storageMulter = require("../../helpers/storageMulter");
const validate = require("../../validates/admin/product.validate.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();
const routes = express.Router();
  
routes.get('/',controller.index);
routes.patch('/change-status/:status/:id',controller.changeStatus);
// :status  routes động Khi link có status thì bên controller sẽ nhận được Lấy ra bằng cách req.params.status
routes.patch('/change-multi',controller.changeMulti);
routes.delete('/delete/:id',controller.deleteItem);
routes.get('/create',controller.create);
routes.post('/create',
            upload.single("thumbnail"),
            uploadCloud.upload,
            validate.createPost,
            controller.createPost
);
routes.get('/edit/:id',controller.edit);
routes.patch(
    '/edit/:id',
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);

routes.get('/detail/:id',controller.detail);
module.exports = routes;