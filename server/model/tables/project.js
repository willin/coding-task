/**
 * 项目(仓库)类
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('project', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
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
    owner_user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'owner_user_name'
    },
    backend_project_path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'backend_project_path'
    },
    owner_user_picture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'owner_user_picture'
    },
    owner_user_home: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'owner_user_home'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    owner_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'owner_id'
    },
    project_path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'project_path'
    },
    status: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    type: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    fork_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'fork_count'
    },
    star_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'star_count'
    },
    watch_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'watch_count'
    },
    un_read_activities_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'un_read_activities_count'
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_plubic'
    },
    pin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    recommended: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    max_member: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'max_member'
    },
    groupId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    isTeam: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    plan: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    current_user_role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'current_user_role_id'
    },
    current_user_role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'current_user_role'
    },
    stared: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    watched: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    forked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    comment: '项目表',
    tableName: 'd_project',
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });
