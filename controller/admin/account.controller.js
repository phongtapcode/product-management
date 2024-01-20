const Account = require("../../models/Account.model");
const Role = require("../../models/role.model.js");
var md5 = require('md5');
const systemConfig = require("../../config/system.js");

// [GET] admin/account
module.exports.index = async (req,res) => {
    let find = {
        deleted: false
    }
    // select để lấy ra các thông tin cần thiết BỎ các thông tin k lấy
    const records = await Account.find(find).select("-password -token");
    for(const record of records){
        const role = await Role.findOne({
            deleted: false,
            _id: record.role_id
        })
        record.role = role.title;
    }
    res.render("admin/pages/account/index.pug",{
        pageTitle: "Danh sách tài khoản",
        records: records
    })
}

//[GET] admin/create
module.exports.create = async (req,res)=>{
    let find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/account/create.pug",{
        pageTitle: "Tạo mới",
        records: records
    })
}

//[POST] admin/createPost
module.exports.createPost = async (req,res)=>{
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })
    if(emailExist){
        req.flash("error","Email đã tồn tại");
        res.redirect("back");
    }else{
        // mã hóa password
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}