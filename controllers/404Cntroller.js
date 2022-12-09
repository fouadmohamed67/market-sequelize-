const path = require('path');
const dir=require('../util/path')
const getNotFound=(req,res,next)=>{
    res.render('404',
    {
        pageTitle:'404',
        path:'/404',
        isAuth:req.session.isLoogedIn
    });
}

module.exports={getNotFound} 