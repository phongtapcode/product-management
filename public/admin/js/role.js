//DELETE Item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length>0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}
//End DELETE Item

//Permission
const tablePermissions = document.querySelector("[table-permissions]");
//Lấy ra bảng
if(tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]");
    // Lấy ra ô submit
    buttonSubmit.addEventListener("click",()=>{
        let permissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");
        // Lẩy ra từng dòng trong bảng bao gồm các ô input,..
        rows.forEach((row)=>{
            // Chạy qua từng dòng
            const name = row.getAttribute("data-name");
            // Lấy ra các id phân quyền
            const inputs = row.querySelectorAll("input");
            if(name==="id"){
                // Nếu là dòng đầu tiên Là dòng có id nhóm quyền
                inputs.forEach(input=>{
                    const id = input.value;
                    permissions.push({
                        id:id,
                        permissions: []
                    })
                })
            }else{
                inputs.forEach((input,index)=>{
                    const checked = input.checked;
                    if(checked){
                        // Thêm từng quyền vào các nhóm quyền
                        permissions[index].permissions.push(name);
                    }
                })
            }
        })
        if(permissions.length>0){
            // Dùng form để gửi lên BE thông tin là mảng permissions thông quan thuộc tính "value"
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
            //Chuyển thành chuỗi
            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    })
}
//End Permission

//Permissions Data Default
const dataRecords = document.querySelector("[data-records]");
//Vì không có data lên sẽ lấy qua thuộc tính
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions = document.querySelector("[table-permissions]");
    const rows = tablePermissions.querySelectorAll("[data-name]");
    records.forEach((record,index)=>{
        // rows.forEach(row=>{
        //     const inputs = row.querySelectorAll("input");
        //     console.log(inputs);
        //     const dataName = row.getAttribute("data-name");
        //     if(record.permissions.indexOf(dataName)>=0){
        //         inputs[index].checked=true;
        //     }
        // })
        // 2 cách
        const permissions = record.permissions;
        permissions.forEach(permission=>{
            const row =  tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked=true;
        })
    })
}
//End Permissions Data Default
