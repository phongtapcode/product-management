module.exports.createPost = (req,res,next)=>{
    if(!req.body.title){
        req.flash("error","Vui lòng nhập tiêu đề");
        res.redirect("back");
        return;
      }
      next();
      //next là hàm có sẵn để bước sang bước kế tiếp 
}