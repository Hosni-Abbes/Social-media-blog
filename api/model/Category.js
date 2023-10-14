const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');


class Category extends Model {}

Category.init({
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Category',
    underscored: true
});

module.exports = Category;