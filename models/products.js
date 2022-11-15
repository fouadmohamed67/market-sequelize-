const mongodb = require('mongodb');
const getdb=require('../util/database').getdb;
class Product{
    constructor(title,description,price,imageUrl,id,userId)
    {
        this.title=title
        this.description=description
        this.price=price
        this.imageUrl=imageUrl
        this._id= id ? new mongodb.ObjectId(id):null
        this.userId=userId
    } 
    save()
    {       
        const db = getdb()
        if(this._id)
        { 
            return db
            .collection('products')
            .updateOne({_id:this._id},{$set:this})
            .then()
            .catch(err=>{
                console.log(err)
            })
        }   
        else
        {
            
            return  db
            .collection('products')
            .insertOne(this)
            .then()
            .catch(err=>{
                console.log(err)
            })
        } 
    }
    static getAll()
    {
        const db = getdb()
        return db.collection('products').find().toArray();
    }
    static getById(id)
    {  
        const db = getdb()
        return db.collection('products')
        .find({_id:new mongodb.ObjectId(id)})
        .next()
        .then(product => { 
            return product;
        })
        .catch(err => {
            console.log(err);
        });;
    }
    static deleteById(id){
        const db = getdb()
       return db.collection('products')
        .deleteOne({ _id : new mongodb.ObjectId(id) })
          
        .then(result=>{
            
        })
        .catch(err=>{
            console.log(err);
        })
    
    }
}
 
    
    
 
module.exports=Product