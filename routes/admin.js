const express=require('express');

const Router=express.Router();

const adminController=require('../controllers/adminController')
// /admin/products
 Router.get('/add-product',adminController.getaddProducts )
 Router.post('/products',adminController.getProductsPost)
 Router.get('/products',adminController.getproducts)
 Router.get('/edit-product/:id',adminController.geteditProducts)
 Router.post('/update-product',adminController.updateProduct)
 Router.post('/delete-prouct',adminController.deleteproduct)
 
 module.exports=Router 