const Sequelize=require('sequelize')
const sequelizedb=require('../util/database')
const User=sequelizedb.define('user',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        
    } 
})
module.exports=User