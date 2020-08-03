const Sequelize = require('sequelize');

module.exports = new Sequelize('Job-Portal', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});
