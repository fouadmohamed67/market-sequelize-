const express = require('express') 
const app=express(); 
app.set('view engine','ejs')
app.set('views','views') 
const mongodb=require('./util/database').connection
const adminRouter=require('./routes/admin')
const shopRouter=require('./routes/shop');
const User=require('./models/user')




const errorController=require('./controllers/404Cntroller')

const bodyParser = require('body-parser');
const path = require('path');
 
//for css files
app.use(express.static(path.join(__dirname,'public')))  
app.use(bodyParser.urlencoded({extended:false}))
 
app.use((req,res,next)=>{
    
    User
    .findById('636e2fbb0a63bc1d689b3fd6')
    .then(user=>{ 
        req.user=new User(user.username,user.email,user._id,user.cart)
        next()
    })
    .catch(err=>{
        console.log(err)
    })
})

app.use('/admin',adminRouter)
app.use(shopRouter)  
app.use(errorController.getNotFound)

mongodb(()=>{
    
    app.listen(3000)
})