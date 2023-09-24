module.exports = (query)=>{
    let filterStatus = [
        {
          name: "Tất cả",
          status: "",
          class: "active"
        },
        {
          name: "Hoạt động",
          status: "active",
          class: ""
        },
        {
          name: "Dừng hoạt động",
          status: "inactive",
          class: ""
        }
      ]
      if(query.status){
        filterStatus.forEach((item)=>{
          if(item.status === query.status){
            item.class = "active";
          }else{
            item.class = "";
          }
        })  
      }
      return filterStatus;
}