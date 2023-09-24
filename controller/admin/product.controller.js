const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filterStatus.js");
const searchHelpers = require("../../helpers/search.js");
const paginationHelpers = require("../../helpers/pagination.js");
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
    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
    
    res.render("admin/pages/product/index.pug",{
        titlePage: "Trang chu",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
      })
}