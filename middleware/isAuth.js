module.exports=(req,res,next)=>{
    if(!req.session.isLoogedIn)
    {
        return res.redirect('/login')
    }
    next()
}