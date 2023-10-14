const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class Image extends Model {}

Image.init({
    image: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Image',
    underscored: true
})

module.exports = Image;