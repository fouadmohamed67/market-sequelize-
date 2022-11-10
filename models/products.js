const Sequelize=require('sequelize')
const sequelizedb=require('../util/database')
const Product=sequelizedb.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
    
})
module.exports=Product