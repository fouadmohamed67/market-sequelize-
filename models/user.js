const mongodb = require('mongodb');
const getdb=require('../util/database').getdb;
class User{
    constructor(username,email,id,cart){
        this.username=username
        this.email=email
        this._id= id ? new mongodb.ObjectId(id):null
        this.cart=cart
    }
    save()
    {
        const db=getdb();
        if(this._id)
        { 
            return db
            .collection('users')
            .updateOne({_id:this._id},{$set:this})
            .then()
            .catch(err=>{
                console.log(err)
            })
        }  
        else
        {
            return db.collection('users').insertOne(this)
        }
    }
    addToCart(product){
        //return index if there any item or -1 if there is no items
        
        const cartindex = this.cart.items.findIndex(cp=>{ 
            return cp.productId.toString() === product._id.toString()
        })
 
        let newquantity=1
        const newcartitems=this.cart.items
        if(cartindex>=0)
        {
            newquantity= this.cart.items[cartindex].quantity +1;
            newcartitems[cartindex].quantity=newquantity
        }
        else
        {
            newcartitems.push({productId:new mongodb.ObjectId(product._id) ,quantity:newquantity})
        }
       const  newcart={items:newcartitems}

        const db=getdb();  
        return db
        .collection('users')
        .updateOne(
            {_id: this._id},
            {$set: {cart:newcart}}
            )
        .then(result=>{
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    getCart(){
        const db=getdb();
        const IDS=this.cart.items.map(item=>{
            return item.productId
        }) 
        return db
        .collection('products')
        .find({_id:{$in : IDS}})
        .toArray()
        .then(products=>{
            return products.map(product=>{
                return{
                    product,
                    quantity:this.cart.items.find(i=>{
                        return i.productId.toString() === product._id.toString()
                    }).quantity}
            })
            
        })
        .then(result=>{
           return result
        })


    }
    deleteFromCart(productId)
    {
        const db=getdb();
        const newcartitems=this.cart.items.filter(item=>{
            return item.productId.toString() !== productId.toString()
        })
       return db
        .collection('users')
        .updateOne({_id:this._id},
                   {$set:{cart : {items: newcartitems} }})
        .then(result=>{
          
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
    static  findById(id){ 
        const db=getdb();
        return db
        .collection('users')
        .findOne({_id:mongodb.ObjectId(id)})
        .then(user=>{
            
            return user
        })
        .catch(err=>{
            console.log(err)
        })
    }
    addOrder(){
        const db=getdb();
       return this.getCart().then(products=>{
            const order={
                items:products,
                user:{
                    _id:new mongodb.ObjectId(this._id),
                    username:this.username,
                    email:this.email
                }
            }
            return db
            .collection('orders')
            .insertOne(order)
        }).then(result=>{ 
                this.cart={items:[]}
                return db
                .collection('users')
                .updateOne({_id:this._id},
                           {$set:{cart : {items:[]}} })
                
           
        })
        .catch(err=>{
            console.log(err)
        })
       

    }
    getOrders(){
        const db=getdb()
        return db
        .collection('orders')
        .find({'user._id':new mongodb.ObjectId(this._id)})
        .toArray()
    }

    
}
module.exports=User