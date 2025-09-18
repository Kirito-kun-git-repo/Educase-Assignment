const {Sequelize}=require('sequelize');
const sequelize= new Sequelize(
//     "school_db","root","root",{
//     host:"localhost",
//     dialect:"mysql"
// }

  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // "db" from docker-compose.yml
    dialect: "mysql",
  }
);
module.exports=sequelize;