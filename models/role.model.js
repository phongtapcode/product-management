const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
    {
        title: String, // Sản phẩm 1
        description: String,
        permissions: {
            type: Array,
            default: []
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

const Role = mongoose.model("Role",roleSchema,"roles");
//                                            tên conection trong mongo on
module.exports = Role;