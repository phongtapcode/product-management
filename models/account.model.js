const mongoose = require("mongoose");
const generate = require("../helpers/generate.js");
const accountSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            // Tạo ra một chuỗi kí tự ngẫu nhiên giống id Để truy cập
            default: generate.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
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

const Account = mongoose.model("Accounts",accountSchema,"accounts")

module.exports = Account;