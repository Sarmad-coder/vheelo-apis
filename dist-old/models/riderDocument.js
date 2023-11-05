"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const riderDocumentSchema = db_1.sequelize.define("riderDocument", {
    rider: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cnicFront: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cnicBack: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    licenseImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    licenseNumber: {
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
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "pending",
    }
}, { timestamps: true, });
exports.default = riderDocumentSchema;
