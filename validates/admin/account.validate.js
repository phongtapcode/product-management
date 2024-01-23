module.exports.createPost = (req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error","Vui lòng nhập tiêu đề");
        res.redirect("back");
        return;
      }
      //next là hàm có sẵn để bước sang bước kế tiếp 
      if(!req.body.email){
        req.flash("error","Vui lòng nhập email");
        res.redirect("back");
        return;
      }
      if(!req.body.password){
        req.flash("error","Vui lòng nhập mật khẩu");
        res.redirect("back");
        return;
      }
      next();
}

// bỏ phần bắt buộc nhập mật khẩu
module.exports.editPatch = (req,res,next)=>{
  if(!req.body.fullName){
      req.flash("error","Vui lòng nhập tiêu đề");
      res.redirect("back");
      return;
    }
    //next là hàm có sẵn để bước sang bước kế tiếp 
    if(!req.body.email){
      req.flash("error","Vui lòng nhập email");
      res.redirect("back");
      return;
    }
    next();
}