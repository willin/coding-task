/**
 * 关联任务和标签
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('tasklabels', {
    task_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'task_id',
      primaryKey: true
    },
    label_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'label_id',
      primaryKey: true
    }
  }, {
    comment: '任务标签表',
    tableName: 'd_tasklabel'

  });
