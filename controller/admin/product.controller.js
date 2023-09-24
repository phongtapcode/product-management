const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req,res) => {
    let filterStatus = [
      {
        name: "Tất cả",
        status: "",
        class: "active"
      },
      {
        name: "Hoạt động",
        status: "active",
        class: ""
      },
      {
        name: "Dừng hoạt động",
        status: "inactive",
        class: ""
      }
    ]
    if(req.query.status){
      filterStatus.forEach((item)=>{
        if(item.status === req.query.status){
          item.class = "active";
        }else{
          item.class = "";
        }
      })  
    }

    let find = {
      deleted: false
    }
    if(req.query.status){
      find.status = req.query.status;
    }

    let keyword = "";
    if(req.query.keyword){
      keyword = req.query.keyword;
      var regex = new RegExp(keyword,"i");
      find.title = regex;
    }
    const products = await Product.find(find);
    
    res.render("admin/pages/product/index.pug",{
        titlePage: "Trang chu",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
      })
}