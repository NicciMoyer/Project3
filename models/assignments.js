module.exports = function (sequelize, DataTypes){
    const Assignment = sequelize.define("Assignment",{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        weight: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
              min:0,
              max:100
            }
        }

    });
    //associate with user ID from teacher
    Assignment.associate = function(models){
        Assignment.belongsTo(models.User, {
            foreignKey:{
                as: "teacher",
                allowNull: false
            }
        })
    }

    return Assignment;
}