const Sequelize=require('sequelize')
const sequelizedb=require('../util/database')
const Cart=sequelizedb.define('cart',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    
})
module.exports=Cart