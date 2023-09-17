const express = require('express')
const route = require('./routes/client/index.route.js')
const app = express()
const port = 3000
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public'))

// //cai đặt mongoose
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/products-test');
// const Products = mongoose.model('Product', {
//   title: String,
//   price: Number,
//   thumbnail: String
// });

route(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})