"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const RC_quickSchema = db_1.sequelize.define("RC_quick", {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    logo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    priceKm: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "pending",
    }
}, { timestamps: true, });
exports.default = RC_quickSchema;
