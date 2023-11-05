"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const VehicleModelSchema = db_1.sequelize.define("vehicleModels", {
    brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, { timestamps: true, });
exports.default = VehicleModelSchema;
