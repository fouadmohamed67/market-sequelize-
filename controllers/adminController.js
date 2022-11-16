mongodb = require('mongodb');
const Product=require('../models/products')  
const getaddProducts=(req,res)=>{ 
    res.render('admin/edit-product',
    {
        pageTitle:'add product',
        path:'/admin/add-product',
        edit:false
    }) 
}
const geteditProducts=async (req,res)=>{

    const  editMode=(req.query.edit ==='true')  
    if(!editMode)
    {
      return  res.redirect('/')
    }
    const productID=req.params.id;
    
    Product
    .findById(productID)
    .then(product=>{
        res.render('admin/edit-product',
        {
            pageTitle:'edit product',
            path:'/admin/edit-product',
            edit:editMode,
            product:product
        })
    }).catch(err=>{
        console.log(err)
    })
   
}
const getProductsPost=async (req,res)=>{

    const title=req.body.title
    const price=req.body.price
    const description=req.body.description
    const imageUrl=req.body.imageUrl  
    const product=new Product({
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        userId:req.user._id
    })  
    product.save()
    .then(result=>{
        res.redirect('/products')
    })
    .catch(err=>{
        console.log(err)
    }) 
     
}
const getproducts= async (req,res)=>{
    Product.find()
     .then(rows=>{ 
        res.render('admin/products',
        {
            prods:rows,
            pageTitle:'admin products',
            path:"/admin/products"
        }) 
    }).catch(error=>{
        console.log(error)
    })
      
}
const updateProduct= async (req,res)=>{
    const id=req.body.id
    const title=req.body.title
    const price=req.body.price
    const description=req.body.description
    const imageUrl=req.body.imageUrl
    Product
    .findById(id)
    .then(product=>{ 
        product.title=title
        product.price=price
        product.description=description
        product.imageUrl=imageUrl 
        return product.save()
    }) 
    .then(result=>{
        return res.redirect('/admin/products')
    })
    .catch(err=>{
        console.log(err)
    })
   
}
const deleteproduct= async (req,res)=>{
    const id=req.body.id
    Product.findByIdAndDelete(id)
    .then(result=>
        {return res.redirect('/admin/products')})
    .catch(err=>{
        console.log(err)
    })    
}

module.exports={getaddProducts,getProductsPost,getproducts,geteditProducts,updateProduct,deleteproduct} 