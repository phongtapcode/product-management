// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length>0){
    let url = new URL(window.location.href);
    buttonStatus.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            e.preventDefault();
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status",status);
            }else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword)
        }else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}

// End Form Search


// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if(buttonPagination){
    let url = new URL(window.location.href);
    buttonPagination.forEach((button)=>{
        button.addEventListener("click",()=>{
            const currentPage = button.getAttribute("button-pagination");
            url.searchParams.set("page",currentPage);
            window.location.href = url.href;
        })
    })
}
// End Pagination


// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked==true){
        inputsId.forEach((input)=>{
            input.checked=true;
        })
    }else{
        inputsId.forEach((input)=>{
            input.checked=false;
        })
    }
    })

    inputsId.forEach(input=>{
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
            //Taọ ra 1 mảng các phần tử có checked = true
            if(countChecked.length==4){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }
        })
    })
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;
        if(typeChange=="delete-all"){
                const isConfirm = confirm("Bạn có chắn chắn muốn xóa những sản phẩm này?");
                if(!isConfirm){
                    return;
                }
        }
        if(inputChecked.length){
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            let ids = [];
            inputChecked.forEach(input=>{
                const id = input.value;
                if(typeChange=="change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    // closest lấy ta phần tử cha của nó
                    ids.push(`${id}-${position}`);
                }
                else{ids.push(id);}
            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }
    })
}
// End Form Change Multi

// Show alert
    const showAlert = document.querySelector("[show-alert]");
    if(showAlert){
        const time = parseInt(showAlert.getAttribute("data-time"));
        const closeAlert = document.querySelector("[close-alert]");
        setTimeout(()=>{
            showAlert.classList.add("alert-hidden");
        },time);
        closeAlert.addEventListener("click",()=>{
            showAlert.classList.add("alert-hidden");
        })
    }
// End show alert

// upload image
const uploadImage = document.querySelector("[upload-image]");

if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change",(e)=>{
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// End upload image

// Sort 
const sort = document.querySelector("[sort]");
if(sort){
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    let url = new URL(window.location.href);
    sortSelect.addEventListener("change",(e)=>{
        const [sortKey,sortValue] = e.target.value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);
        window.location.href = url.href;
    })      
    // Clear Sort
    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelect = sortSelect.querySelector(`option[value=${stringSort}]`);
        optionSelect.selected = true;
    }
}

// End sort