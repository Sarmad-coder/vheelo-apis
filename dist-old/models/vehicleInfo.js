"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// model, number plate (number and image), image, vehicle Card (front- back)
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const vehicleInfoSchema = db_1.sequelize.define("vehicleInfos", {
    rider: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    plateNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    plateImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    vehicleImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cardFront: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cardBack: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, { timestamps: true, });
exports.default = vehicleInfoSchema;
