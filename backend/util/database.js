const Sequelize=require('sequelize');

const instance=new Sequelize('Chat','root','1974',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=instance;
