const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart')

const getAll = catchError(async(req, res) => {

    const result = await Purchase.findAll({where: {userId: req.user.id}})
    return res.json(result)
});

const purchaseCart = catchError(async(req, res) => {
    const cart = await Cart.findAll({where:{userId: req.user.id}})
    cart.forEach(async product =>{
        await Purchase.create({
            quantity: product.quantity,
            productId: product.productId,
            userId: product.userId       
    });
})
    return res.json(cart)
});

module.exports = {
    getAll,
    purchaseCart
}