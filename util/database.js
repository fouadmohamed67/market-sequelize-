const Sequelize=require('sequelize')
const sequelize=new Sequelize('nodemvc','root','root',
{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize