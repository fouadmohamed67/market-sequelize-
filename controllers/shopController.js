 
const Product=require('../models/products'); 
const cart=require('../models/cart')
const getallProducts=(req,res)=>{
        Product.findAll().then(rows=>{
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

    Product.findAll().then(rows=>{
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
      req.user.getCart()
      .then(cart=>{

        if(!cart)
        {
            
           return res.render('shop/cart',
            {
                pageTitle:'cart',
                path:'/cart',
                products:[]
            })
        }
         return cart.getProducts()
         .then(products=>{
             
            res.render('shop/cart',
            {
                pageTitle:'cart',
                path:'/cart',
                products:products
            })
         })
         .catch(err=>{console.log(err)})
     })
      .catch(err=>{
        console.log(err)
     })
    
}
const cartPOST=(req,res)=>{ 
    const productID=req.body.productID
    let fetchedcart;
    let quantity=1


    req.user.getCart()
    .then(cart=>{
        fetchedcart=cart
        return cart.getProducts({where:{id:productID}})
    })
    .then(products=>{
        console.log(products)
        let product
        if(products.length>0)
        {
             product=products[0]
        }
       
        if(product){
            const oldQuantity=product.CartItem.quantity; 
            quantity=oldQuantity+1
            return product
        }
        return Product.findByPk(productID) 
    })
    .then(product=>{
        return fetchedcart.addProducts(product,{through:{quantity:quantity}})

    })
    .then(()=>{
        res.redirect('/cart')
    })
    .catch(err=>{
        console.log(err) 
    })

     
}
const PostDeleteFromCart=(req,res)=>{
    const productID=req.body.productId
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts({where:{id:productID}})
    })
    .then(products=>{
        const product=products[0]
        return product.CartItem.destroy()
    })
    .then(result=>{
        res.redirect('/cart')
    })
    .catch(err=>{console.log(err)})

}
const getCheckOut=(req,res)=>{
    res.render('shop/checkout',
    {
        pageTitle:'checkout',
        path:'/checkout'
    })
}
const postOrder=(req,res)=>{
    let targetcart
    req.user.getCart()
    .then(cart=>{
        targetcart=cart
        return cart.getProducts()
    })
    .then(products=>{
       return req.user.createOrder()
       .then(order=>{
        order.addProducts(
           
            products.map(prod=>{
            prod.orderItems={quantity:prod.CartItem.quantity}
            return prod
        }))
       })
       .catch(err=>{console.log(err)})
    })
    .then(result=>{
       return targetcart.setProducts(null)
        
    })
    .then(result=>{
        res.redirect('/orders')
    })
    .catch(err=>{console.log(err)})
}
const getorders=(req,res)=>{
    req.user.getOrders({include:['products']})
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
    Product.findAll({where:{id:id}}).then(row=>{
        res.render('shop/product-detail',
        { 
            pageTitle:'edit product',
            product:row[0],
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