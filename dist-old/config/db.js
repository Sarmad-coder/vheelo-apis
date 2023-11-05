"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dbConfig = {
    HOST: 'localhost',
    PORT: '3306',
    USER: 'root',
    PASSWORD: 'Devils@dvocate007',
    DB: 'cab5',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
};
exports.sequelize = new sequelize_1.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases:false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        idle: dbConfig.pool.idle,
        acquire: dbConfig.pool.acquire,
    }
});
exports.sequelize.authenticate().then(() => {
    console.log('Connected to database');
    console.log('Creating tables');
}).catch((err) => {
    console.log(err);
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = exports.sequelize;
db.sequelize.sync({ force: false }).then(() => {
    console.log('Yes Re-Sync Complete');
});
exports.default = db;
