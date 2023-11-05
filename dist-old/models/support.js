"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const supportSchema = db_1.sequelize.define("support", {
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    sender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, { timestamps: true, });
exports.default = supportSchema;
