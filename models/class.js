module.exports = function (sequelize, DataTypes){
    const Class = sequelize.define("Class",{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }

    });

    Class.associate = function(models){
        Class.belongsTo(models.User, {
            foreignKey:{
                allowNull: false
            }
        })
    }

    return Class;
}