const express=require('express')
const Router=express.Router();
const middlewareAuth=require('../middleware/isAuth')
const shopController=require('../controllers/shopController')
Router.get('/',shopController.getIndex)
Router.get('/products',shopController.getallProducts)
Router.get('/cart',middlewareAuth,shopController.getCart)
Router.post('/cart',middlewareAuth,shopController.cartPOST)
Router.get('/checkout',middlewareAuth,shopController.getCheckOut)
Router.get('/orders',middlewareAuth,shopController.getorders)
Router.get('/products/:id',middlewareAuth,shopController.getProduct)
Router.post('/cart-delete-item',middlewareAuth,shopController.PostDeleteFromCart)
Router.post('/create-order',middlewareAuth,shopController.postOrder)
module.exports=Router