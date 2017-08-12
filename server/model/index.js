const Sequelize = require('sequelize');
const { mysql: { host, user, password, database } } = require('../config');

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  define: {
    paranoid: true,
    underscored: true,
    timestamps: false
  }
});

const User = sequelize.import('./tables/user');
const Team = sequelize.import('./tables/team');
const Project = sequelize.import('./tables/project');
const Task = sequelize.import('./tables/task');
const Label = sequelize.import('./tables/label');
const TaskLabels = sequelize.import('./tables/tasklabels.js');

User.hasMany(Team, {
  foreignKey: 'owner_id',
  key: 'id',
  as: 'Teams'
});

Team.belongsTo(User, {
  as: 'Owner'
});

Project.hasMany(Label, {
  foreignKey: 'project_id',
  key: 'id',
  as: 'Labels'
});

Project.hasMany(Task, {
  foreignKey: 'project_id',
  key: 'id',
  as: 'Tasks'
});

Task.belongsTo(Project);
Label.belongsTo(Project);

sequelize.sync({ force: false });

module.exports = {
  sequelize,
  model: {
    User,
    Team,
    Project,
    Task,
    Label,
    TaskLabels
  }
};
