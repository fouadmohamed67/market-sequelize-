const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
       items:[
        {
            productId:{type : Schema.Types.ObjectId,ref:'Product'},
            quantity:{type : Number,required:true}
        }]
    }
})
userSchema.methods.addToCart= function(product){
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
        newcartitems.push({
            productId:product._id ,
            quantity:newquantity
        })
    }
    const  newcart={items:newcartitems} 
    return this.save() 
} 
userSchema.methods.deleteFromCart=function(productId){  
        const newcartitems=this.cart.items.filter(item=>{
            return item.productId.toString() !== productId.toString()
        })
        this.cart.items=newcartitems
       return this.save()
        
    
}
userSchema.methods.clearCart=function(){
    this.cart.items=[]
    return this.save()
}
module.exports=mongoose.model('User',userSchema)
/** 
     
    
   
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
module.exports=User */