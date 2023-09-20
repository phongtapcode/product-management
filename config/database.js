const mongoose = require("mongoose");

module.exports.connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Success");
    } catch (err) {
        console.log("Lỗi");
    }
}
// module.exports.connect = () => {
//     console.log(123)
// }