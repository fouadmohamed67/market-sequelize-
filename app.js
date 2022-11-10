const express = require('express')
  
const app=express();

app.set('view engine','ejs')
app.set('views','views')

const Product=require('./models/products')
const User=require('./models/user') 
const Cart=require('./models/cart')
const order=require('./models/order')
const orderItem=require('./models/order-items')




const adminRouter=require('./routes/admin')
const shopRouter=require('./routes/shop');

const errorController=require('./controllers/404Cntroller')

const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database');
const CartItem = require('./models/cart-item');

//for css files
app.use(express.static(path.join(__dirname,'public')))  
app.use(bodyParser.urlencoded({extended:false}))


app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user
        next()
    })
    .catch(error=>{
        console.log(error)
    })
})


app.use('/admin',adminRouter)
app.use(shopRouter)  
app.use(errorController.getNotFound)

Product.belongsTo(User,{constrain:true,onDelete:'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})
order.belongsTo(User)
User.hasMany(order)
order.belongsToMany(Product,{through:orderItem})



sequelize
//{force:true}
.sync()
.then(result=>{
   return User.findByPk(1); 
   
}).then(user=>{
    if(!user)
    { 
      return  User.create({username:'fouad',email:'fouad@123'})
    }
     
    return user
}).then(user=>{
   // user.createCart();
}).then(cart=>{
   
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})
