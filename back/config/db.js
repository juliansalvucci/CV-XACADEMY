const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hello_world_db', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost',
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