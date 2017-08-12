/**
 * 团队类
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('team', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true
    },
    global_key: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'global_key'
    },
    owner_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'owner_id'
    },
    created_at: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'created_at'
    },
    updated_at: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'updated_at'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    name_pinyin: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'name_pinyin'
    },
    introduction: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    member_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'member_count'
    },
    project_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'project_count'
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    comment: '团队表',
    tableName: 'd_team',
    indexes: [
      {
        unique: true,
        fields: ['global_key']
      }
    ]
  });
