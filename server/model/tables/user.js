/**
 * 用户类
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
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
    name_pinyin: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field: 'name_pinyin'
    },
    sex: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    slogan: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
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
    gravatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    lavatar: {
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
    last_logined_at: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'last_logined_at'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    updated_at: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'updated_at'
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    is_member: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'is_member'
    },
    vip: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    degree: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    follows_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'follows_count'
    },
    fans_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'fans_count'
    },
    tweets_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: 'tweets_count'
    },
    followed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    follow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    comment: '用户表',
    tableName: 'd_user',
    indexes: [
      {
        unique: true,
        fields: ['global_key']
      }
    ]
  });
