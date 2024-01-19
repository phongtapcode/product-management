const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productSchema = new mongoose.Schema(
    {
        title: String, // Sản phẩm 1
        product_category_id: {
            type: String,
            default: ""
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
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

const Product = mongoose.model("Product",productSchema,"products")

module.exports = Product;