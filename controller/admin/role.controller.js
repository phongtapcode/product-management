const systemConfig = require("../../config/system");
const Role = require("../../models/role.model");
// [GET] /admin/role/
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/index",{
        pageTitle: "Nhóm quyền",
        records: records
    })
}

// [GET] /admin/create/
module.exports.create = async (req,res)=>{
    res.render("admin/pages/roles/create",{
        pageTitle: "Tạo mới"
    })
}

// [POST] /admin/create/
module.exports.createPost = async (req,res)=>{
    const record = new Role(req.body);
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}
// [GET] /admin/edit/:id
module.exports.edit = async (req,res)=>{
    try{
        const id = req.params.id;
        const find = {
            deleted: false,
            _id: id
        }
        const record = await Role.findOne(find);
        res.render("admin/pages/roles/edit",{
            pageTitle: "Chỉnh sửa",
            data: record
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}
// [GET] /admin/detail/:id
module.exports.detail = async (req,res)=>{
    try{
        const id = req.params.id;
        const record = await Role.findOne({_id:id});
        res.render("admin/pages/roles/detail",{
            pageTitle: "Chi tiết danh mục",
            data: record
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}

// [PATCH] /admin/edit/:id
module.exports.editPatch = async (req,res)=>{
    try{
        await Role.updateOne({_id: req.params.id},req.body);
        req.flash("success","Cập nhập nhóm quyền thành công");
    }catch(error){
        req.flash("error","Cập nhật nhóm quyền thất bại");
    }
    res.redirect("back");
}

// [DELETE] /admin/delete/:id
module.exports.deleteItem = async (req,res)=>{
    const id = req.params.id;
    await Role.updateOne({_id:id},{
        deleted: true,
        deletedAt: new Date()
    })
    res.redirect("back");
}

// [GET] /admin/permission
module.exports.permissions = async (req,res)=>{
    let find = {
        deleted: false
    };
    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions",{
        pageTitle: "Phân quyền",
        records: records
    });
}

// [PATCH] /admin/permission
module.exports.permissionsPatch = async (req,res)=>{
    //chuyển về mảng
    const permissions = JSON.parse(req.body.permissions);
    for(const item of permissions){
        const id = item.id;
        const permissions = item.permissions;
        await Role.updateOne({_id:id},{
            permissions: permissions
        })
    }
    req.flash("success","Cập nhật thành công");
    res.redirect("back");
}