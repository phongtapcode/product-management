const express = require('express')
require("dotenv").config()
const route = require('./routes/client/index.route.js')
const routeAdmin = require('./routes/admin/index.route.js')
const systemConfig = require("./config/system.js")

const app = express()
const port = process.env.PORT
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public'))
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//cai đặt mongoose
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URL);
// const Products = mongoose.model('Product', {
//   title: String,
//   price: Number,
//   thumbnail: String
// });
const database = require("./config/database.js");
database.connect();


route(app)
routeAdmin(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})