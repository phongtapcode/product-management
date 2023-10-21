module.exports.createPost = (req,res,next) => {
    if(!req.body.title){
        req.flash("error","Vui lòng nhập lại");
        res.redirect("back");
        return;
    }
    next();
}