module.exports = function (sequelize, DataTypes){
    const ClassRoster = sequelize.define("ClassRoster",{

    });

    ClassRoster.associate = function(models){
        ClassRoster.belongsTo(models.Class, {
            foreignKey:{
                allowNull: false
            }
        })
    }
    ClassRoster.associate = function(models){
        ClassRoster.belongsTo(models.User, {
            foreignKey:{
                allowNull: false
            }
        })
    }

    return ClassRoster;
}