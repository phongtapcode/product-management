module.exports.generateRandomString = (length)=>{
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for(let i=0; i<length; i++){
        result+=char.charAt(Math.floor(Math.random()*char.length));
    }
    return result;
}