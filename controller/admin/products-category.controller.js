const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    console.log(records);
    res.render("admin/pages/products-category/index",{
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}

module.exports.create = (req,res) => {
    res.render("admin/pages/products-category/create",{
        pageTitle: "Tạo mới danh mục"
    })
}

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