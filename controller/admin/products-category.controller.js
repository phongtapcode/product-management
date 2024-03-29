const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree.js");
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
// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await ProductCategory.findOne({
            _id:id,
            deleted: false
        });
        let find = {
            deleted: false
        }
        const records = await ProductCategory.find(find);
        const newRecords = createTreeHelper.tree(records);
        res.render("admin/pages/products-category/edit",{
            pageTitle: "Chỉnh sửa danh mục",
            data: data,
            records: newRecords
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}

// [PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async (req,res) =>{
    try{
        req.body.position = parseInt(req.body.position);
        await ProductCategory.updateOne({_id: req.params.id},req.body);
        req.flash("success","Cập nhật thành công!!");
      }catch(error){
        req.flash("error","Cập nhật thất bại!!");
      }
      res.redirect("back");
}

// [GET] /admin/product-category/detail/:id
module.exports.detail = async (req,res) => {
    try{
        const id = req.params.id;
        let find = {
            deleted: false,
            _id: id
        };
        const product = await ProductCategory.findOne(find);
        res.render("admin/pages/products-category/detail.pug",{
            pageTitle: product.title,
            product: product
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}