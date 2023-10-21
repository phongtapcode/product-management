const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productCategorySchema = new mongoose.Schema(
    {
        title: String, // Sản phẩm 1
        parent_id: {
            type: String,
            default: "",
        },
        description: String,
        thumbnail: String,
        status: String,
        position: Number,
        slug: { 
            type: String, 
            slug: "title",
            // Sẽ ăn theo title bên trên Tự động chuyển về san-pham-1
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },{
        timestamps: true
        // cập nhập thêm sản phẩm
    }
);

const ProductCategory = mongoose.model("ProductCategory",productCategorySchema,"products-category");
//                                                                               tên conection trong mongo on
module.exports = ProductCategory;