module.exports = (query) => {
    let objectSearch = {
        keyword: ""
    }
    if(query.keyword){
      objectSearch.keyword = query.keyword;
      var regex = new RegExp(objectSearch.keyword,"i");
      objectSearch.regex = regex;
    //   find.title = regex;
    }
    return objectSearch;
} 