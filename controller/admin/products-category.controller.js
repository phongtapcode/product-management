const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree.js")
// [GET] /admin/product-category/
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/products-category/index",{
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    })
}
// [GET] /admin/product-category/create
module.exports.create = async (req,res) => {
    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/create",{
        pageTitle: "Tạo mới danh mục",
        records: newRecords
    })
}
// [POST] /admin/product-category/create
module.exports.createPost = async (req,res) => {
    if(req.body.position==""){
      const countProducts  = await ProductCategory.count();
      req.body.position = countProducts+1;
    }else{
      req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}