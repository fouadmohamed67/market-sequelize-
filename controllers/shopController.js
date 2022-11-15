 
const Product=require('../models/products'); 
   
const getallProducts=(req,res)=>{
        Product.getAll().then(rows=>{
            res.render('shop/product-list',
            {
                prods:rows,pageTitle:'all products',
                path:"/products"
            })  
        }).catch(error=>{
            console.log(error)
        }) 
       
}
const getIndex=(req,res)=>{

    Product.getAll().then(rows=>{
        res.render('shop/index',
        {
            prods:rows,pageTitle:'shop',
            path:"/"
        })  
    }).catch(error=>{
        console.log(error)
    }) 
     
}
const getCart=(req,res)=>{
    req.user.getCart().then(products=>{
       
        return res.render('shop/cart',
        {
            pageTitle:'cart',
            path:'/cart',
            products:products
        })
    })
    
    
}
const cartPOST=(req,res)=>{ 
    const productID=req.body.productID 
    Product.getById(productID)
    .then(product=>{  
        return req.user.addToCart(product)
    })
    .then(()=>{
       return  res.redirect('/cart')
    })
    .catch(err=>{
        console.log(err)
    })
     
}
const PostDeleteFromCart=(req,res)=>{
    const productID=req.body.productId
    req.user.deleteFromCart(productID).then(result=>{
        res.redirect('/cart')
        
    })
    .catch(err=>{
        console.log(err)
    })
    

}
const getCheckOut=(req,res)=>{
    res.render('shop/checkout',
    {
        pageTitle:'checkout',
        path:'/checkout'
    })
}
const postOrder=(req,res)=>{
    
    req.user.addOrder()
    .then(result=>{
        console.log("sssssssssssss")
        res.redirect('/orders')
    })
    .catch(err=>{
            console.log(err)
        })
}
const getorders=(req,res)=>{
    req.user.getOrders()
    .then(orders=>{
         res.render('shop/orders',
        {
            orders:orders,
            pageTitle:'orders',
            path:'/orders'
        })
    })
    .catch(err=>{console.log(err)})
   
}
const getProduct=(req,res)=>{
    const id=req.params.id

    Product.getById(id).then(row=>{
        res.render('shop/product-detail',
        { 
            pageTitle:'edit product',
            product:row,
            path:'/products'
        })
    }).then(err=>{
        console.log(err) 
    })
}


module.exports={
    getallProducts,
    getIndex,
    getCart,
    getCheckOut,
    getorders,
    getProduct,
    cartPOST,
    PostDeleteFromCart,
    postOrder
} 