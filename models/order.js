const Sequelize=require('sequelize')
const sequelizedb=require('../util/database')
const order=sequelizedb.define('order',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    addres:{
        type:Sequelize.STRING
    }
    
})
module.exports=order