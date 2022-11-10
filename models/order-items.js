const Sequelize=require('sequelize')
const sequelizedb=require('../util/database')
const orderItems=sequelizedb.define('orderItems',{

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
module.exports=orderItems