const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

User.beforeCreate(async(user)=>{
    const encriptedpassword = await bcrypt.hash(user.passsword, 10);
    user.password = encriptedpassword;
})
User.prototype.toJSON = function(){
    const values = Objects.assign({}, this.get());
    delete values.password;
    return values
}



module.exports = User
