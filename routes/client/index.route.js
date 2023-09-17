const productRoutes = require('./products.route.js')
const homeRoutes = require('./home.route.js')
module.exports = (app) => {
    app.get('/', homeRoutes)
    app.use("/products",productRoutes)
}