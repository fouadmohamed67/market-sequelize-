const path = require('path');
const dir=require('../util/path')
const getNotFound=(req,res,next)=>{
    res.render('404',{pageTitle:'404',path:'/404'});
}

module.exports={getNotFound}