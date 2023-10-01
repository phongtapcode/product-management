const express = require('express');
const controller = require("../../controller/admin/product.controller");
const routes = express.Router();
 
routes.get('/',controller.index);
routes.patch('/change-status/:status/:id',controller.changeStatus);
// :status  routes động Khi link có status thì bên controller sẽ nhận được Lấy ra bằng cách req.params.status
routes.patch('/change-multi',controller.changeMulti);
routes.delete('/delete/:id',controller.deleteItem);
module.exports = routes;