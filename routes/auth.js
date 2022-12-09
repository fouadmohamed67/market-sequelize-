const express=require('express');
const {check}=require('express-validator')
const Router=express.Router();
const authController=require('../controllers/authController')

Router.get('/login',authController.getLoginPage)
Router.post('/login',authController.PostLogin)
Router.post('/logout',authController.PostLogout)
Router.get('/signup',authController.getsignupPage)

Router.post('/signup',[
check('email').isEmail().withMessage('please enter valid email'),
check('password','please enter at least 5 characters').isLength({min:5}),
check('confirmedPassword').custom((p,{req})=>{
    if(p !== req.body.password)
    {
        throw new Error('passwords have no matches')
    }
    return true
})],
authController.postSignup)




Router.get('/forgetPassword',authController.getForgetPassword)
Router.post('/reset',authController.postForgetPassword) 
Router.get('/reset/:token',authController.getNewPassword)
Router.post('/resetnewPassword',authController.postnewPassword) 
module.exports=Router 