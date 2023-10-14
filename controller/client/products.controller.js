const Product = require("../../models/product.model.js")
// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false
  })
  .sort({position: "desc"})
  ;
  const newProducts = products.map(item=>{
    item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
    return item;
  })

    res.render("client/pages/products/index.pug",{
      titlePage: "Danh sach san pham",
      products: newProducts
    })
  } 
module.exports.detail = async (req,res) => {
  try{
    const find = {
      deleted: false,
      slug: req.params.slug
    }
    const product = await Product.findOne(find);
    res.render("client/pages/products/detail.pug",{
      titlePage: product.title,
      product: product
    })
  }catch(error){
    res.redirect(`/products`);
  }
}