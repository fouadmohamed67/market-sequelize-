const express=require('express'); 
const Router=express.Router();
const middlewareAuth=require('../middleware/isAuth')
const adminController=require('../controllers/adminController')
const {check}=require('express-validator')
// /admin/products
 Router.get('/add-product',middlewareAuth,adminController.getaddProducts )
 Router.post('/products',
 [
   check('title').isAlphanumeric().isLength({min:3}).trim(),
   check('description').isLength({min:5}).trim(),
   check('price').isFloat(),
   check('imageUrl').isAlphanumeric()
 ]
 ,middlewareAuth,adminController.getProductsPost)
 Router.get('/products',middlewareAuth,adminController.getproducts)
 Router.get('/edit-product/:id',middlewareAuth,adminController.geteditProducts)
 Router.post('/update-product',middlewareAuth,adminController.updateProduct)
 Router.post('/delete-prouct',middlewareAuth,adminController.deleteproduct)
 
 module.exports=Router 