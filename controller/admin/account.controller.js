const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system.js");

// [GET] admin/account
module.exports.index = async (req,res) => {
    res.render("admin/pages/account/index.pug",{
        pageTitle: "Danh sách tài khoản"
    })
}