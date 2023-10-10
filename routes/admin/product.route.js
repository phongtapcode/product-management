const express = require('express');
const multer  = require('multer');
const controller = require("../../controller/admin/product.controller");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() })
const routes = express.Router();
 
routes.get('/',controller.index);
routes.patch('/change-status/:status/:id',controller.changeStatus);
// :status  routes động Khi link có status thì bên controller sẽ nhận được Lấy ra bằng cách req.params.status
routes.patch('/change-multi',controller.changeMulti);
routes.delete('/delete/:id',controller.deleteItem);
routes.get('/create',controller.create);
routes.post('/create',upload.single("thumbnail"),controller.createPost);
module.exports = routes;