const express = require('express') 
const app=express(); 
app.set('view engine','ejs')
app.set('views','views')  
const mongoose=require('mongoose')
const session=require('express-session') 
const mongodbstore=require('connect-mongodb-session')(session)
const store=new mongodbstore({
   uri: 'mongodb+srv://fouad:07906028@cluster0.zvwvnib.mongodb.net/shop?w=majority',
   collection:'sessions'
})
const csrf=require('csurf')
const flash= require('connect-flash')

const csrfProtection=csrf()


const adminRouter=require('./routes/admin')
const shopRouter=require('./routes/shop');
const authRouter=require('./routes/auth')

const User=require('./models/user')
 

const errorController=require('./controllers/404Cntroller')

const bodyParser = require('body-parser');
const path = require('path');
 
//for css files
app.use(express.static(path.join(__dirname,'public')))  
app.use(bodyParser.urlencoded({extended:false}))
app.use(
    session(
    {
        secret:'fo2sha doksha',
        resave:false,
        saveUninitialized:false,
        store:store
    }))



app.use(csrfProtection)
app.use(flash())
app.use((req,res,next)=>{
    if(!req.session.user)
    { 
        return next()
    }
    User.findById(req.session.user._id)
    .then(user=>{  
     req.user=user
     next()
    })
 })

app.use((req,res,next)=>{
    res.locals.isAuth=req.session.isLoogedIn
    res.locals.csrfToken=req.csrfToken()
    next()
})

app.use('/admin',adminRouter)
app.use(shopRouter)  
app.use(authRouter)
app.use(errorController.getNotFound)


mongoose.connect('mongodb+srv://fouad:07906028@cluster0.zvwvnib.mongodb.net/shop?w=majority')
.then(result=>{
    
     app.listen(3000)
      
})
.catch(err=>{
    console.log(err)
})