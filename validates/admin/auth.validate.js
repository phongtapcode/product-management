module.exports.loginPost = (req,res,next)=>{
    if(!req.body.email){
        req.flash("error","Vui lòng nhập email");
        res.redirect("back");
        return;
      }
      if(!req.body.password){
        req.flash("error","Vui lòng nhập password");
        res.redirect("back");
        return;
      }
      next();
      //next là hàm có sẵn để bước sang bước kế tiếp 
}