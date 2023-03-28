const { getAll, create, remove } = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const ProductImgrouter = express.Router();

ProductImgrouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single("image"), create)
    
ProductImgrouter.route('/:id')
    .delete(verifyJWT, remove)

module.exports = ProductImgrouter;