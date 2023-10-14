const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./sequelize');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull:false,
        validate: {
            notNull: {
                msg: 'Username is required.'
            },
            len: {
                args: [4, 15],
                msg: "Username length should be between 4 and 15 characters."

            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notNull: {
                msg: 'Password is required.'
            },
            validate(value){
                if(value.length < 8){
                    throw new Error('Password length should be more than 8 characters!');
                }
            },
        },
        set(value) {
            if(value.length < 8) throw ({error: {message: 'Password length should be more than 8 characters!'}});
            this.setDataValue('password', bcrypt.hashSync(value, 10));
        }

    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
        validate: {
            isEmail: {
                msg: "Enter a valid email address!"
            },
            notNull: {
                msg: 'Email is required.'
            },
        }
    },
    roles: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue: "user"
    }
}, {
    sequelize,
    modelName:'User',
    underscored: true
});


module.exports = User;