const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');


class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Post title is required.'
            }
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Post content is required.'
            }
        }
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post',
    underscored: true
});


module.exports = Post;