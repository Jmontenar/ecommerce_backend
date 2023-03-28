const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User')
require('../models/Category')
require('../models/Product')
require('../models')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstname: "XUser",
            lastname: "UserX",
            email: "userX@gmail.com",
            password: "123456",
            phone: "124456789"
        })       
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();