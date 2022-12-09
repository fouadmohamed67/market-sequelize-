const crypto=require('crypto')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
const {validationResult}=require('express-validator')

const sendMail=require('../util/send_mail').sendMail
 
const getLoginPage=(req,res)=>{ 

    let message=req.flash('error')
    
    if(message.length>0)
    {
        message=message[0]
    }
    else
    {
        message=null
    }
    res.render('auth/login',
    {
        pageTitle:'login page',
        path:"/login",
        isAuth:req.session.isLoogedIn,
        errorMessage:message,
        oldInput:{email:'',password:''} 
    })  
   
}
const PostLogin=(req,res)=>{

    const email=req.body.email
    const password=req.body.password
 
    User.findOne({email:email})
    .then(user=>{
        if(!user)
        { 
            return res.status(422).render('auth/login',{
                pageTitle:'login page',
                path:"/login",
                isAuth:req.session.isLoogedIn,
                errorMessage:'invalid email or password',
                oldInput:{email:email,password:password} 
            })
            
        }
        bcrypt.compare(password,user.password)
        .then(result=>{
            if(result)
            {
                req.session.isLoogedIn=true
                req.session.user=user
                return  res.redirect('/') 
            }
            req.flash('error','invalid email or password')
            return res.redirect('/login')
            
        })
    })
    .catch(err=>{
        console.log(err)
        return res.redirect('/login')
    })
     
}
const PostLogout=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}
const getForgetPassword=(req,res)=>{
    let message=req.flash('error')
    
    if(message.length>0)
    {
        message=message[0]
    }
    else
    {
        message=null
    }
    return  res.render('auth/forgetPassword',
    {
        pageTitle:'resetPassword page',
        path:"/forgetPassword",
        isAuth:req.session.isLoogedIn,
        errorMessage:message
    }) 
}
const postForgetPassword=(req,res)=>{ 
    crypto.randomBytes(32,(err,buffer)=>{
        if(err)
        {
            console.log(err)
            return res.redirect('/forgetPassword')
        }
        const token=buffer.toString('hex')
        User.findOne({email:req.body.email})
        .then(user=>{ 
            if(!user)
            { 
                req.flash('error','email does not exist') 
                return  res.redirect('/forgetPassword')   
            } 
            user.resetToken=token
            user.resetExpire=Date.now()+3600000
            return user.save()  
            
        })
        .then(result=>{  
             
           res.redirect('/') 
           sendMail(req.body.email,'password reset','<p>click this link <a href="http://localhost:3000/reset/'+token+'" >link</a> to reset your password</p>')
         
        })
        
        .catch(err=>{ 
            console.log(err)
        })
    })
}
const getsignupPage=(req,res)=>{
    let messag=req.flash('error')
    if(messag.length>0)
    {
        messag=messag[0]
    }
    else
    {
        messag=null
    }
    res.render('auth/signup',{
        pageTitle:'signup page',
        path:"/signup",
        errorMessage:messag,
        oldInput:{email:'',password:'',confirmedPassword:''},
        validationErrors:[]

    })
}
const postSignup=(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const confirmedPassword=req.body.confirmedPassword
    const errors= validationResult(req)
     
    if(!errors.isEmpty())
    {  
        return res.status(422)
        .render('auth/signup',{
            pageTitle:'signup page',
            path:"/signup",
            errorMessage:errors.array()[0].msg,
            oldInput:{email:email,password:password,confirmedPassword:confirmedPassword},
            validationErrors:errors.array()
        })
    }
    User.findOne({email:email}).then(user=>{
        if(user)
        {
            req.flash('error','email already in use')
            return res.redirect('/signup')
        }
        return bcrypt.hash(password,10)
        .then(hashedPassword=>{
            const newuser=new User({
                email:email,
                password:hashedPassword,
                cart:{items: []}
            })
         newuser.save()
         })
        .then(()=>{ 


            sendMail(req.body.email,
                'signUp is done',
                '<p>you successfully signed up</p>') 
           
            res.redirect('/login')
        })
    })
    
    .catch(err=>{
        console.log(err)
    })
}
const getNewPassword=(req,res)=>{
   const token=req.params.token
   User.findOne({resetToken:token,resetExpire:{$gt:Date.now()}})
   .then(user=>{
        let messag=req.flash('error')
        if(messag.length>0)
        {
            messag=messag[0]
        }
        else
        {
            messag=null
        }
        res.render('auth/new-password',{
            pageTitle:'new-password page',
            path:"/new-password",
            errorMessage:messag,
            userId:user._id.toString(),
            token:token
        })
   })
   .catch(error=>{
    console.log(error)
   })  
}
const postnewPassword=(req,res)=>{
    let findeduser
    const userId=req.body.id
    const password=req.body.password
    const token=req.body.token
    
    User.findOne({_id:userId,resetToken:token,resetExpire:{$gt:Date.now()}})
    .then(user=>{
       
        findeduser=user
        return bcrypt.hash(password,12)
    })
    .then(hashedPassword=>{
        findeduser.password=hashedPassword
        findeduser.resetToken=undefined
        findeduser.resetExpire=undefined
       return findeduser.save()
    })
    .then(result=>{
        res.redirect('/login')
    })
    .catch(err=>{
        console.log(err)
    })
}
module.exports={
    getLoginPage,
    PostLogin,
    PostLogout,
    getsignupPage,
    postSignup,
    getForgetPassword,
    postForgetPassword,
    getNewPassword,
    postnewPassword
}