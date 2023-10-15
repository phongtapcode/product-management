const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filterStatus.js");
const searchHelpers = require("../../helpers/search.js");
const paginationHelpers = require("../../helpers/pagination.js");
const systemConfig = require("../../config/system.js");


// [GET] /admin/products
module.exports.index = async (req,res) => {
    // Bộ lọc Active and Inactive
    const filterStatus =  filterStatusHelpers(req.query);
    
    let find = {
      deleted: false
    }
    if(req.query.status){
      find.status = req.query.status;
    }
    // End bộ lọc
    //Search
    const objectSearch = searchHelpers(req.query);
    if(objectSearch.regex){
      find.title = objectSearch.regex;
    }
    //End Search
    // Pagination Phân trang
    const countProducts = await Product.count(find);

    const objectPagination =  paginationHelpers({
      currentPage: 1,
      limitItem: 4
    },req.query,
    countProducts
    );

    // End Pagination
    const products = await Product.find(find)
      .sort({position: "desc"})
      // Sắp xếp giảm dần (asc giảm dần) Thằng nào tạo sau sẽ hiện thị lên trước
      .limit(objectPagination.limitItem)
      // Giới hạn bn 1 trang
      .skip(objectPagination.skip);
    
    res.render("admin/pages/product/index.pug",{
        titlePage: "Trang chu",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
      })
}

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({_id: id},{status: status})
// cập nhật 1 sẩn phầm Đối số đầu tiên phải là id , Đối số thứ hai là các key muốn cập nhật
req.flash('success', 'Cập nhật thành công');
  res.redirect("back");
//Chuyển hướng về trang trước đó
}

module.exports.changeMulti = async (req,res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch(type){
      case "active":
        await Product.updateMany({ _id: {$in: ids}},{status: "active"});
        req.flash('success', `Đã cập nhật trạng thái thành công của ${ids.length} sản phẩm`);
      break;
      case "inactive":
      await Product.updateMany({ _id: {$in: ids}},{status: "inactive"});
      req.flash('success', `Đã cập nhật trạng thái thành công của ${ids.length} sản phẩm`);
      break;
      case "delete-all":
      await Product.updateMany({ _id: {$in: ids}},{
        deleted: true,
        deletedAt: new Date()
      });
      req.flash('success', `Đã thành công ${ids.length} sản phẩm`);
      break;
      case "change-position":
        for(const item of ids){
          let [id,position] = item.split("-");
          position=parseInt(position);
          await Product.updateOne({ _id: id},{position: position});
        }
        req.flash('success', `Đã đổi vị trí ${ids.length} sản phẩm thành công`);
      break;
      default:
      break;
    }
    res.redirect("back");
}
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req,res) => {
  const id = req.params.id;
  //Xóa vĩnh viễn
  // await Product.deleteOne({_id: id});
  // Xóa mềm
  await Product.updateOne({_id:id},{
    deleted: true,
    deletedAt: new Date()
  })
  res.redirect("back");
}
// [GET] /admin/products/create
module.exports.create = async (req,res) => {
  res.render("admin/pages/product/create.pug",{
    titlePage: "Tạo mới sản phẩm"
  })
}
// [POST] /admin/products/create
module.exports.createPost = async (req,res) => {
  // Vadidate Sử lí lỡ may người dùng có sửa bên F12 sẽ ko bị lỗi Ví dụ xóa require ở bên input title

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if(req.body.position==""){
    const countProducts  = await Product.count();
    req.body.position = countProducts+1;
  }else{
    req.body.position = parseInt(req.body.position);
  }
  // req.body.thumbnail  =  `/uploads/${req.file.filename}`
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit
module.exports.edit = async (req,res) => {
  try{
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    res.render("admin/pages/product/edit.pug",{
      titlePage: "Tạo mới sản phẩm",
      product: product
    })
  }catch(error){
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/products/edit

module.exports.editPatch = async (req,res) => {

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  

  try{
    await Product.updateOne({_id: req.params.id},req.body)
    req.flash("success","Cập nhật thành công!!");
  }catch(error){
    req.flash("error","Cập nhật thất bại!!");
  }
  res.redirect("back");
}

module.exports.detail = async (req,res) => {
  try{
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    res.render("admin/pages/product/detail.pug",{
      titlePage: product.title,
      product: product
    })
  }catch(error){
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}