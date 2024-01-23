const Account = require("../../models/Account.model");
const Role = require("../../models/role.model.js");
var md5 = require('md5');
const systemConfig = require("../../config/system.js");

module.exports.login = async (req,res)=>{
    res.render("admin/pages/auth/login",{
        pageTitle: "Trang đăng nhập"
    })
}
module.exports.loginPost = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email: email,
        deleted: false
    })
    if(!user){
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }
    if(md5(password)!=user.password){
        req.flash("error","Mật khẩu sai");
        res.redirect("back");
        return;
    }
    // Xứ lí phần nếu tài khoản bị khóa
    if(user.status=="inactive"){
        req.flash("error","Tài khoản của bạn bị khóa");
        res.redirect("back");
        return;
    }
    // Lưu token của tài khoản đó lên cookie
    // Nếu các trang không có cái token này thì back về trang đăng nhập
    res.cookie("token",user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}