const express = require('express');
const userRouter = require('./user.router');
const routerCategory = require('./category.router.js');
const routerProduct = require('./product.router');
const ProductImgrouter = require('./productImg.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter )
router.use("/category", routerCategory)
router.use("/product", routerProduct)
router.use("/product_img", ProductImgrouter)
router.use("/cart", cartRouter)
router.use("/purchase", purchaseRouter)

module.exports = router;