module.exports.index = (req, res) => {
    res.render("client/pages/products/index.pug",{
      titlePage: "Danh sach san pham"
    })
  }