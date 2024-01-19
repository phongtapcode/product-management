const express = require('express')  
const controller = require("../../controller/admin/role.controller")
const routes = express.Router()
 
routes.get('/',controller.index);
routes.get('/create',controller.create);
routes.post('/create',controller.createPost);
routes.get("/edit/:id",controller.edit);
routes.get("/detail/:id",controller.detail);
routes.patch("/edit/:id",controller.editPatch);
routes.delete("/delete/:id",controller.deleteItem);
routes.get("/permissions",controller.permissions);
routes.patch("/permissions",controller.permissionsPatch);
module.exports = routes;