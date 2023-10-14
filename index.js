const express = require('express')
const route = require('./routes/client/index.route.js')
const routeAdmin = require('./routes/admin/index.route.js')
const systemConfig = require("./config/system.js")
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var flash = require('express-flash')

require("dotenv").config()
const app = express()
app.use(methodOverride('_method'))
const port = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Flash
// Hiện thị thông báo mỗi khi thay đổi bên BE
app.use(cookieParser('Bất kì'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
//  Bắt buộc phải thêm biến __dirname để deploy code được vì nó ko hiểu
app.use(express.static(`${__dirname}/public`))
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


// khi form được submid thì sẽ nhận được atribute name và value của ô input đó