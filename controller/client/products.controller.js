const Product = require("../../models/product.model.js")
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: true
  });
  const newProducts = products.map(item=>{
    item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
    return item;
  })
  console.log(products);
    res.render("client/pages/products/index.pug",{
      titlePage: "Danh sach san pham",
      products: newProducts
    })
  } 