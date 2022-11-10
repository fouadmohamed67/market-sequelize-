const Sequelize=require('sequelize')
const sequelizedb=require('../util/database')
const CartItem=sequelizedb.define('CartItem',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER 
    } 
})
module.exports=CartItem