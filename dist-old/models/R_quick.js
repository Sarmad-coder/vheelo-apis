"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const R_quickSchema = db_1.sequelize.define("R_quick", {
    rider: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    pickupLat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    pickupLon: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    pickupLocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dropLat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dropLon: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dropLocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    bidPrice: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    instruction: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    range: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "pending",
    }
}, { timestamps: true });
exports.default = R_quickSchema;
