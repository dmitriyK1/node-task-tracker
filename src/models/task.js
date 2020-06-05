module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      values: ['View', 'In Progress', 'Done'],
      type: DataTypes.ENUM,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
    },
  }, {});

  Task.associate = function (models) {};

  return Task;
};
