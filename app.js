const express = require('express') 
const app=express(); 
app.set('view engine','ejs')
app.set('views','views') 

const mongoose=require('mongoose')

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
    User.findById('6374ae4f7a07a5b1da8eae25')
    .then(user=>{ 
     req.user=user
     next()
    })
 })

app.use('/admin',adminRouter)
app.use(shopRouter)  
app.use(errorController.getNotFound)


mongoose.connect('mongodb+srv://fouad:07906028@cluster0.zvwvnib.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
     app.listen(3000)
      
})
.catch(err=>{
    console.log(err)
})