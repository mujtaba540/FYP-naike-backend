const { Sequelize } = require("sequelize");
//---------------------------Schema name,username,password
//online DB
// module.exports=new Sequelize("ZHbVfdC3aa","ZHbVfdC3aa","Tyhy7p8EAK",{
//     host:"remotemysql.com",
//     dialect:"mysql",
//     define: {
//         timestamps: false
//     }
// });


//local DB
// module.exports=new Sequelize("internship","root","1122",{
//     host:"127.0.0.1",
//     dialect:"mysql",
//     define: {
//         timestamps: false
//     }
// });

//postgres DB local
// module.exports=new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
//     host:process.env.DB_HOST,
//     dialect:"postgres",
//     port:process.env.DB_PORT,
//     define: {
//         timestamps: false
//     },
// });

//heroku DB
module.exports=new Sequelize(process.env.HEROKU_DB_DATABASE,process.env.HEROKU_DB_USER,process.env.HEROKU_DB_PASSWORD,{
    host:process.env.HEROKU_DB_HOST,
    dialect:"postgres",
    port:process.env.HEROKU_DB_PORT,
    define: {
        timestamps: false
    },
});

