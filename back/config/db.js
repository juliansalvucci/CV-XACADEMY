require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const initializeDb = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been successful!');
    } catch(error) {
        console.error('Failed to connect to database!', error);
    }
};

module.exports = { sequelize, initializeDb };