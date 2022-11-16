const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient

let _db
const connection=(callback)=>{
    Mongoclient.connect('mongodb+srv://fouad:07906028@cluster0.zvwvnib.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
    _db=result.db()
   
    callback()
    console.log("connected")
})
.catch(err=>{
    console.log(err)
 })
}
const getdb=()=>{
    if(_db)
    { 
        return _db
    }
    throw 'not connected'
}

exports.connection=connection
exports.getdb=getdb