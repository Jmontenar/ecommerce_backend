const { getAll, purchaseCart } = require('../controllers/pruchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, purchaseCart)


module.exports = purchaseRouter;