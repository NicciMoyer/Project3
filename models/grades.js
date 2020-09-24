module.exports = function (sequelize, DataTypes){
    const Grade = sequelize.define("Grade",{
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
              min:0,
              max:100
            }
        }

    });
    //associate with user ID from student
    Grade.associate = function(models){
        Grade.belongsTo(models.User, {
            foreignKey:{
                as: "student",
                allowNull: false
            }
        })
    }
    Grade.associate = function(models){
        Grade.belongsTo(models.Assignment, {
            foreignKey:{
                as: "assignment",
                allowNull: false
            }
        })
    }

    return Grade;
}