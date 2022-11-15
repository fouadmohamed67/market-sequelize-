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
    console.log(productID)
    Product.getById(productID).then(product=>{
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
    const userId=req.user._id
    const product=new Product(title,description,price,imageUrl,null,userId) 
    try { 
        product.save()
        .then(result=>{
            res.redirect('/products')
        })
        .catch(err=>{
            console.log(err)
        })
       
    } catch (error) { 
        console.log(error)
    }
     
}
const getproducts= async (req,res)=>{
    Product.getAll()
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
    const product=new Product(title,description,price,imageUrl, id)
    product.save()
    .then(result=>{
        return res.redirect('/admin/products')
    })
    .catch(err=>{
        console.log(err)
    })
   
}
const deleteproduct= async (req,res)=>{
    const id=req.body.id
    Product.deleteById(id)
    .then(result=>
        {return res.redirect('/admin/products')})
    .catch(err=>{
        console.log(err)
    })    
}

module.exports={getaddProducts,getProductsPost,getproducts,geteditProducts,updateProduct,deleteproduct} 