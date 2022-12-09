 const Product=require('../models/products'); 
const Order=require('../models/orders')
const getallProducts=(req,res)=>{
        Product
        .find()
        .then(rows=>{
            res.render('shop/product-list',
            {
                prods:rows,
                pageTitle:'all products',
                path:"/products" 
            })  
        }).catch(error=>{
            console.log(error)
        }) 
       
}
const getIndex=(req,res)=>{ 
    Product
    .find().
    then(rows=>{
        res.render('shop/index',
        {
            prods:rows,
            pageTitle:'shop',
            path:"/", 
            csrfToken:req.csrfToken()
        })  
    }).catch(error=>{
        console.log(error)
    })  
}
const getCart=(req,res)=>{
    req.user.populate('cart.items.productId')
    .then(products=>{ 
        return res.render('shop/cart',
        {
            pageTitle:'cart',
            path:'/cart',
            products:products.cart.items 
        })
    }) 
    
}
const cartPOST=(req,res)=>{ 
    const productID=req.body.productID 
    Product.findById(productID)
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
    req.user
    .deleteFromCart(productID)
    .then(result=>{
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
    req.user
    .populate('cart.items.productId') 
    .then(products=>{
         
        const order=new Order({
            products:products.cart.items,
            user:{name:req.user.email,userId:req.user._id}
            
    })
    return order.save()
    .then(()=>{
        req.user.clearCart()
    })
    .then(()=>{
       
        res.redirect('/orders')
    })
    .catch(err=>{console.log(err)})
    
    })
   
}
const getorders=(req,res)=>{
    Order.find({'user.userId':req.user._id})
    .then(orders=>{
        console.log(orders.products)
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
    Product
    .findById(id)
    .then(row=>{
        res.render('shop/product-detail',
        { 
            pageTitle:'product details',
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